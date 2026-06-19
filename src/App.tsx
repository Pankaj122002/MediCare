import { useEffect, useState, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { IntroSequence } from './components/IntroSequence';

// Lazy load non-critical sections to heavily optimize initial bundle size
const AboutSection = lazy(() => import('./components/AboutSection').then(m => ({ default: m.AboutSection })));
const ServicesSection = lazy(() => import('./components/ServicesSection').then(m => ({ default: m.ServicesSection })));
const AppointmentSection = lazy(() => import('./components/AppointmentSection').then(m => ({ default: m.AppointmentSection })));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection').then(m => ({ default: m.TestimonialsSection })));
const FAQSection = lazy(() => import('./components/FAQSection').then(m => ({ default: m.FAQSection })));
const ContactSection = lazy(() => import('./components/ContactSection').then(m => ({ default: m.ContactSection })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const FloatingActions = lazy(() => import('./components/FloatingActions').then(m => ({ default: m.FloatingActions })));

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Disable scrolling if intro hasn't finished playing yet
    if (!introFinished) {
      lenis.stop();
    } else {
      lenis.start();
    }

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [introFinished]);

  const showIntro = !introFinished;

  return (
    <main className="bg-background min-h-screen text-foreground font-sans relative overflow-x-hidden transition-colors duration-300">
      {showIntro && <IntroSequence onFinish={() => setIntroFinished(true)} />}
      
      <div style={{ opacity: showIntro ? 0 : 1, transition: 'opacity 1s ease-in-out' }}>
        <Navigation />
        <HeroSection />
        <Suspense fallback={<div className="h-screen w-full bg-background" />}>
          <AboutSection />
          <ServicesSection />
          <AppointmentSection />
          <TestimonialsSection />
          <FAQSection />
          <ContactSection />
          <Footer />
          <FloatingActions />
        </Suspense>
      </div>
    </main>
  );
}

export default App;
