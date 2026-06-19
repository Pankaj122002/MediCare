import { useEffect, useRef } from 'react';
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
        { y: 50, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 md:py-24 bg-background relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Our Services</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-foreground">Premium Treatments</h3>
          <p className="text-muted-foreground max-w-lg mx-auto text-base">
            State-of-the-art technology with compassionate care.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicesData.map((service) => {
            // @ts-expect-error - dynamic icon loading
            const IconComponent = Icons[service.icon] || Icons.Activity;
            
            return (
              <div 
                key={service.id}
                className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:bg-card transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-[0_8px_24px_-5px_rgba(14,165,233,0.2)]"
                style={{ perspective: '1000px' }}
              >
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-4 border border-border group-hover:scale-105 transition-transform duration-300">
                  <IconComponent className="w-6 h-6 text-primary group-hover:text-emerald-500 transition-colors duration-300" />
                </div>
                
                <h4 className="text-base font-bold mb-2 text-foreground">{service.title}</h4>
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm line-clamp-3">
                  {service.shortDescription}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
                  <span className="text-sm font-bold text-foreground">{service.price}</span>
                  <button className="text-sm font-medium text-primary hover:text-emerald-400 transition-colors flex items-center gap-1">
                    Details
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
