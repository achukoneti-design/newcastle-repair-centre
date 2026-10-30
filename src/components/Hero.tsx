import React from 'react';
import { Sparkles, Calculator, MapPin, Wrench, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenCarbon: (initialPrompt?: string) => void;
  onScrollToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCarbon, onScrollToCalculator }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-white/10 carbon-weave">
      {/* Background ambient red glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#dc2626]/12 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Location & Trust Kicker (clean unboxed metadata) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-[#ef4444] font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                CONDERCUM ROAD, NEWCASTLE UPON TYNE
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>INDEPENDENT AUTO BODY SHOP</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">NE4 8XQ / NE4 9XN</span>
            </div>

            {/* Dominant Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
              SMART REPAIR WITHOUT THE{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                MAIN DEALER
              </span>{' '}
              <span className="text-[#dc2626] underline decoration-[#dc2626]/40 decoration-4 underline-offset-8">
                PRICES.
              </span>
            </h1>

            {/* Condercum Road Specialities Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Newcastle's dedicated vehicle bodywork and crash repair specialists on Condercum Road. From minor bumper scuffs and car park dings to complete computerized panel resprays—delivering showroom-standard finishes without franchised dealership premiums.
            </p>

            {/* Quick Speciality Feature Ticks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#dc2626] shrink-0" />
                <span>Downdraft Low-Bake Booth</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#dc2626] shrink-0" />
                <span>Precision Dent Removal (PDR)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#dc2626] shrink-0" />
                <span>Same-Day Bumper Scuffs</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenCarbon('Hi Carbon, I have car damage on Condercum Road and want a quote.')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-[#dc2626] hover:bg-[#b91c1c] rounded-xl transition-all shadow-[0_0_24px_rgba(220,38,38,0.4)] hover:shadow-[0_0_35px_rgba(220,38,38,0.6)] active:scale-[0.98] whitespace-nowrap"
              >
                <Sparkles className="w-4.5 h-4.5 text-white" />
                <span>Quote with CARBON AI</span>
              </button>

              <button
                onClick={onScrollToCalculator}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-white/10 hover:border-white/25 rounded-xl transition-all whitespace-nowrap"
              >
                <Calculator className="w-4 h-4 text-[#ef4444]" />
                <span>Instant Panel Estimator</span>
              </button>
            </div>

            {/* Baseline Metrics Quick Notice */}
            <div className="pt-1 flex items-center gap-3 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
              <span>Prototype baseline guides: Paint Fix (~£150-£250) · Dent Removal (~£80-£150) · Bumper Scrape (~£200)</span>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset with Scrim & Official Logo Inset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-slate-900 shadow-2xl group">
              <img
                src="/src/assets/images/bodyshop_hero_facility_1793389746003.jpg"
                alt="Newcastle Repair Centre workshop on Condercum Road"
                className="w-full h-[360px] sm:h-[440px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* High contrast gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent" />

              {/* Official Brand Badge overlay */}
              <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/80 border border-white/15 backdrop-blur-md flex items-center gap-2.5 shadow-lg">
                <img
                  src="/src/assets/logo.png"
                  alt="NRC Logo"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-xs font-mono font-bold text-white tracking-wider">
                  OFFICIAL WORKSHOP
                </span>
              </div>

              {/* In-Frame Live Bodyshop Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0b0f19]/90 border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#ef4444]">
                      <Wrench className="w-3.5 h-3.5" />
                      <span>CONDERCUM ROAD WORKSHOP ACTIVE</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Infrared Curing & Precision Spectrophotometer Booth
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-slate-400">Main Dealer Saving</span>
                    <p className="text-sm font-bold text-[#ef4444] font-mono">Up to 60%</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4-Item Proof Metrics Row */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Facility Address</p>
            <p className="text-sm sm:text-base font-semibold text-white mt-1">Condercum Road, NE4 8XQ</p>
            <p className="text-xs text-slate-400 mt-0.5">Newcastle upon Tyne</p>
          </div>
          <div>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Paint Finish</p>
            <p className="text-sm sm:text-base font-semibold text-[#ef4444] mt-1 font-mono">100% Digital Code Match</p>
            <p className="text-xs text-slate-400 mt-0.5">Low-bake downdraft oven</p>
          </div>
          <div>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Dent Removal</p>
            <p className="text-sm sm:text-base font-semibold text-white mt-1">Paintless Dent Repair (PDR)</p>
            <p className="text-xs text-slate-400 mt-0.5">Original clearcoat preserved</p>
          </div>
          <div>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Fast Turnaround</p>
            <p className="text-sm sm:text-base font-semibold text-white mt-1">Same-Day Express Available</p>
            <p className="text-xs text-slate-400 mt-0.5">Mon-Fri 8:30-5:30 · Sat 9-1</p>
          </div>
        </div>

      </div>
    </section>
  );
};
