import React, { useState } from 'react';
import { Calculator, Sparkles } from 'lucide-react';

interface RepairEstimatorProps {
  onSendToCarbon: (promptText: string) => void;
}

export const RepairEstimator: React.FC<RepairEstimatorProps> = ({ onSendToCarbon }) => {
  const [selectedPanel, setSelectedPanel] = useState<string>('Front Bumper');
  const [selectedDamage, setSelectedDamage] = useState<string>('Bumper Scrape');
  const [paintBlending, setPaintBlending] = useState<boolean>(true);
  const [severity, setSeverity] = useState<'minor' | 'moderate' | 'deep'>('moderate');

  // Baseline metric calculations
  const calculateEstimate = () => {
    let low = 0;
    let high = 0;

    if (selectedDamage === 'Dent Removal') {
      low = 80;
      high = 150;
    } else if (selectedDamage === 'Paint Fix / Scratch') {
      low = 150;
      high = 250;
    } else if (selectedDamage === 'Bumper Scrape') {
      low = 180;
      high = 220; // centered around ~£200
    } else if (selectedDamage === 'Full Crash / Multi-Damage') {
      low = 350;
      high = 650;
    }

    // Severity multipliers
    if (severity === 'minor') {
      low = Math.round(low * 0.9);
      high = Math.round(high * 0.9);
    } else if (severity === 'deep') {
      low = Math.round(low * 1.25);
      high = Math.round(high * 1.3);
    }

    if (paintBlending && selectedDamage !== 'Dent Removal') {
      low += 40;
      high += 60;
    }

    return { low, high, mid: Math.round((low + high) / 2) };
  };

  const estimate = calculateEstimate();

  const handleConsultCarbonWithConfig = () => {
    const prompt = `Hi Carbon, I configured an estimate on your website for my ${selectedPanel} with ${selectedDamage} (${severity} severity, blend: ${paintBlending ? 'yes' : 'no'}). The calculator indicated ~£${estimate.low}-£${estimate.high}. How soon can the Condercum Road workshop take a look?`;
    onSendToCarbon(prompt);
  };

  return (
    <section id="calculator" className="py-20 bg-[#030712] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ef4444] mb-2 uppercase tracking-wider font-semibold">
              <Calculator className="w-4 h-4" />
              <span>Interactive Bodyshop Quoting Tool</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Instant Repair Cost Calculator
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Configured using Newcastle Repair Centre's baseline test metrics. Select your panel and damage type to generate an instant prototype estimate.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 bg-slate-900/80 border border-white/10 px-4 py-2.5 rounded-xl flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
            <span>Prototype Baseline: Paint (~£150-£250) · Dent (~£80-£150) · Bumper (~£200)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Configuration Inputs */}
          <div className="lg:col-span-7 bg-[#0b0f19] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            
            {/* Step 1: Vehicle Panel Selector */}
            <div>
              <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 block mb-3">
                1. Select Vehicle Panel
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  'Front Bumper',
                  'Rear Bumper',
                  'Driver / Passenger Door',
                  'Front Wing / Fender',
                  'Bonnet / Boot Lid',
                  'Rear Quarter Panel'
                ].map((panel) => (
                  <button
                    key={panel}
                    type="button"
                    onClick={() => setSelectedPanel(panel)}
                    className={`px-3 py-2.5 text-xs font-medium rounded-xl text-left border transition-all ${
                      selectedPanel === panel
                        ? 'bg-[#dc2626]/15 border-[#dc2626] text-white font-semibold shadow-[0_0_15px_rgba(220,38,38,0.25)]'
                        : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white hover:border-white/15'
                    }`}
                  >
                    <span className="block truncate">{panel}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Damage Type */}
            <div>
              <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 block mb-3">
                2. Select Damage Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    type: 'Bumper Scrape',
                    desc: 'Corner scuff, paint transfer, plastic reconditioning (~£200)'
                  },
                  {
                    type: 'Dent Removal',
                    desc: 'Car park ding, crease, Paintless PDR pull (~£80-£150)'
                  },
                  {
                    type: 'Paint Fix / Scratch',
                    desc: 'Key scratch, stone chips, spray booth re-spray (~£150-£250)'
                  },
                  {
                    type: 'Full Crash / Multi-Damage',
                    desc: 'Combined panel dent and deep metallic paint break'
                  }
                ].map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setSelectedDamage(item.type)}
                    className={`p-3.5 text-left rounded-xl border transition-all flex flex-col justify-between ${
                      selectedDamage === item.type
                        ? 'bg-[#dc2626]/15 border-[#dc2626] text-white'
                        : 'bg-slate-900/60 border-white/5 text-slate-400 hover:border-white/15'
                    }`}
                  >
                    <span className="text-xs font-semibold text-white">{item.type}</span>
                    <span className="text-[11px] text-slate-400 mt-1 leading-normal">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Severity & Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                  3. Damage Depth / Severity
                </label>
                <div className="flex gap-2 p-1 bg-slate-950 rounded-xl border border-white/10">
                  {(['minor', 'moderate', 'deep'] as const).map((sev) => (
                    <button
                      key={sev}
                      type="button"
                      onClick={() => setSeverity(sev)}
                      className={`flex-1 py-1.5 text-xs font-medium capitalize rounded-lg transition-all ${
                        severity === sev
                          ? 'bg-[#dc2626] text-white font-bold shadow-[0_0_12px_rgba(220,38,38,0.4)]'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                  Adjacent Clearcoat Blend
                </label>
                <button
                  type="button"
                  onClick={() => setPaintBlending(!paintBlending)}
                  className={`w-full py-2 px-3 text-xs font-medium rounded-xl border flex items-center justify-between transition-all ${
                    paintBlending
                      ? 'bg-slate-900 border-[#dc2626]/40 text-slate-200'
                      : 'bg-slate-950 border-white/5 text-slate-400'
                  }`}
                >
                  <span>Seamless Panel Blending</span>
                  <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                    paintBlending ? 'bg-[#dc2626] text-white font-bold' : 'border border-white/20'
                  }`}>
                    {paintBlending && '✓'}
                  </span>
                </button>
              </div>
            </div>

          </div>

          {/* Real-time Tally Card & CARBON AI Handoff */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#111827] to-[#030712] border border-white/15 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase">Prototype Calculation</span>
                <h3 className="text-lg font-bold text-white mt-0.5">Mockup Estimate Breakdown</h3>
              </div>
              <span className="text-xs font-mono text-[#ef4444] bg-[#dc2626]/10 border border-[#dc2626]/30 px-2 py-0.5 rounded">
                Live Metrics
              </span>
            </div>

            {/* Spec breakdown */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-white/5 text-slate-300">
                <span className="text-slate-400">Target Panel:</span>
                <span className="font-semibold text-white">{selectedPanel}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5 text-slate-300">
                <span className="text-slate-400">Damage Classification:</span>
                <span className="font-semibold text-white">{selectedDamage}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5 text-slate-300">
                <span className="text-slate-400">Damage Severity:</span>
                <span className="font-semibold text-white capitalize">{severity}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5 text-slate-300">
                <span className="text-slate-400">Computerized Color Blend:</span>
                <span className="font-semibold text-white">{paintBlending ? 'Yes (+£40-£60)' : 'No (Spot polish only)'}</span>
              </div>
              <div className="flex justify-between py-1 text-slate-300">
                <span className="text-slate-400">Workshop Location:</span>
                <span className="font-mono text-[#ef4444]">Condercum Rd (NE4 8XQ)</span>
              </div>
            </div>

            {/* Big Price Range Display */}
            <div className="bg-black/60 rounded-xl p-5 border border-white/10 text-center space-y-1">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Estimated Bodyshop Total</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#ef4444] font-mono tabular-nums">
                £{estimate.low} – £{estimate.high}
              </div>
              <span className="text-[11px] text-slate-500 block">
                *Mockup estimate for prototype portfolio build. Dealer equivalent: ~£450–£650+
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleConsultCarbonWithConfig}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#dc2626] hover:bg-[#b91c1c] transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_28px_rgba(220,38,38,0.6)]"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Feed this Spec to CARBON AI</span>
              </button>

              <p className="text-[11px] text-center text-slate-400 leading-tight">
                Or upload a photo directly in the bottom-right chat for instant AI damage inspection.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
