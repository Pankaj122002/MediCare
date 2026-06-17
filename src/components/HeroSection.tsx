import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhoneCall, ArrowDown } from 'lucide-react';
import doctorData from '../data/doctor.json';

gsap.registerPlugin(ScrollTrigger);


export const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Setup GSAP Scroll Sequence for Background Images
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const frameCount = 300;
    const currentFrame = (index: number) => 
      `/images/hero-bg/frame-${String(index).padStart(3, '0')}.webp`;

    const images: HTMLImageElement[] = [];
    const airpods = { frame: 0 };

    for (let i = 0; i < frameCount; i++) {
      images.push(new Image());
    }

    images[0].src = currentFrame(0);
    images[0].onload = render;

    let currentLoadIndex = 1;
    const loadNextImage = () => {
      if (currentLoadIndex >= frameCount) return;
      const img = images[currentLoadIndex];
      img.onload = () => {
        currentLoadIndex++;
        requestAnimationFrame(loadNextImage); // Sequential load without blocking main thread
      };
      img.onerror = () => {
        currentLoadIndex++;
        requestAnimationFrame(loadNextImage);
      };
      img.src = currentFrame(currentLoadIndex);
    };

    // Delay background loading until Intro sequence finishes playing to prevent CPU/Network lag
    const startHeroPreload = () => {
      loadNextImage();
    };
    window.addEventListener('hero-preload', startHeroPreload, { once: true });
    
    // Fallback: Start loading after 12s if event is missed
    const fallbackTimer = setTimeout(loadNextImage, 12000);

    function render() {
      if (!canvas || !context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      let img = images[airpods.frame];
      if (!img.complete || img.naturalWidth === 0) {
        let fallbackIndex = airpods.frame;
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
    }

    // Handle Resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // GSAP Scroll animation linking frame to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=200%', // 200vh scroll duration
        scrub: 0.5, // smooth scrubbing
        pin: true,
      }
    });

    tl.to(airpods, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      onUpdate: render
    });

    // 2. Setup Stagger Text Animation
    gsap.fromTo('.hero-text', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.5 }
    );

    return () => {
      window.removeEventListener('hero-preload', startHeroPreload);
      clearTimeout(fallbackTimer);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden">
      {/* Cinematic Image Sequence Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-70 mix-blend-screen"
      />

      {/* 3D React Three Fiber Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#0ea5e9" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10b981" />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>

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
