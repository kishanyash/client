import React from 'react';
import { Award, CheckCircle2, ShieldCheck, MapPin, Zap } from 'lucide-react';
import { brandsData } from '../data/brandsData';

export default function BrandsSection({ onOpenQuote }) {
  return (
    <section className="py-20 md:py-24 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold tracking-wider text-blue-700 uppercase">
            🤝 Authorized Brands
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Exclusive Brand <span className="text-gradient-blue">Distribution</span> & Trust
          </h2>
          <p className="text-brand-textSecondary text-base sm:text-lg font-medium">
            Ultra D is a vetted authorized partner for top-tier national and international product brands, providing complete compliance and authentic warranty coverage.
          </p>
        </div>

        {/* Brands Cards list */}
        <div className="space-y-8">
          {brandsData.map((brand, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 hover:border-slate-350 rounded-3xl p-6 sm:p-10 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-md"
            >
              {/* Decorative accent background stripe */}
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-600 to-cyan-500" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Brand Logo Representer & Badge */}
                <div className="lg:col-span-4 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-lg inline-block">
                    {brand.badge}
                  </span>

                  <div className="h-12 flex items-center">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-10 w-auto object-contain text-slate-800"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                    {brand.name}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <MapPin className="w-4 h-4 text-slate-450 shrink-0" />
                    <span>Coverage: {brand.reach}</span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onOpenQuote({ message: `Inquiring about corporate distribution supply partnership with: ${brand.name}` })}
                      className="py-2.5 px-5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-350 text-xs font-bold text-slate-800 transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      Inquire Distribution Deal <Zap className="w-3.5 h-3.5 text-blue-600" />
                    </button>
                  </div>
                </div>

                {/* Brand description & catalog details */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Operational Overview</h4>
                    <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-semibold">
                      {brand.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Categories managed */}
                    <div>
                      <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Primary Categories Handled</h5>
                      <span className="text-sm font-extrabold text-slate-900 block">
                        {brand.categories}
                      </span>
                    </div>

                    {/* Authorized Benefits */}
                    <div>
                      <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Credibility Protections</h5>
                      <ul className="space-y-1.5">
                        {brand.benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-center gap-2 text-xs text-slate-655 font-bold">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
