import { BadgeCheck } from 'lucide-react';
import { brandsData } from '../data/brandsData';

export default function TrustBar() {
  // Double the list to create a seamless infinite scroll loop
  const marqueeItems = [...brandsData, ...brandsData];

  return (
    <section className="bg-white py-10 border-y border-brand-border overflow-hidden relative shadow-sm">
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
        <div className="marquee-content flex items-center gap-16 whitespace-nowrap animate-marquee w-max">
          {marqueeItems.map((brand, idx) => (
            <div key={idx} className="shrink-0 flex items-center h-10">
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-8 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = 'block';
                  }
                }}
              />
              <span className="hidden font-extrabold text-base text-slate-800 uppercase">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
