import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, Sun, Moon } from 'lucide-react';
import doctorData from '../data/doctor.json';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm py-3' : 'bg-transparent py-5'
        } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <a href="#hero" className="flex items-center space-x-2 z-50 relative" onClick={(e) => handleNavClick(e, '#hero')}>
              <span className="text-xl md:text-2xl font-heading font-bold text-gradient-primary tracking-tight">
                MediCare<span className="text-foreground">Pro</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-bold text-foreground drop-shadow-md hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-muted text-foreground drop-shadow-md hover:text-primary transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
              <a
                href={`tel:${doctorData.emergencyPhone}`}
                className="flex items-center space-x-2 text-sm font-bold text-white transition-colors bg-red-600 hover:bg-red-500 px-4 py-2 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.3)]"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Emergency</span>
              </a>
              <a
                href="#appointment"
                onClick={(e) => handleNavClick(e, '#appointment')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium px-6 py-2.5 rounded-full transition-colors shadow-md hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]"
              >
                Book Now
              </a>
            </div>

            {/* Mobile controls */}
            <div className="flex md:hidden items-center space-x-2 z-50 relative">
              <button
                onClick={toggleTheme}
                className="p-2 text-foreground drop-shadow-md hover:text-primary transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                className="p-2 text-foreground drop-shadow-md hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Full-Screen Overlay — separate from header so z-index works */}
      <div
        className={`fixed inset-0 bg-slate-900/98 backdrop-blur-xl z-50 flex flex-col items-center justify-center transition-all duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Close button at top-right */}
        <button
          className="absolute top-5 right-4 p-2 text-slate-300 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X className="w-7 h-7" />
        </button>

        <nav className="flex flex-col items-center gap-8 w-full px-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-2xl font-heading font-semibold text-slate-300 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}

          <div className="flex flex-col w-full gap-3 mt-4 pt-6 border-t border-white/10">
            <a
              href="#appointment"
              onClick={(e) => handleNavClick(e, '#appointment')}
              className="w-full text-center bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl transition-colors text-lg"
            >
              Book Appointment
            </a>
            <a
              href={`tel:${doctorData.emergencyPhone}`}
              className="w-full text-center flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold py-4 rounded-2xl transition-colors text-lg"
            >
              <PhoneCall className="w-5 h-5" />
              Call Emergency
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};
