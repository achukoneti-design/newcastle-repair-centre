import React from 'react';
import { MapPin, Phone, Clock, Mail, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#02050c] border-t border-white/10 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/logo.png"
                alt="Newcastle Repair Centre official logo"
                className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(220,38,38,0.35)]"
              />
              <div className="flex flex-col">
                <span className="text-base font-bold text-[#dc2626] uppercase tracking-tight">
                  NEWCASTLE
                </span>
                <span className="text-xs font-semibold text-white uppercase tracking-wider -mt-1">
                  REPAIR CENTRE LTD
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Independent automotive bodyshop and accident repair specialists on Condercum Road, Newcastle upon Tyne. Reliable vehicle bodyworks, spray booth re-sprays, bumper scuff erasure, and paintless dent removal.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono">
              <ShieldCheck className="w-4 h-4 text-[#ef4444]" />
              <span>Full Insurance & OEM Paint Compliance Standards</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Workshop Disciplines
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#specialities" className="hover:text-[#ef4444] transition-colors">Accident & Crash Repair</a></li>
              <li><a href="#specialities" className="hover:text-[#ef4444] transition-colors">Flawless Bodywork & Paint</a></li>
              <li><a href="#specialities" className="hover:text-[#ef4444] transition-colors">Bumper Scrape & Dent Fixes</a></li>
              <li><a href="#calculator" className="hover:text-[#ef4444] transition-colors">Instant Panel Cost Estimator</a></li>
              <li><a href="#comparison" className="hover:text-[#ef4444] transition-colors">Before & After Restoration</a></li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Condercum Road Location
            </h4>
            <div className="space-y-2 text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
                <span>Unit D, Condercum Road, Newcastle upon Tyne, NE4 8XQ</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ef4444] shrink-0" />
                <a href="tel:07466106529" className="hover:text-[#ef4444] font-mono">07466 106529</a>
                <span className="text-slate-600">/</span>
                <a href="tel:01912745800" className="hover:text-[#ef4444] font-mono">0191 274 5800</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <a href="mailto:Thenrc@outlook.com" className="hover:text-[#ef4444]">Thenrc@outlook.com</a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Mon-Fri 8:30 AM - 5:30 PM · Sat 9:00 AM - 1:00 PM</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Newcastle Repair Centre Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Unit D, Condercum Road</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Newcastle upon Tyne</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>CARBON AI Prototype</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
