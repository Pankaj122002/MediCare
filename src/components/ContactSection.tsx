import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import doctorData from '../data/doctor.json';

export const ContactSection = () => {
  return (
    <section id="contact" className="py-8 md:py-10 bg-background relative">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-6">
          <h2 className="text-xs font-bold tracking-widest text-primary uppercase mb-1">Get in Touch</h2>
          <h3 className="text-xl md:text-2xl font-heading font-bold mb-2 text-foreground">Visit Our Clinic</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Contact Details */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-primary/20">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-bold mb-1 text-foreground">Location</h4>
                <p className="text-muted-foreground text-xs">{doctorData.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-primary/20">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-bold mb-1 text-foreground">Contact</h4>
                <p className="text-muted-foreground text-xs mb-0.5">Clinic: <a href={`tel:${doctorData.clinicPhone}`} className="hover:text-primary transition-colors">{doctorData.clinicPhone}</a></p>
                <p className="text-red-400 text-xs">Emergency: <a href={`tel:${doctorData.emergencyPhone}`} className="hover:text-red-300 transition-colors">{doctorData.emergencyPhone}</a></p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-primary/20">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-bold mb-1 text-foreground">Email</h4>
                <a href={`mailto:${doctorData.email}`} className="text-muted-foreground hover:text-primary transition-colors text-xs">{doctorData.email}</a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-primary/20">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div className="w-full">
                <h4 className="text-sm font-bold mb-2 text-foreground">Hours</h4>
                <div className="space-y-1">
                  {Object.entries(doctorData.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center text-xs border-b border-border/30 pb-1">
                      <span className="text-foreground capitalize">{day}</span>
                      <span className={`font-medium ${hours === 'Closed' ? 'text-red-500' : 'text-muted-foreground'}`}>{hours as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-card border border-border p-1.5 rounded-3xl h-[250px]">
            <iframe 
              src="https://maps.google.com/maps?q=28.758113,77.503955&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-full border-0 rounded-[1.125rem] dark:invert-[.9] dark:hue-rotate-180" 
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
