import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface SpecialitiesGridProps {
  onOpenCarbonWithSpeciality: (topic: string) => void;
}

export const SpecialitiesGrid: React.FC<SpecialitiesGridProps> = ({ onOpenCarbonWithSpeciality }) => {
  const specialities = [
    {
      id: 'crash-repair',
      title: 'Accident & Crash Repair',
      category: 'Structural Restoration',
      image: '/src/assets/images/dent_removal_precision_1793389747264.jpg',
      headline: 'Complete chassis realignment and insurance-grade panel replacement.',
      description: 'From heavy front-end impacts to side-swipe collisions on Newcastle roads, our Condercum Road workshop handles full structural jig alignment, safety crumple-zone rebuilds, and direct insurance liaisons.',
      features: [
        'Chassis jig measurement & precision pull',
        'Direct insurer liaison & claim management',
        'OEM replacement panels & sensor re-calibration',
        'Full structural safety warranty documentation'
      ],
      baselinePrice: 'Assessed via photo & workshop bay inspection',
      ctaText: 'Quote Accident Repair'
    },
    {
      id: 'bodywork-paint',
      title: 'Flawless Bodywork & Paint',
      category: 'Computerized Refinishing',
      image: '/src/assets/images/paint_spray_booth_1793389746102.jpg',
      headline: 'Low-bake spray booth finishes with computerized spectrophotometer matching.',
      description: 'Erase key scratches, vandal gouges, stone-pecks, and faded clearcoats. Our heated downdraft spray booths ensure zero dust contamination and immaculate factory-depth mirror gloss.',
      features: [
        'Spectrophotometer digital color matching (any manufacturer code)',
        'Heated low-bake downdraft spray booth curing',
        'High-solid UV clearcoat with lifetime gloss warranty',
        'Seamless blend into surrounding panels (no visible borders)'
      ],
      baselinePrice: 'Paint Fix: ~£150 - £250 per panel',
      ctaText: 'Quote Paintwork'
    },
    {
      id: 'bumper-dent',
      title: 'Bumper & Dent Fixes',
      category: 'Rapid SMART Turnaround',
      image: '/src/assets/images/bumper_repair_craft_1793389746559.jpg',
      headline: 'Paintless Dent Removal (PDR) and plastic bumper welding in hours.',
      description: 'Don’t replace cracked or scraped plastic bumpers. We weld, re-shape, and spot-refinish bumper corners, while manipulating body dings from behind to preserve your original factory paint finish.',
      features: [
        'Paintless Dent Removal (PDR) for car park dings',
        'Plastic bumper split welding & scuff erasing',
        'Preservation of original vehicle factory paintwork',
        'Rapid same-day turnaround on booking'
      ],
      baselinePrice: 'Dent Removal: ~£80 - £150 · Bumper Scrape: ~£200',
      ctaText: 'Quote Dent or Bumper'
    }
  ];

  return (
    <section id="specialities" className="py-20 bg-[#060913] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-[#ef4444] mb-2 uppercase tracking-wider font-semibold">
            <span>Specialist Bodyshop Disciplines</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Condercum Road, Newcastle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Factory-Standard Precision. Transparent Independent Pricing.
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            Main dealer repair centers often quote thousands for complete panel swaps when precision repairs deliver superior factory-original results. Explore our core disciplines below.
          </p>
        </div>

        {/* 3-Column Operational Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialities.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-[#0c101a] border border-white/10 hover:border-[#dc2626]/50 transition-all duration-300 flex flex-col overflow-hidden group shadow-lg hover:shadow-[0_0_30px_rgba(220,38,38,0.15)]"
            >
              {/* Card Image Slot with Scrim */}
              <div className="relative h-56 overflow-hidden bg-slate-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c101a] via-[#0c101a]/20 to-transparent" />
                
                {/* Category label */}
                <div className="absolute top-4 left-4 text-xs font-mono font-medium text-slate-200 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                  {item.category}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#ef4444] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs font-medium text-slate-300 leading-snug">
                    {item.headline}
                  </p>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullet features */}
                  <ul className="mt-5 space-y-2 text-xs text-slate-300">
                    {item.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price Baseline & Action */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <div className="text-xs font-mono text-slate-400 mb-3">
                    <span className="text-slate-500 uppercase">Prototype Baseline:</span>
                    <span className="block text-slate-200 font-semibold mt-0.5">{item.baselinePrice}</span>
                  </div>

                  <button
                    onClick={() => onOpenCarbonWithSpeciality(item.title)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-white bg-slate-800/90 hover:bg-[#dc2626] transition-all border border-white/10 group-hover:border-[#dc2626]/40"
                  >
                    <span>{item.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
