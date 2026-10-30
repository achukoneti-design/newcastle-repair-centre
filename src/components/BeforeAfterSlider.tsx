import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SlidersHorizontal, CheckCircle2, AlertTriangle } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <section id="comparison" className="py-20 bg-[#060913] border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#ef4444] mb-2 uppercase tracking-wider font-semibold">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Visual Craftsmanship Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Before & After: Flawless Factory Restoration
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base">
            Drag the red slider below to see how our Condercum Road technicians erase deep key scratches, bumper splits, and car park dings without leaving edge lines or orange peel.
          </p>
        </div>

        {/* Interactive Comparison Canvas */}
        <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/15 bg-slate-950 shadow-2xl select-none">
          
          <div
            ref={containerRef}
            className="relative h-[340px] sm:h-[480px] w-full cursor-ew-resize overflow-hidden"
            onMouseDown={() => setIsDragging(true)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onClick={(e) => handleMove(e.clientX)}
          >
            {/* "AFTER" (Full background image: Restored, High-Gloss Finish) */}
            <img
              src="/src/assets/images/bumper_repair_craft_1793389746559.jpg"
              alt="Newcastle Repair Centre Restored Finish"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              referrerPolicy="no-referrer"
            />
            
            {/* Label for AFTER */}
            <div className="absolute top-5 right-5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/85 border border-[#dc2626]/60 backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-[#ef4444]" />
              <span className="text-xs font-mono font-bold text-white tracking-wider uppercase">
                AFTER: Restored Gloss
              </span>
            </div>

            {/* "BEFORE" (Clipped image overlay: Damaged State) */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src="/src/assets/images/dent_removal_precision_1793389747264.jpg"
                alt="Vehicle Damaged State"
                className="absolute inset-0 w-full h-full object-cover object-center max-w-none filter contrast-125 saturate-50"
                style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
                referrerPolicy="no-referrer"
              />
              
              {/* Subtle damage overlay filter */}
              <div className="absolute inset-0 bg-red-950/25 mix-blend-color-burn" />

              {/* Label for BEFORE */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/85 border border-white/20 backdrop-blur-md">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-bold text-slate-200 tracking-wider uppercase">
                  BEFORE: Panel Ding & Scrapes
                </span>
              </div>
            </div>

            {/* Drag Handle Divider in Shop Red */}
            <div
              className="absolute top-0 bottom-0 z-30 w-1 bg-[#dc2626] pointer-events-none shadow-[0_0_18px_#dc2626]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-black border-2 border-[#dc2626] flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.7)]">
                <div className="flex items-center gap-0.5 text-[#ef4444] text-xs font-mono font-bold">
                  <span>◀</span>
                  <span>▶</span>
                </div>
              </div>
            </div>

          </div>

          {/* Under-canvas instruction and info bar */}
          <div className="p-4 sm:p-5 bg-[#0b0e17] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
              <span>Condercum Road Downdraft Spray Booth Finish · 100% Color Code Precision</span>
            </div>
            <div className="font-mono text-slate-300">
              Drag slider left / right to compare
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
