import React from 'react';
import { Target, CheckCircle2, TrendingUp, Truck, Users } from 'lucide-react';

export default function WhyUltraD({ onOpenQuote }) {
  const differentiators = [
    {
      icon: <Target className="w-5 h-5 text-blue-600" />,
      title: 'Exclusive Brand Partnerships',
      desc: 'We are authorized national distributors for global majors including Fujifilm, Philips LFR, and AWIPL. No middlemen, pure authenticity, and full product warranty support.'
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
      title: 'Best Sourcing Prices',
      desc: 'Our consolidated procurement network spans hundreds of vetted factories. We negotiate maximum bulk price breaks and pass the direct cost reductions down to you.'
    },
    {
      icon: <Truck className="w-5 h-5 text-amber-600" />,
      title: 'Nationwide Pan-India Delivery',
      desc: 'With core hubs in Mumbai, Delhi-NCR, Bangalore, and Rajasthan, our logistics channels reach Tier 1, 2, and 3 zones seamlessly. Zero logistics friction, direct-to-desktop distribution.'
    },
    {
      icon: <Users className="w-5 h-5 text-blue-600" />,
      title: 'End-to-End Account Ownership',
      desc: 'Each corporate client is assigned a dedicated Account Executive. We oversee requirements definition, custom mockups, warehouse packing quality, and final delivery checklists.'
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-slate-100/60 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Stats column */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold tracking-wider text-blue-700 uppercase">
              🛡️ Differentiators
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-none">
              Built for <span className="text-gradient-blue">Procurement</span> That Never Pauses
            </h2>
            
            <p className="text-brand-textSecondary text-base sm:text-lg font-medium">
              Corporates trust Ultra D because we combine high-volume distribution strength with customized, single-point accountability.
            </p>

            {/* Quick Metrics Bar */}
            <div className="pt-4 space-y-4">
              {[
                { label: 'Sourcing Transparency', val: 98 },
                { label: 'On-Time Logistics Delivery', val: 99.4 },
                { label: 'Client Retention Rate', val: 96.2 }
              ].map((metric, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-black text-slate-800 uppercase tracking-wider">
                    <span>{metric.label}</span>
                    <span className="text-blue-600">{metric.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full"
                      style={{ width: `${metric.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button
                onClick={() => onOpenQuote({ message: 'Requesting a corporate collaboration package details.' })}
                className="py-3 px-6 rounded-xl bg-white hover:bg-slate-50 text-sm font-bold text-slate-800 border border-slate-200 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Why Ultra D Multiventures
              </button>
            </div>
          </div>

          {/* Right Differentiators Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {differentiators.map((diff, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200 hover:border-slate-355 hover:shadow-md p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {diff.icon}
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 mb-2 group-hover:text-blue-650 transition-colors">
                  {diff.title}
                </h3>
                <p className="text-brand-textSecondary text-xs sm:text-sm leading-relaxed font-medium">
                  {diff.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
