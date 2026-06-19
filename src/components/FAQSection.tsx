import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import faqData from '../data/faq.json';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-20 bg-background relative">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Got Questions?</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-foreground">Frequently Asked<br className="sm:hidden" /> Questions</h3>
        </div>

        <div className="space-y-3 md:space-y-4">
          {faqData.map((faq, idx) => (
            <div
              key={idx}
              className={`bg-card border rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === idx ? 'border-primary/50 bg-muted shadow-[0_0_20px_rgba(14,165,233,0.1)]' : 'border-border/50 hover:border-border'
              }`}
            >
              <button
                className="w-full text-left px-4 md:px-6 py-4 md:py-5 flex items-center justify-between focus:outline-none gap-3"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="text-sm md:text-base font-medium text-foreground leading-snug">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-4 md:px-6 pb-4 md:pb-6 text-sm md:text-base text-muted-foreground leading-relaxed border-t border-border/50 pt-3 md:pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
