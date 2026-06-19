import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhoneCall, ArrowDown } from 'lucide-react';
import doctorData from '../data/doctor.json';

gsap.registerPlugin(ScrollTrigger);

// Use every 2nd frame = 150 unique images instead of 300
const TOTAL_FRAMES = 300;
const FRAME_STEP = 2;
const FRAME_COUNT = Math.ceil(TOTAL_FRAMES / FRAME_STEP); // 150

export const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);
  const lastDrawnFrame = useRef<number>(-1);

  const handleBookClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: false });
    if (!canvas || !context) return;

    // Map logical frame index to actual file frame index
    const frameFilePath = (logicalIndex: number) => {
      const fileIndex = logicalIndex * FRAME_STEP;
      return `/images/hero-bg/frame-${String(fileIndex).padStart(3, '0')}.webp`;
    };

    // Store pre-decoded bitmaps for fast GPU rendering
    const bitmaps: (ImageBitmap | null)[] = new Array(FRAME_COUNT).fill(null);
    const scrollState = { frame: 0 };

    // Render with rAF batching
    function scheduleRender() {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = 0;
        render();
      });
    }

    function render() {
      if (!canvas || !context) return;
      const frameIdx = Math.round(scrollState.frame);
      if (frameIdx === lastDrawnFrame.current) return;

      // Find frame or nearest loaded fallback
      let bitmap = bitmaps[frameIdx];
      if (!bitmap) {
        let fallback = frameIdx;
        while (fallback >= 0 && !bitmaps[fallback]) fallback--;
        if (fallback < 0) return;
        bitmap = bitmaps[fallback]!;
      }

      lastDrawnFrame.current = frameIdx;

      const hRatio = canvas.width / bitmap.width;
      const vRatio = canvas.height / bitmap.height;
      const ratio = Math.max(hRatio, vRatio);
      const cx = (canvas.width - bitmap.width * ratio) / 2;
      const cy = (canvas.height - bitmap.height * ratio) / 2;

      context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height, cx, cy, bitmap.width * ratio, bitmap.height * ratio);
    }

    // Load and decode frame into ImageBitmap (GPU-ready)
    const loadFrame = (logicalIndex: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          createImageBitmap(img).then((bmp) => {
            bitmaps[logicalIndex] = bmp;
            if (logicalIndex === 0) render();
            resolve();
          }).catch(() => resolve());
        };
        img.onerror = () => resolve();
        img.src = frameFilePath(logicalIndex);
      });
    };

    // Sequential loading with main thread yielding
    let currentLoadIndex = 0;
    const loadNextFrame = () => {
      if (currentLoadIndex >= FRAME_COUNT) return;
      const idx = currentLoadIndex++;
      loadFrame(idx).then(() => {
        setTimeout(loadNextFrame, 0);
      });
    };

    const startHeroPreload = () => loadNextFrame();
    window.addEventListener('hero-preload', startHeroPreload, { once: true });
    const fallbackTimer = setTimeout(loadNextFrame, 12000);

    // Debounced resize
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        lastDrawnFrame.current = -1;
        render();
      }, 150);
    };
    window.addEventListener('resize', handleResize);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // GSAP Scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1, // higher value = smoother but slightly delayed
        pin: true,
      }
    });

    tl.to(scrollState, {
      frame: FRAME_COUNT - 1,
      ease: 'none',
      onUpdate: scheduleRender,
    });

    // Text animation
    gsap.fromTo('.hero-text',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.5 }
    );

    return () => {
      window.removeEventListener('hero-preload', startHeroPreload);
      clearTimeout(fallbackTimer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      ScrollTrigger.getAll().forEach(t => t.kill());
      // Clean up bitmaps
      bitmaps.forEach(b => b?.close());
    };
  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 opacity-70"
        style={{ willChange: 'transform' }}
      />

      {/* Content Layer */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto mt-10 md:mt-0">
        <h1 className="hero-text text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight mb-6 leading-tight text-white">
          Your Health, <br/>
          <span className="text-gradient-primary">Our Priority.</span>
        </h1>

        <p className="hero-text text-lg md:text-2xl text-slate-300 max-w-2xl mb-10 font-light">
          Experience premium healthcare designed for the modern world. Advanced diagnostics meet compassionate expertise.
        </p>

        <div className="hero-text flex flex-col sm:flex-row items-center gap-6">
          <a
            href="#appointment"
            onClick={handleBookClick}
            className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-medium transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(14,165,233,0.4)] w-full sm:w-auto"
          >
            Book Appointment
          </a>

          <a
            href={`tel:${doctorData.emergencyPhone}`}
            className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(220,38,38,0.5)] flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <PhoneCall className="w-5 h-5 animate-pulse" />
            Call Emergency
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hero-text">
        <div className="flex flex-col items-center gap-2 animate-float">
          <span className="text-xs tracking-widest uppercase text-slate-400 font-medium">Scroll to explore</span>
          <ArrowDown className="w-5 h-5 text-slate-400" />
        </div>
      </div>

      {/* Gradient Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent z-10" />
    </section>
  );
};
