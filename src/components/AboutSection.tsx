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
    <section id="about" ref={sectionRef} className="py-16 md:py-20 relative z-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

          {/* Image Column */}
          <div className="w-full lg:w-5/12 perspective-1000">
            <div
              ref={imageRef}
              className="relative rounded-2xl overflow-visible glass border border-white/10 p-2 shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800"
                alt={doctorData.name}
                className="w-full h-auto rounded-xl object-cover aspect-[4/3] md:aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent rounded-xl" />

              {/* Floating Badge — stays inside on mobile */}
              <div className="absolute bottom-3 right-3 md:-bottom-6 md:-right-6 bg-primary text-primary-foreground p-4 md:p-6 rounded-2xl glass-card flex flex-col items-center shadow-xl">
                <span className="text-2xl md:text-3xl font-bold">{doctorData.experience}+</span>
                <span className="text-xs uppercase tracking-wider opacity-80 mt-1">Years Exp.</span>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="w-full lg:w-7/12" ref={textRef}>
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">About The Doctor</h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-foreground">{doctorData.name}</h3>
            <p className="text-lg text-muted-foreground font-medium mb-4">{doctorData.title}</p>
            <p className="text-muted-foreground mb-6 leading-relaxed text-sm md:text-base">
              {doctorData.bio}
            </p>

            {/* Qualifications */}
            <div className="flex flex-wrap gap-2 mb-8">
              {doctorData.qualifications.map(q => (
                <span key={q} className="px-3 py-1.5 bg-muted/50 rounded-full text-xs md:text-sm font-medium border border-border text-foreground">
                  {q}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
              <span className="flex items-center gap-2 px-5 py-3 bg-muted text-foreground rounded-full border border-border cursor-default text-sm">
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </span>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Award className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-2xl md:text-3xl font-bold text-foreground stat-number" data-target="25">0</span>
                  <span className="text-lg font-bold text-emerald-500">+</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">Awards Won</p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Users className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <span className="text-2xl md:text-3xl font-bold text-foreground stat-number" data-target="10">0</span>
                  <span className="text-lg font-bold text-sky-500">k+</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">Happy Patients</p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Stethoscope className="w-4 h-4 text-purple-500 flex-shrink-0" />
                  <span className="text-2xl md:text-3xl font-bold text-foreground stat-number" data-target="5">0</span>
                  <span className="text-lg font-bold text-purple-500">k+</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">Surgeries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
