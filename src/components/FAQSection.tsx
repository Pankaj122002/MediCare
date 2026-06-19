import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import faqData from '../data/faq.json';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-10 md:py-14 bg-background relative">
      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Got Questions?</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-foreground">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, idx) => (
              <div 
              key={idx} 
              className={`bg-card border rounded-2xl overflow-hidden transition-all duration-300 ${
                openIndex === idx ? 'border-primary/50 bg-muted shadow-[0_0_20px_rgba(14,165,233,0.1)]' : 'border-border/50 hover:border-border'
              }`}
            >
              <button
                className="w-full text-left px-6 py-6 flex items-center justify-between focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="text-lg font-medium pr-8 text-foreground">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border/50 pt-4">
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
