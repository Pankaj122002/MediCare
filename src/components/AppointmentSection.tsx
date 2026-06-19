import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2, Loader2, Calendar } from 'lucide-react';
import doctorData from '../data/doctor.json';
import servicesData from '../data/services.json';

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal('')),
  date: z.string().min(1, "Please select a preferred date"),
  time: z.string().min(1, "Please select a preferred time"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().max(500).optional(),
  consent: z.boolean().refine(val => val === true, "You must agree to share your details")
});

type FormData = z.infer<typeof formSchema>;

export const AppointmentSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionMode, setSubmissionMode] = useState<'whatsapp' | 'email'>('whatsapp');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    const serviceName = servicesData.find(s => s.id === data.service)?.title || data.service;

    if (submissionMode === 'whatsapp') {
      const waMessage = `*New Appointment Request*%0A%0A` +
        `Name: ${data.name}%0A` +
        `Phone: ${data.phone}%0A` +
        `Email: ${data.email || 'N/A'}%0A` +
        `Date: ${data.date}%0A` +
        `Time: ${data.time}%0A` +
        `Service: ${serviceName}%0A` +
        `Message: ${data.message || 'N/A'}`;

      window.open(`https://wa.me/${doctorData.whatsapp}?text=${waMessage}`, '_blank');
    } else {
      const emailSubject = encodeURIComponent(`New Appointment Request: ${data.name}`);
      const emailBody = encodeURIComponent(
        `Name: ${data.name}\n` +
        `Phone: ${data.phone}\n` +
        `Email: ${data.email || 'N/A'}\n` +
        `Date: ${data.date}\n` +
        `Time: ${data.time}\n` +
        `Service: ${serviceName}\n` +
        `Message: ${data.message || 'N/A'}`
      );

      window.location.href = `mailto:${doctorData.email}?subject=${emailSubject}&body=${emailBody}`;
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    reset();

    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="appointment" className="py-8 md:py-12 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
        <Calendar className="w-64 md:w-96 h-64 md:h-96 text-primary" />
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
        <div className="text-center mb-5 md:mb-7">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-1.5">Secure Your Spot</h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-2 text-foreground">Book an Appointment</h3>
          <p className="text-muted-foreground text-sm">Skip the waiting room. Schedule your visit digitally in seconds.</p>
        </div>

        <div className="glass-card rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 shadow-2xl relative overflow-hidden">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-14 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-5">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h4 className="text-xl font-bold mb-2 text-foreground">Request Submitted!</h4>
              <p className="text-muted-foreground text-center max-w-sm text-sm">
                Your appointment request has been sent. We will review it and confirm via WhatsApp shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Full Name <span className="text-red-500">*</span></label>
                  <input
                    {...register('name')}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Service Needed <span className="text-red-500">*</span></label>
                  <select
                    {...register('service')}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
                  >
                    <option value="">Select a service...</option>
                    {servicesData.map(s => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                  {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Preferred Date <span className="text-red-500">*</span></label>
                  <input
                    {...register('date')}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Preferred Time <span className="text-red-500">*</span></label>
                  <select
                    {...register('time')}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none"
                  >
                    <option value="">Select time block...</option>
                    <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                    <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
                    <option value="Evening (4PM - 8PM)">Evening (4PM - 8PM)</option>
                  </select>
                  {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Brief Message / Symptoms</label>
                <textarea
                  {...register('message')}
                  rows={3}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="Please describe your symptoms or reason for visit..."
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
              </div>

              {/* Consent */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  {...register('consent')}
                  id="consent"
                  className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary bg-background flex-shrink-0"
                />
                <label htmlFor="consent" className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  I agree to share my details with the clinic for the purpose of scheduling an appointment. I understand my data will be securely transmitted via WhatsApp and Email.
                </label>
              </div>
              {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message}</p>}

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <button
                  type="submit"
                  onClick={() => setSubmissionMode('whatsapp')}
                  disabled={isSubmitting}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-medium py-3.5 md:py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  {isSubmitting && submissionMode === 'whatsapp' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Book via WhatsApp'
                  )}
                </button>

                <button
                  type="submit"
                  onClick={() => setSubmissionMode('email')}
                  disabled={isSubmitting}
                  className="flex-1 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-medium py-3.5 md:py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  {isSubmitting && submissionMode === 'email' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Book via Email'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
