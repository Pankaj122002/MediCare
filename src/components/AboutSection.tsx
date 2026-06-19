import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import doctorData from '../data/doctor.json';
import { Award, Users, Stethoscope, Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    
    gsap.fromTo(
      textRef.current?.children ? Array.from(textRef.current.children) : [],
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        }
      }
    );

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8, rotateY: 15 },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        }
      }
    );

    // Counter animation
    const stats = statsRef.current?.querySelectorAll('.stat-number');
    if (stats) {
      stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0', 10);
        gsap.to(stat, {
          innerHTML: target,
          duration: 2,
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          }
        });
      });
    }

  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-20 relative z-20 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Column */}
          <div className="w-full lg:w-5/12 perspective-1000">
            <div 
              ref={imageRef} 
              className="relative rounded-2xl overflow-hidden glass border border-white/10 p-2 shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800" 
                alt={doctorData.name}
                className="w-full h-auto rounded-xl object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent rounded-xl" />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl glass-card flex flex-col items-center shadow-xl">
                <span className="text-3xl font-bold">{doctorData.experience}+</span>
                <span className="text-xs uppercase tracking-wider opacity-80 mt-1">Years Exp.</span>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="w-full lg:w-7/12" ref={textRef}>
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">About The Doctor</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">{doctorData.name}</h3>
            <p className="text-xl text-muted-foreground font-medium mb-4">{doctorData.title}</p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {doctorData.bio}
            </p>

            {/* Qualifications */}
            <div className="flex flex-wrap gap-3 mb-10">
              {doctorData.qualifications.map(q => (
                <span key={q} className="px-4 py-2 bg-muted/50 rounded-full text-sm font-medium border border-border text-foreground">
                  {q}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
              <span className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-full border border-border cursor-default">
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </span>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-emerald-500" />
                  <span className="text-3xl font-bold text-foreground stat-number" data-target="25">0</span>
                  <span className="text-xl font-bold text-emerald-500">+</span>
                </div>
                <p className="text-sm text-muted-foreground">Awards Won</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-sky-500" />
                  <span className="text-3xl font-bold text-foreground stat-number" data-target="10">0</span>
                  <span className="text-xl font-bold text-sky-500">k+</span>
                </div>
                <p className="text-sm text-muted-foreground">Happy Patients</p>
              </div>
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-2">
                  <Stethoscope className="w-5 h-5 text-purple-500" />
                  <span className="text-3xl font-bold text-foreground stat-number" data-target="5">0</span>
                  <span className="text-xl font-bold text-purple-500">k+</span>
                </div>
                <p className="text-sm text-muted-foreground">Surgeries</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
