import React from 'react';
import doctorData from '../data/doctor.json';
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div>
            <span className="text-2xl font-heading font-bold text-gradient-primary tracking-tight mb-6 block">
              MediCare<span className="text-white">Pro</span>
            </span>
            <p className="text-slate-400 mb-6 text-sm leading-relaxed">
              Premium healthcare designed for the modern world. Advanced diagnostics meet compassionate expertise.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-slate-400 hover:text-primary transition-colors text-sm">About The Doctor</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-primary transition-colors text-sm">Our Services</a></li>
              <li><a href="#testimonials" className="text-slate-400 hover:text-primary transition-colors text-sm">Patient Reviews</a></li>
              <li><a href="#faq" className="text-slate-400 hover:text-primary transition-colors text-sm">FAQs</a></li>
              <li><a href="#contact" className="text-slate-400 hover:text-primary transition-colors text-sm">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">General Consultation</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">Advanced Cardiology</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">Preventative Care</a></li>
              <li><a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">Virtual Consultation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-3">
              <li className="text-slate-400 text-sm">{doctorData.address}</li>
              <li><a href={`tel:${doctorData.clinicPhone}`} className="text-slate-400 hover:text-primary transition-colors text-sm">{doctorData.clinicPhone}</a></li>
              <li><a href={`mailto:${doctorData.email}`} className="text-slate-400 hover:text-primary transition-colors text-sm">{doctorData.email}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} MediCare Pro. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
