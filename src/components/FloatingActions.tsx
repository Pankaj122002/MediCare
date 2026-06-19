
import { PhoneCall } from 'lucide-react';
import doctorData from '../data/doctor.json';

export const FloatingActions = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Emergency FAB */}
      <a 
        href={`tel:${doctorData.emergencyPhone}`}
        className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-red-500 text-white rounded-full shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:bg-red-600 transition-colors"
        aria-label="Call Emergency"
      >
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full border-2 border-red-500 animate-pulse-slow"></span>
        <PhoneCall className="w-6 h-6 md:w-7 md:h-7" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
          Emergency? Call Now
        </div>
      </a>
    </div>
  );
};
