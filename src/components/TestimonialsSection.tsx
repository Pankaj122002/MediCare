import { Star } from 'lucide-react';
import testimonialsData from '../data/testimonials.json';

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Patient Stories</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-foreground">Trusted by Thousands</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Read what our patients have to say about their experience and journey to better health with us.
          </p>
        </div>

        <div className="flex overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar gap-4 md:gap-8">
          {testimonialsData.map((testimonial, idx) => (
            <div
              key={idx}
              className="flex-none w-[80vw] sm:w-[70vw] md:w-[400px] snap-center bg-card/50 backdrop-blur-md border border-border rounded-2xl md:rounded-3xl p-6 md:p-8 hover:-translate-y-1 transition-transform duration-500"
            >
              <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-primary/30 flex-shrink-0"
                />
                <div>
                  <h4 className="text-base md:text-lg font-bold text-foreground">{testimonial.name}</h4>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 md:w-4 md:h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed italic relative text-sm md:text-base">
                <span className="absolute -top-3 -left-1 text-3xl text-primary/20 font-serif">"</span>
                {testimonial.review}
                <span className="absolute -bottom-3 -right-1 text-3xl text-primary/20 font-serif">"</span>
              </p>
            </div>
          ))}
        </div>

        {/* Scroll hint on mobile */}
        <p className="text-center text-xs text-muted-foreground mt-4 md:hidden">Swipe to see more →</p>
      </div>
    </section>
  );
};
