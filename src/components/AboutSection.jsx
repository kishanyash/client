import { CheckCircle2, ShieldCheck, Award, Eye, Rocket } from 'lucide-react';

export default function AboutSection() {
  const values = [
    {
      icon: <Rocket className="w-5 h-5 text-blue-600" />,
      title: 'Reliability & Speed',
      desc: 'We guarantee strict adherence to timelines and quality specifications, solving the vendor delays that often plague B2B supply chains.'
    },
    {
      icon: <Award className="w-5 h-5 text-blue-600" />,
      title: 'Authorized Sourcing',
      desc: 'No trading duplicates. We source directly from official channels for global majors including Fujifilm, Philips LFR, and AWIPL.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
      title: 'Corporate Compliance',
      desc: 'Complete transparency. We maintain rigid compliance across tax structures, logistics licensing, and factory labor audits.'
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-brand-bg relative overflow-hidden">
      
      {/* Decorative Radial glow background */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold tracking-wider text-blue-700 uppercase">
            About Us
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-none">
            Simplifying Procurement <span className="text-gradient-blue">at Scale</span>
          </h2>
          <p className="text-brand-textSecondary text-base sm:text-lg font-medium">
            Ultra D Multiventures Private Limited is a trusted sourcing hub and authorized national distributor servicing top-tier B2B corporate brands.
          </p>
        </div>

        {/* Company Overview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Your Single-Point Sourcing Authority
            </h3>
            
            <p className="text-brand-textSecondary text-sm sm:text-base leading-relaxed font-medium">
              Founded as a consolidated partner in bulk corporate supply, Ultra D addresses the complexities HR heads, marketing teams, and procurement leads face daily. Instead of negotiating with dozens of local distributors, our clients utilize a single account manager and official channels.
            </p>

            <p className="text-brand-textSecondary text-sm sm:text-base leading-relaxed font-medium">
              By partnering directly as authorized national distributors for companies like <span className="text-slate-900 font-extrabold">Fujifilm, Philips (via LFR), and AWIPL</span>, we bypass intermediary traders, unlocking direct manufacturer pricing margins and secure warranty integrations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Mumbai-centered packing facilities',
                'Amazon Wholesale certified provider',
                'Tax & logistics audit compliant',
                'Vetted networks of 80+ manufacturers'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-800 font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Stats Column */}
          <div className="lg:col-span-5 bg-white border border-brand-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-3">Operational Milestones</h4>
            
            <div className="space-y-4">
              {[
                { label: 'Pan-India Active Warehouses', value: '4 Hubs' },
                { label: 'Bulk Units Shipped', value: '500k+ Units' },
                { label: 'Active Corporate Clients', value: '120+ Brands' },
                { label: 'Procurement Sourcing SLA', value: '48 Hour Proposal' }
              ].map((stat, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-50 border border-brand-border/80 p-4 rounded-xl">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                  <span className="text-sm font-extrabold text-blue-700">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission & Vision Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Mission Card */}
          <div className="bg-white border border-brand-border rounded-3xl p-8 space-y-4 hover:border-blue-300 hover:shadow-md transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">Our Mission</h3>
            <p className="text-brand-textSecondary text-xs sm:text-sm leading-relaxed font-semibold">
              "To simplify and secure corporate B2B procurement networks with absolute reliability, transparent operations, direct brand relationships, and pan-India logistics efficiency."
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white border border-brand-border rounded-3xl p-8 space-y-4 hover:border-blue-300 hover:shadow-md transition-all shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">Our Vision</h3>
            <p className="text-brand-textSecondary text-xs sm:text-sm leading-relaxed font-semibold">
              "To become India's most trusted, SLA-driven B2B sourcing partner, acting as the primary distribution channel bridging international brand manufacturers and national corporate grids."
            </p>
          </div>

        </div>

        {/* Core Values grid */}
        <div className="bg-slate-100/60 border border-brand-border rounded-3xl p-6 sm:p-10">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest text-center mb-8">Our Sourcing Pillars</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, idx) => (
              <div key={idx} className="space-y-3 p-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-brand-border flex items-center justify-center">
                  {v.icon}
                </div>
                <h5 className="font-extrabold text-slate-900 text-base">{v.title}</h5>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
