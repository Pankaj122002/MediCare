import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import doctorData from '../data/doctor.json';

export const ContactSection = () => {
  return (
    <section id="contact" className="py-16 md:py-20 bg-background relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Get in Touch</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-foreground">Visit Our Clinic</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-foreground">Location</h4>
                <p className="text-muted-foreground">{doctorData.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-foreground">Contact Numbers</h4>
                <p className="text-muted-foreground mb-1">Clinic: <a href={`tel:${doctorData.clinicPhone}`} className="hover:text-primary transition-colors">{doctorData.clinicPhone}</a></p>
                <p className="text-red-400">Emergency: <a href={`tel:${doctorData.emergencyPhone}`} className="hover:text-red-300 transition-colors">{doctorData.emergencyPhone}</a></p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2 text-foreground">Email</h4>
                <a href={`mailto:${doctorData.email}`} className="text-muted-foreground hover:text-primary transition-colors">{doctorData.email}</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className="w-full">
                <h4 className="text-xl font-bold mb-4 text-foreground">Working Hours</h4>
                <div className="space-y-2">
                  {Object.entries(doctorData.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
                      <span className="text-foreground capitalize">{day}</span>
                      <span className={`font-medium ${hours === 'Closed' ? 'text-red-500' : 'text-muted-foreground'}`}>{hours as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-card border border-border p-2 rounded-3xl h-[500px]">
            <iframe 
              src="https://maps.google.com/maps?q=28.758113,77.503955&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              className="w-full h-full border-0 rounded-[1.25rem] dark:invert-[.9] dark:hue-rotate-180" 
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
