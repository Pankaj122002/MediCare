import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroSequenceProps {
  onFinish: () => void;
}

const FRAME_COUNT = 220;
const PLAYBACK_FPS = 30;
const START_THRESHOLD = 40; // start playback after this many frames loaded
const PARALLEL_BATCH = 10; // load this many images concurrently

const currentFrame = (index: number) =>
  `/images/intro-bg/frame-${String(index).padStart(3, '0')}.webp`;

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onFinish }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    // Presize canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);
    let loadedCount = 0;
    let playbackStarted = false;
    let playFrame = 0;
    let animationRef: number;
    let lastTime = performance.now();
    const fpsInterval = 1000 / PLAYBACK_FPS;
    let finished = false;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const renderFrame = (index: number) => {
      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const cx = (canvas.width - img.width * ratio) / 2;
      const cy = (canvas.height - img.height * ratio) / 2;
      context.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
    };

    const triggerFadeOut = () => {
      if (finished) return;
      finished = true;
      setIsFadingOut(true);
      window.dispatchEvent(new Event('hero-preload'));

      if (audioRef.current) {
        const audio = audioRef.current;
        const fadeAudio = setInterval(() => {
          if (audio.volume > 0.1) {
            audio.volume -= 0.1;
          } else {
            audio.pause();
            clearInterval(fadeAudio);
          }
        }, 100);
      }

      setTimeout(() => onFinish(), 1200);
    };

    const startPlayback = () => {
      if (playbackStarted) return;
      playbackStarted = true;
      setIsPlaying(true);

      if (audioRef.current) {
        audioRef.current.volume = 1;
        audioRef.current.currentTime = 1;
        audioRef.current.play().catch(() => {});
      }

      const playLoop = (time: number) => {
        const elapsed = time - lastTime;
        if (elapsed > fpsInterval) {
          lastTime = time - (elapsed % fpsInterval);

          // Try to advance to next frame if it's loaded
          if (playFrame < FRAME_COUNT - 1) {
            const nextFrame = playFrame + 1;
            if (images[nextFrame]?.complete && images[nextFrame]?.naturalWidth) {
              playFrame = nextFrame;
              renderFrame(playFrame);
            } else {
              // Render current frame again (wait for next frame to load)
              renderFrame(playFrame);
            }
          }

          // Trigger fadeout near the end
          if (playFrame >= FRAME_COUNT - 30 && !finished) {
            triggerFadeOut();
            return;
          }
        }

        animationRef = requestAnimationFrame(playLoop);
      };

      // Render first available frame immediately
      renderFrame(0);
      animationRef = requestAnimationFrame(playLoop);
    };

    // Load images in parallel batches
    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          images[index] = img;
          loadedCount++;
          // Start playback as soon as threshold is met
          if (loadedCount >= START_THRESHOLD && !playbackStarted) {
            startPlayback();
          }
          resolve();
        };
        img.onerror = () => {
          // retry once
          setTimeout(() => {
            img.src = currentFrame(index);
          }, 300);
          resolve();
        };
        img.src = currentFrame(index);
      });
    };

    const loadAllFrames = async () => {
      // Load first batch eagerly
      const firstBatch: Promise<void>[] = [];
      for (let i = 0; i < Math.min(START_THRESHOLD + PARALLEL_BATCH, FRAME_COUNT); i++) {
        firstBatch.push(loadImage(i));
      }
      await Promise.all(firstBatch);

      // Load remaining frames in parallel batches
      for (let i = START_THRESHOLD + PARALLEL_BATCH; i < FRAME_COUNT; i += PARALLEL_BATCH) {
        const batch: Promise<void>[] = [];
        for (let j = i; j < Math.min(i + PARALLEL_BATCH, FRAME_COUNT); j++) {
          batch.push(loadImage(j));
        }
        await Promise.all(batch);
      }
    };

    loadAllFrames();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef) cancelAnimationFrame(animationRef);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        <audio ref={audioRef} src="/videos/introsequence.mp3" preload="auto" />

        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
        />

        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-lg font-semibold text-white tracking-wide">
                Loading…
              </span>
            </motion.div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
