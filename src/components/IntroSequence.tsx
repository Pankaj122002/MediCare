import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroSequenceProps {
  onFinish: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onFinish }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Store the playback trigger so the button can call it
  const startPlaybackRef = useRef<(() => void) | null>(null);

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

    // Sequentially preload images
    let currentLoadIndex = 0;
    const loadNextImage = () => {
      if (currentLoadIndex >= frameCount) return;
      const img = images[currentLoadIndex];
      img.onload = () => {
        loadedCount++;
        currentLoadIndex++;
        
        // Mark as ready when we have a minimal buffer (e.g., 30 frames)
        if (loadedCount === 30) {
          setIsReady(true);
        }
        
        requestAnimationFrame(loadNextImage);
      };
      img.onerror = () => {
        currentLoadIndex++;
        requestAnimationFrame(loadNextImage);
      };
      img.src = currentFrame(currentLoadIndex);
    };

    loadNextImage();

    let playFrame = 0;
    let animationRef: number;
    let lastTime = performance.now();
    const fpsInterval = 1000 / 30; // target 30 FPS

    const handleEnded = () => {
      setIsFadingOut(true);
      
      // Fade out audio smoothly
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
      }, 1500); // 1.5s fade out
    };

    const renderCurrentFrame = () => {
      if (!canvas || !context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      let img = images[playFrame];
      if (!img || !img.complete || img.naturalWidth === 0) {
        // Find latest loaded frame
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

    // Handle Resize
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
        audioRef.current.currentTime = 1; // Fast-forward 1 second
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
      
      const playLoop = (time: number) => {
        const elapsed = time - lastTime;

        if (elapsed > fpsInterval) {
          lastTime = time - (elapsed % fpsInterval);
          
          if (playFrame < frameCount - 1) {
            // Only advance if next frame is loaded (buffer wait)
            if (images[playFrame + 1].complete) {
              playFrame++;
              renderCurrentFrame();
            }
          } else {
            handleEnded();
            return;
          }

          // Trim logic: if we are within the last 60 frames (2 seconds at 30fps)
          if (playFrame >= frameCount - 60 && !isFadingOut) {
            handleEnded();
            return;
          }
        }
        animationRef = requestAnimationFrame(playLoop);
      };
      
      animationRef = requestAnimationFrame(playLoop);
    };

    startPlaybackRef.current = startPlayback;

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef) cancelAnimationFrame(animationRef);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Synchronized Audio Track */}
        <audio ref={audioRef} src="/videos/introsequence.mp3" preload="auto" />

        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {(!hasStarted) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => {
                  if (isReady && startPlaybackRef.current) {
                    setHasStarted(true);
                    startPlaybackRef.current();
                  }
                }}
                disabled={!isReady}
                className={`px-8 py-4 rounded-full font-semibold tracking-wide transition-all duration-300 ${
                  isReady 
                    ? 'bg-primary text-white hover:bg-primary-dark hover:scale-105 shadow-lg shadow-primary/30 cursor-pointer' 
                    : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isReady ? 'Explore My Services' : 'Loading Assets...'}
              </button>
            </motion.div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
