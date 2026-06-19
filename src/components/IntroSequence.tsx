import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroSequenceProps {
  onFinish: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onFinish }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [dots, setDots] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const dotTexts = ['', '.', '..', '...'];

  useEffect(() => {
    if (!isReady && !isPlaying) {
      const interval = setInterval(() => {
        setDots(prev => (prev + 1) % 4);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isReady, isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const frameCount = 300;
    const currentFrame = (index: number) => 
      `/images/intro-bg/frame-${String(index).padStart(3, '0')}.webp`;

    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      images.push(new Image());
    }

    let currentLoadIndex = 0;
    const loadNextImage = () => {
      if (currentLoadIndex >= frameCount) return;
      const img = images[currentLoadIndex];
      img.onload = () => {
        loadedCount++;
        currentLoadIndex++;
        
        if (loadedCount >= frameCount) {
          setIsReady(true);
        }
        
        requestAnimationFrame(loadNextImage);
      };
      img.onerror = () => {
        setTimeout(() => {
          img.src = currentFrame(currentLoadIndex);
        }, 200);
      };
      img.src = currentFrame(currentLoadIndex);
    };

    const startPreloading = () => {
      loadNextImage();
    };

    if (document.readyState === 'complete') {
      startPreloading();
    } else {
      window.addEventListener('load', startPreloading);
    }
    
    let playFrame = 0;
    let animationRef: number;
    let lastTime = performance.now();
    const fpsInterval = 1000 / 30;

    const handleEnded = () => {
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

      setTimeout(() => {
        onFinish();
      }, 1500);
    };

    const renderCurrentFrame = () => {
      if (!canvas || !context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      let img = images[playFrame];
      if (!img || !img.complete || img.naturalWidth === 0) {
        let fallbackIndex = playFrame;
        while (fallbackIndex >= 0 && (!images[fallbackIndex].complete || images[fallbackIndex].naturalWidth === 0)) {
          fallbackIndex--;
        }
        if (fallbackIndex >= 0) {
          img = images[fallbackIndex];
        } else {
          return;
        }
      }

      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;  

      context.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderCurrentFrame();
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const startPlayback = () => {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.volume = 1;
        audioRef.current.currentTime = 1;
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
      
      const playLoop = (time: number) => {
        const elapsed = time - lastTime;

        if (elapsed > fpsInterval) {
          lastTime = time - (elapsed % fpsInterval);
          
          if (playFrame < frameCount - 1) {
            if (images[playFrame + 1].complete) {
              playFrame++;
              renderCurrentFrame();
            }
          } else {
            handleEnded();
            return;
          }

          if (playFrame >= frameCount - 60 && !isFadingOut) {
            handleEnded();
            return;
          }
        }
        animationRef = requestAnimationFrame(playLoop);
      };
      
      animationRef = requestAnimationFrame(playLoop);
    };

    if (isReady) {
      startPlayback();
    }

    return () => {
      window.removeEventListener('load', startPreloading);
      window.removeEventListener('resize', handleResize);
      if (animationRef) cancelAnimationFrame(animationRef);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <audio ref={audioRef} src="/videos/introsequence.mp3" preload="auto" />

        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {!isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-2xl font-semibold text-white tracking-wide">
                Loading{dotTexts[dots]}
              </span>
            </motion.div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};