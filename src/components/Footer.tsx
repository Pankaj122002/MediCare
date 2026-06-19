import doctorData from '../data/doctor.json';
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background pt-6 md:pt-8 pb-4 md:pb-5 border-t border-border relative z-10">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 mb-5 md:mb-6">

          {/* Brand — full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <span className="text-lg md:text-xl font-heading font-bold text-gradient-primary tracking-tight mb-2 block">
              MediCare<span className="text-foreground">Pro</span>
            </span>
            <p className="text-muted-foreground mb-3 text-xs leading-relaxed max-w-xs">
              Premium healthcare designed for the modern world. Advanced diagnostics meet compassionate expertise.
            </p>
            <div className="flex items-center gap-2">
              <a href="#" className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-2 uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-1.5">
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors text-xs">About The Doctor</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors text-xs">Our Services</a></li>
              <li><a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors text-xs">Patient Reviews</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-primary transition-colors text-xs">FAQs</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors text-xs">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-2 uppercase tracking-wider text-xs">Services</h4>
            <ul className="space-y-1.5">
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors text-xs">General Consultation</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors text-xs">Advanced Cardiology</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors text-xs">Preventative Care</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors text-xs">Virtual Consultation</a></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-foreground font-bold mb-2 uppercase tracking-wider text-xs">Contact</h4>
            <ul className="space-y-1.5">
              <li className="text-muted-foreground text-xs leading-relaxed">{doctorData.address}</li>
              <li><a href={`tel:${doctorData.clinicPhone}`} className="text-muted-foreground hover:text-primary transition-colors text-xs">{doctorData.clinicPhone}</a></li>
              <li><a href={`mailto:${doctorData.email}`} className="text-muted-foreground hover:text-primary transition-colors text-xs">{doctorData.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-3 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-muted-foreground text-xs text-center md:text-left">
            © {new Date().getFullYear()} MediCare Pro. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
