import { useState } from 'react';
import { ShieldCheck, Layers, Gift, Award, Zap } from 'lucide-react';

export default function WhatWeDo({ onOpenQuote }) {
  const [activeCard, setActiveCard] = useState(null);

  const pillars = [
    {
      id: 'procurement',
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      title: 'Corporate Procurement',
      sub: 'Requirement Definition & Vendor Consolidation',
      desc: 'We solve B2B procurement pauses. We help specify precise technical metrics, consolidate vendors, negotiate network-wide pricing, and handle end-to-end purchasing pipelines.',
      bullets: ['Detailed technical audit', 'Multi-brand consolidation', 'Volume negotiated prices', 'Complete SLA compliance'],
      tabTarget: 'supply'
    },
    {
      id: 'gifting',
      icon: <Gift className="w-6 h-6 text-blue-600" />,
      title: 'Promotional & Gifting',
      sub: 'Custom Branding & Premium Gift Sets',
      desc: 'High-margin corporate gifting and custom assembly at scale. We manage everything from employee joining kits, calendar sets, to custom eco-friendly hampers with bespoke packaging.',
      bullets: ['Custom logo emboss & print', 'Bespoke box & bag options', 'Individual pan-India delivery', 'Bulk stock management'],
      tabTarget: 'supply'
    },
    {
      id: 'distribution',
      icon: <Award className="w-6 h-6 text-blue-600" />,
      title: 'Distribution Partnerships',
      sub: 'Exclusive National Brand Distribution',
      desc: 'Trusted national partner for leading consumer tech and lifestyle products. Elite distributor for Fuji Films, Philips LFR, and AWIPL with direct warehouse-to-dealer networks.',
      bullets: ['Exclusive channel rights', 'Large-scale inventory', 'Authentic brand warranties', 'Direct corporate supply'],
      tabTarget: 'distribution'
    },
    {
      id: 'quickcommerce',
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: 'Quick Commerce Supply',
      sub: 'Amazon & Q-Comm Fulfillment Nodes',
      desc: 'Specialized inventory warehousing and logistics pipelines built to feed Amazon Wholesale, large-scale commerce marketplaces, and direct quick commerce hubs.',
      bullets: ['Marketplace compliance packaging', 'Fast turnaround sorting', 'Real-time stock alerts', 'Frictionless bulk shipping'],
      tabTarget: 'distribution'
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold tracking-wider text-blue-700 uppercase">
            What We Do
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            End-to-End <span className="text-gradient-blue">B2B Sourcing</span> Solutions
          </h2>
          <p className="text-brand-textSecondary text-base sm:text-lg font-medium">
            We simplify corporate procurement. We help leading brands optimize supply networks, personalize gifting hampers, and manage high-volume logistics.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar) => (
            <div 
              key={pillar.id}
              onMouseEnter={() => setActiveCard(pillar.id)}
              onMouseLeave={() => setActiveCard(null)}
              className={`glow-card rounded-2xl p-8 transition-all duration-500 border ${
                activeCard === pillar.id 
                  ? 'border-blue-200 bg-blue-50/30 shadow-lg shadow-blue-500/5 -translate-y-1' 
                  : 'border-brand-border bg-white shadow-sm'
              }`}
            >
              {/* Header Box */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-brand-border flex items-center justify-center shrink-0">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-blue-700">
                      {pillar.title}
                    </h3>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mt-0.5">
                      {pillar.sub}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onOpenQuote({ category: pillar.title })}
                  className="shrink-0 text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-blue-600 px-3.5 py-1.5 rounded-lg bg-slate-50 border border-brand-border hover:bg-slate-100 hover:border-blue-300 transition-colors"
                >
                  Get a Quote
                </button>
              </div>

              {/* Description */}
              <p className="text-brand-textSecondary text-sm sm:text-base mt-5 leading-relaxed font-medium">
                {pillar.desc}
              </p>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {pillar.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-xs sm:text-sm text-slate-700 font-semibold">{bullet}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
