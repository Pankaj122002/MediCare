import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import doctorData from '../data/doctor.json';

export const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-20 bg-background relative">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Get in Touch</h2>
          <h3 className="text-3xl md:text-4xl font-heading font-bold mb-2 text-foreground">Visit Our Clinic</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Details */}
          <div className="space-y-5 md:space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 md:w-11 md:h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold mb-1 text-foreground">Location</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{doctorData.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 md:w-11 md:h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold mb-1 text-foreground">Contact</h4>
                <p className="text-muted-foreground text-sm mb-1">Clinic: <a href={`tel:${doctorData.clinicPhone}`} className="hover:text-primary transition-colors">{doctorData.clinicPhone}</a></p>
                <p className="text-red-400 text-sm">Emergency: <a href={`tel:${doctorData.emergencyPhone}`} className="hover:text-red-300 transition-colors">{doctorData.emergencyPhone}</a></p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 md:w-11 md:h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold mb-1 text-foreground">Email</h4>
                <a href={`mailto:${doctorData.email}`} className="text-muted-foreground hover:text-primary transition-colors text-sm">{doctorData.email}</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 md:w-11 md:h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div className="w-full">
                <h4 className="text-sm md:text-base font-bold mb-3 text-foreground">Hours</h4>
                <div className="space-y-2">
                  {Object.entries(doctorData.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center text-sm border-b border-border/30 pb-2">
                      <span className="text-foreground capitalize font-medium">{day}</span>
                      <span className={`font-medium ${hours === 'Closed' ? 'text-red-500' : 'text-muted-foreground'}`}>{hours as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-card border border-border p-2 rounded-3xl h-[280px] md:h-auto md:min-h-[400px]">
            <iframe
              src="https://maps.google.com/maps?q=28.758113,77.503955&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[260px] md:min-h-[380px] border-0 rounded-[1.25rem] dark:invert-[.9] dark:hue-rotate-180"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
