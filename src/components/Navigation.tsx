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

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm py-4' : 'bg-transparent py-6'
      } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between">
          <a href="#hero" className="flex items-center space-x-2" onClick={(e) => handleNavClick(e, '#hero')}>
            <span className="text-2xl font-heading font-bold text-gradient-primary tracking-tight">MediCare<span className="text-foreground">Pro</span></span>
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

          {/* Mobile Menu Toggle & Theme */}
          <div className="flex md:hidden items-center space-x-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 text-foreground drop-shadow-md hover:text-primary transition-colors"
            >
              {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          <button 
            className="md:hidden text-foreground drop-shadow-md hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div 
        className={`fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-30 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="text-2xl font-heading font-medium text-slate-300 hover:text-white transition-colors"
          >
            {link.name}
          </a>
        ))}
        <a 
          href="#appointment"
          onClick={(e) => handleNavClick(e, '#appointment')}
          className="bg-primary text-white font-medium px-8 py-3 rounded-full mt-4"
        >
          Book Appointment
        </a>
      </div>
    </header>
  );
};
