import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Star, Award, Zap } from 'lucide-react';

export default function Hero({ onOpenQuote, setActiveTab }) {
  const stats = [
    { value: '5,000+', label: 'Premium SKUs', desc: 'Across 45+ categories' },
    { value: '80+', label: 'Global Brands', desc: 'Fujifilm, Philips, AWIPL' },
    { value: '20%', label: 'Cost Reduction', desc: 'Average client savings' },
    { value: '100%', label: 'Pan-India Reach', desc: 'Sourcing to last-mile' }
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden grid-bg">
      {/* Decorative Radial Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 animate-fadeIn">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold tracking-wide text-blue-700">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              India's Premier B2B Sourcing Partner
            </div>
            
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-none text-slate-900">
              Your Trusted Partner in <span className="text-gradient-blue">Corporate Supply</span> & Gifting
            </h1>
            
            <p className="text-base sm:text-lg text-brand-textSecondary max-w-2xl mx-auto lg:mx-0 font-medium">
              End-to-end custom sourcing, vendor consolidation, and high-performance fulfillment for leading national and international brands. We define, verify, and deliver requirements on time.
            </p>

            {/* Key Differentiators Quick-List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0 pt-2">
              {[
                'Exclusive Fuji Films & Philips LFR distribution',
                'Custom corporate branding & eco packaging',
                '24/7 Dedicated account manager coverage',
                'Volume-based best-price network deals'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-left">
                  <CheckCircle2 className="w-5 h-5 text-blue-650 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-800 font-semibold">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-sm font-bold text-white shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Request a Quote <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setActiveTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-white hover:bg-slate-50 text-sm font-bold text-slate-850 border border-slate-200 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Explore Products
              </button>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-5 relative w-full max-w-lg mx-auto lg:max-w-none animate-slideUp">
            
            {/* Visual Frame Container */}
            <div className="relative rounded-2xl border border-slate-200 bg-white p-2 overflow-hidden shadow-xl group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-650/5 via-transparent to-cyan-500/5 pointer-events-none rounded-2xl" />
              <img 
                src="hero_desk_setup.png" 
                alt="Ultra D corporate desk setup showing premium branded corporate gifts and electronics" 
                className="w-full h-auto rounded-xl object-cover hover:scale-[1.01] transition-transform duration-500"
              />
              
              {/* Floating Badges */}
              <div className="absolute top-6 right-6 glassmorphism px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-lg animate-bounce duration-[3000ms]">
                <Award className="w-4 h-4 text-blue-600" />
                <span className="text-[10px] sm:text-xs font-black text-slate-900 uppercase tracking-wider">Authorized Partner</span>
              </div>

              <div className="absolute bottom-6 left-6 glassmorphism px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <span className="block text-xs font-black text-slate-900 uppercase tracking-wide">Pan-India Delivery</span>
                  <span className="block text-[10px] text-slate-500 font-semibold">Sourcing to last-mile</span>
                </div>
              </div>
            </div>

            {/* Glowing Ring Backdrop */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/10 via-transparent to-cyan-500/10 rounded-3xl blur-2xl -z-10 pointer-events-none" />
          </div>

        </div>

        {/* Stats Grid Dashboard */}
        <div className="mt-16 lg:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-200 hover:border-slate-350 hover:shadow-md rounded-2xl p-5 sm:p-6 transition-all duration-300 group hover:-translate-y-1 text-center sm:text-left"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-black text-slate-800 mt-1.5 uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
