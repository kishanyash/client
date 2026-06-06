import React, { useState } from 'react';
import { Layers, ShieldCheck, Box, Truck, CheckCircle2, ChevronRight } from 'lucide-react';

export default function SupplyChainSection({ onOpenQuote }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: '01. Sourcing Network',
      subtitle: 'Requirement Definition & Sourcing',
      desc: 'We map direct manufacturer connections, execute volume price negotiations, and run QA checks to ensure 100% genuine brand authentication.',
      bullets: ['Direct-to-mill agreements', 'Strict sample verification', 'Pre-negotiated price tiers']
    },
    {
      title: '02. Hub Warehousing',
      subtitle: 'Vetted Stock Preservation & Storage',
      desc: 'We store high-volume inventories across state-of-the-art logistics hubs in Mumbai, Delhi-NCR, and Bangalore to resolve logistics lags.',
      bullets: ['Climate controlled tech vaults', 'Real-time stock level monitoring', 'Amazon-compliant labeling']
    },
    {
      title: '03. Custom Assembly',
      subtitle: 'Packaging & Individual Branding',
      desc: 'Our specialized packaging lines emboss logos, print customized matte sleeves, arrange joiner goods inside premium cardboard boxes, and check wrap weights.',
      bullets: ['Laser logo engraving', 'Eco-friendly cardboard wrapping', 'Custom greeting card inserts']
    },
    {
      title: '04. Last-Mile Dispatch',
      subtitle: 'Nationwide Delivery Rollout',
      desc: 'We dispatch bulk boxes directly to corporate head offices or coordinate individualized shipments sent directly to employee home desktops in Tier 1, 2, and 3 zones.',
      bullets: ['Pan-India courier integrations', 'Full tracking dashboard', 'Single point dispatch billing']
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold tracking-wider text-blue-700 uppercase">
            📦 Logistics & Operations
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Single-Point <span className="text-gradient-blue">Accountability</span> Sourcing
          </h2>
          <p className="text-brand-textSecondary text-base sm:text-lg font-medium">
            We handle everything from definition to final last-mile doorstep rollout. No vendor fragmentation, zero logistics friction.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Supply Chain step indicators */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Integrated supply chain flow</h3>
            
            <div className="space-y-3">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    activeStep === idx 
                      ? 'border-blue-650 bg-blue-50/50 text-blue-800 shadow-sm' 
                      : 'border-slate-200 bg-white text-slate-655 hover:border-slate-350 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-extrabold text-sm uppercase tracking-wide ${activeStep === idx ? 'text-blue-800' : 'text-slate-700'}`}>{step.title}</span>
                    <ChevronRight className={`w-4 h-4 text-blue-600 transition-transform ${activeStep === idx ? 'rotate-90' : ''}`} />
                  </div>
                  
                  {activeStep === idx && (
                    <div className="mt-3.5 space-y-3 animate-fadeIn text-slate-600 text-xs sm:text-sm">
                      <span className="block font-extrabold text-slate-800 uppercase tracking-wider text-[11px]">
                        {step.subtitle}
                      </span>
                      <p className="leading-relaxed font-semibold">
                        {step.desc}
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1.5 border-t border-slate-100">
                        {step.bullets.map((b, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-1.5 text-xs text-slate-800 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            {b}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Warehouse Image Showcase */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-2xl border border-slate-200 bg-white p-2 overflow-hidden shadow-xl">
              <img 
                src="warehouse_logistics.png" 
                alt="Ultra D high-efficiency modern warehousing logistics center" 
                className="w-full h-auto rounded-xl object-cover hover:scale-[1.01] transition-transform duration-500"
              />
              {/* Overlay Glassmorphism card */}
              <div className="absolute bottom-6 right-6 glassmorphism px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 max-w-[280px]">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Truck className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <span className="block text-xs font-black text-slate-900 uppercase tracking-wide">Pan-India Cargo</span>
                  <span className="block text-[10px] text-slate-500 font-semibold">SLA-backed transit times</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-sm">
              <span className="block text-xs font-bold text-slate-900 uppercase tracking-widest mb-1.5">Need a logistics breakdown?</span>
              <p className="text-xs text-slate-500 leading-relaxed mb-3 font-semibold">
                Download our corporate warehouse guidelines or request a detailed logistics layout for high-volume quick commerce supply.
              </p>
              <button 
                onClick={() => onOpenQuote({ message: 'Requesting warehouse logistics & pan-India delivery timelines overview.' })}
                className="py-2.5 px-6 rounded-xl bg-slate-550 hover:bg-slate-600 border border-slate-200 hover:border-slate-350 text-xs font-bold text-white transition-all shadow-sm"
              >
                Inquire Warehousing Capacity
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
