import { useState, useEffect } from 'react';
import { BadgeCheck } from 'lucide-react';
import { fetchBrandsFromSupabase } from '../utils/supabaseBrands';

export default function TrustBar() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchBrandsFromSupabase().then(dbBrands => {
      if (dbBrands && dbBrands.length > 0) {
        const formatted = dbBrands.map(b => ({
          name: b.name,
          logo: b.logo_url
        }));
        setBrands(formatted);
      }
    });
  }, []);

  // Don't render TrustBar if no brands added yet
  if (brands.length === 0) return null;

  const marqueeItems = [...brands, ...brands];

  return (
    <section className="bg-white py-10 border-y border-brand-border overflow-hidden relative shadow-sm">
      {/* Side Vignettes for Fade-Out Effect */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 text-center mb-6">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-2">
          <BadgeCheck className="w-4 h-4 text-blue-600" />
          Trusted by Elite National & International Brands
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
                className="h-8 max-w-[140px] object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) {
                    e.target.nextSibling.style.display = 'block';
                  }
                }}
              />
              <span className="hidden font-extrabold text-base text-slate-800 uppercase tracking-wider">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
