import doctorData from '../data/doctor.json';
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background pt-14 md:pt-20 pb-8 md:pb-10 border-t border-border relative z-10">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">

          {/* Brand — full width on mobile */}
          <div className="col-span-2 lg:col-span-1">
            <span className="text-xl md:text-2xl font-heading font-bold text-gradient-primary tracking-tight mb-4 block">
              MediCare<span className="text-foreground">Pro</span>
            </span>
            <p className="text-muted-foreground mb-5 text-sm leading-relaxed max-w-xs">
              Premium healthcare designed for the modern world. Advanced diagnostics meet compassionate expertise.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-4 uppercase tracking-wider text-xs md:text-sm">Quick Links</h4>
            <ul className="space-y-2 md:space-y-3">
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About The Doctor</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Our Services</a></li>
              <li><a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors text-sm">Patient Reviews</a></li>
              <li><a href="#faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">FAQs</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-4 uppercase tracking-wider text-xs md:text-sm">Services</h4>
            <ul className="space-y-2 md:space-y-3">
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors text-sm">General Consultation</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Advanced Cardiology</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Preventative Care</a></li>
              <li><a href="#services" className="text-muted-foreground hover:text-primary transition-colors text-sm">Virtual Consultation</a></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-foreground font-bold mb-4 uppercase tracking-wider text-xs md:text-sm">Contact</h4>
            <ul className="space-y-2 md:space-y-3">
              <li className="text-muted-foreground text-sm leading-relaxed">{doctorData.address}</li>
              <li><a href={`tel:${doctorData.clinicPhone}`} className="text-muted-foreground hover:text-primary transition-colors text-sm">{doctorData.clinicPhone}</a></li>
              <li><a href={`mailto:${doctorData.email}`} className="text-muted-foreground hover:text-primary transition-colors text-sm">{doctorData.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs md:text-sm text-center md:text-left">
            © {new Date().getFullYear()} MediCare Pro. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
