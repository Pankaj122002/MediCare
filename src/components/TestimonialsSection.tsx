
import { Star } from 'lucide-react';
import testimonialsData from '../data/testimonials.json';

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-20 bg-background relative overflow-hidden">
      {/* 3D background elements can be added here if needed */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Patient Stories</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground">Trusted by Thousands</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read what our patients have to say about their experience and journey to better health with us.
          </p>
        </div>

        <div className="flex overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar gap-8">
          {testimonialsData.map((testimonial, idx) => (
            <div 
              key={idx} 
              className="flex-none w-[85vw] md:w-[400px] snap-center bg-card/50 backdrop-blur-md border border-border rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <h4 className="text-lg font-bold text-foreground">{testimonial.name}</h4>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed italic relative">
                <span className="absolute -top-4 -left-2 text-4xl text-primary/20 font-serif">"</span>
                {testimonial.review}
                <span className="absolute -bottom-4 -right-2 text-4xl text-primary/20 font-serif">"</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
