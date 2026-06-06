import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { brandsData } from '../data/brandsData';

export default function TrustBar() {
  // Double the list to create a seamless infinite scroll loop
  const marqueeItems = [...brandsData, ...brandsData];

  return (
    <section className="bg-white py-10 border-y border-slate-200 overflow-hidden relative shadow-sm">
      {/* Side Vignettes for Fade-Out Effect */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 text-center mb-6">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
          <BadgeCheck className="w-4 h-4 text-blue-600" />
          Trusted National & International Sourcing Channels
        </span>
      </div>

      {/* Marquee Wrapper */}
      <div className="marquee-container overflow-hidden select-none">
        <div className="marquee-content flex gap-8 whitespace-nowrap animate-marquee w-max">
          {marqueeItems.map((brand, idx) => (
            <div 
              key={idx} 
              className="inline-flex items-center gap-4 px-6 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl hover:border-slate-350 hover:bg-slate-100/50 transition-all cursor-pointer group shadow-sm hover:scale-[1.01] shrink-0"
            >
              {/* Brand Logo Rendered Vector */}
              <div className="shrink-0 flex items-center h-7">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-6 w-auto object-contain text-slate-800" 
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'block';
                    }
                  }}
                />
                <span className="hidden font-extrabold text-sm text-slate-850 uppercase">
                  {brand.name}
                </span>
              </div>
              
              <div className="border-l border-slate-200 pl-3 shrink-0">
                <span className="block text-[8px] uppercase tracking-widest text-slate-500 font-extrabold whitespace-nowrap">
                  {brand.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
