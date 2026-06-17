import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import servicesData from '../data/services.json';
import * as Icons from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = Array.from(cardsRef.current.children);
      
      gsap.fromTo(
        cards,
        { y: 100, opacity: 0, rotateX: 20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-16 md:py-20 bg-background relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Our Services</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground">Premium Treatments</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Combining state-of-the-art technology with compassionate care to provide you with the best possible medical outcomes.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, idx) => {
            // @ts-ignore - dynamic icon loading
            const IconComponent = Icons[service.icon] || Icons.Activity;
            
            return (
              <div 
                key={service.id}
                className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.3)]"
                style={{ perspective: '1000px' }}
              >
                <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center mb-6 border border-border group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)]">
                  <IconComponent className="w-7 h-7 text-primary group-hover:text-emerald-500 transition-colors duration-500" />
                </div>
                
                <h4 className="text-2xl font-bold mb-3 text-foreground">{service.title}</h4>
                <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                  {service.shortDescription}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Starting at</span>
                    <span className="text-lg font-bold text-foreground">{service.price}</span>
                  </div>
                  <button className="text-sm font-medium text-primary hover:text-emerald-400 transition-colors flex items-center gap-1 group/btn">
                    Learn more 
                    <Icons.ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
