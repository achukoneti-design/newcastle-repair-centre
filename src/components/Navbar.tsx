import React from 'react';
import { Phone, Sparkles, MapPin, Clock } from 'lucide-react';

interface NavbarProps {
  onOpenCarbon: (initialPrompt?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCarbon }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#030712]/92 backdrop-blur-md border-b border-white/10">
      {/* Top micro-announcement bar */}
      <div className="hidden sm:block border-b border-white/5 bg-[#020617] py-1.5 px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#dc2626]" />
              Unit D, Condercum Road, Newcastle upon Tyne, NE4 8XQ
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Mon-Fri 8:30 AM - 5:30 PM · Sat 9:00 AM - 1:00 PM
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-300">Reliable Body Works & Repairs</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <a href="tel:07466106529" className="text-[#ef4444] hover:underline font-semibold font-mono">
              Call: 07466 106529
            </a>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Authentic Brand Logo & Wordmark */}
        <a href="#" className="flex items-center gap-3 tracking-tight whitespace-nowrap shrink-0 group">
          <img
            src="/src/assets/logo.png"
            alt="Newcastle Repair Centre official logo"
            className="w-12 h-12 object-contain group-hover:scale-105 transition-transform drop-shadow-[0_0_12px_rgba(220,38,38,0.4)]"
          />
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#dc2626] uppercase">
              NEWCASTLE
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-wider text-white uppercase -mt-1">
              REPAIR CENTRE
            </span>
          </div>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#specialities" className="hover:text-[#ef4444] transition-colors whitespace-nowrap shrink-0">
            Specialities
          </a>
          <a href="#calculator" className="hover:text-[#ef4444] transition-colors whitespace-nowrap shrink-0">
            Instant Estimator
          </a>
          <a href="#comparison" className="hover:text-[#ef4444] transition-colors whitespace-nowrap shrink-0">
            Before & After
          </a>
          <a href="#workshop" className="hover:text-[#ef4444] transition-colors whitespace-nowrap shrink-0">
            Condercum Rd Hub
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:07466106529"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-mono font-semibold text-slate-200 hover:text-white border border-white/10 rounded-xl hover:border-white/20 transition-colors whitespace-nowrap shrink-0 bg-slate-900/60"
          >
            <Phone className="w-3.5 h-3.5 text-[#dc2626]" />
            07466 106529
          </a>
          <button
            onClick={() => onOpenCarbon()}
            className="inline-flex items-center gap-2 px-4.5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#dc2626] hover:bg-[#b91c1c] rounded-xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.45)] hover:shadow-[0_0_30px_rgba(220,38,38,0.65)] active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Consult CARBON</span>
          </button>
        </div>
      </div>
    </header>
  );
};
