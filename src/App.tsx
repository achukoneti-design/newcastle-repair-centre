import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { SpecialitiesGrid } from './components/SpecialitiesGrid.tsx';
import { RepairEstimator } from './components/RepairEstimator.tsx';
import { BeforeAfterSlider } from './components/BeforeAfterSlider.tsx';
import { WorkshopSidebar } from './components/WorkshopSidebar.tsx';
import { CarbonAssistant } from './components/CarbonAssistant.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [isCarbonOpen, setIsCarbonOpen] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState<string | undefined>(undefined);

  const handleOpenCarbon = (prompt?: string) => {
    if (prompt) {
      setInitialPrompt(prompt);
    }
    setIsCarbonOpen(true);
  };

  const handleScrollToCalculator = () => {
    const el = document.getElementById('calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-[#dc2626] selection:text-white">
      {/* Sticky Navigation Header */}
      <Navbar onOpenCarbon={() => handleOpenCarbon()} />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Bold Hero Section with Condercum Road Subtitles */}
        <Hero 
          onOpenCarbon={handleOpenCarbon} 
          onScrollToCalculator={handleScrollToCalculator} 
        />

        {/* 3-Column Operational Specialities Grid */}
        <SpecialitiesGrid 
          onOpenCarbonWithSpeciality={(spec) => 
            handleOpenCarbon(`Hi Carbon, I'd like a quote for ${spec} at your Condercum Road workshop.`)
          } 
        />

        {/* Interactive Repair Cost Estimator */}
        <RepairEstimator 
          onSendToCarbon={(specPrompt) => handleOpenCarbon(specPrompt)} 
        />

        {/* Interactive Before & After Restoration Slider */}
        <BeforeAfterSlider />

        {/* Contact, Location & Opening Hours Hub */}
        <WorkshopSidebar />
      </main>

      {/* Quiet Footer */}
      <Footer />

      {/* CARBON AI Assistant (The Smart AI Workshop Assistant) */}
      <CarbonAssistant
        isOpen={isCarbonOpen}
        onClose={() => {
          setIsCarbonOpen(false);
          setInitialPrompt(undefined);
        }}
        onOpen={() => handleOpenCarbon()}
        initialPrompt={initialPrompt}
      />
    </div>
  );
}
