import { useState } from 'react';
import { ShoppingCart, Building, BarChart2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function SolutionsSection({ onOpenQuote }) {
  const [activeSegment, setActiveSegment] = useState('corporates');

  const segments = {
    corporates: {
      icon: <Building className="w-5 h-5 text-blue-600" />,
      title: 'For Corporate Partners',
      sub: 'Single-source vendor consolidation & customized kits',
      desc: 'We serve HR heads and procurement managers by streamlining corporate merchandise and customized hampers under a single point of accountability.',
      usecases: [
        { title: 'New-Hire Onboarding Kits', details: 'Complete tech & lifestyle packs assembled, box printed, and shipped to employee desks.' },
        { title: 'Festive & Celebration Hampers', desc: 'Custom selected gourmet treats, smart electronics, and branded utilities neatly packed.' },
        { title: 'Dealer & Channel Rewards', desc: 'Authorized electronics from Fuji and Philips delivered to distribution channels nationwide.' }
      ],
      quotePrefill: 'Sourcing onboarding kits / corporate rewards'
    },
    brands: {
      icon: <BarChart2 className="w-5 h-5 text-blue-600" />,
      title: 'For Brands & Manufacturers',
      sub: 'Scale B2B distribution and large-scale retail channel presence',
      desc: 'We partner with domestic and global manufacturers (like Fujifilm and Philips LFR) to expand their sales nodes and corporate supply footprints inside India.',
      usecases: [
        { title: 'LFR (Large Format Retail) Supply', details: 'Authorized supply agreements feeding high-street retail stores and modern trade grids.' },
        { title: 'B2B Sourcing Expansion', desc: 'Accessing bulk corporate gifting requests and exclusive supply channels without managing small MOQ sales.' },
        { title: 'National Authorized Warehousing', desc: 'Core storage nodes and compliance-backed distribution in Mumbai, Delhi, and Bangalore.' }
      ],
      quotePrefill: 'Authorized brand distribution / LFR'
    },
    ecommerce: {
      icon: <ShoppingCart className="w-5 h-5 text-blue-600" />,
      title: 'For E-commerce & Q-Comm',
      sub: 'Amazon Wholesale ready supply chains & high turnaround hubs',
      desc: 'We support massive digital marketplaces and quick-commerce operators by holding inventory buffers and ensuring compliance-checked shipping.',
      usecases: [
        { title: 'Amazon Wholesale Node', details: 'Strict barcode compliance, custom sorting packaging, and direct-to-warehouse delivery schedules.' },
        { title: 'Quick Commerce Supply Hubs', desc: 'Buffering electronic and grooming inventory for instant dispatch channels in metro cities.' },
        { title: 'Vendor Consolidation Pipelines', desc: 'Solving multiple small vendor delays by acting as a single, fully compliant supplier node.' }
      ],
      quotePrefill: 'Amazon wholesale / Q-Comm supply'
    }
  };

  return (
    <section className="py-20 md:py-24 bg-slate-50 border-t border-brand-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold tracking-wider text-blue-700 uppercase">
            Target Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Segmented <span className="text-gradient-blue">B2B Sourcing</span> Portfolios
          </h2>
          <p className="text-brand-textSecondary text-base sm:text-lg font-medium">
            Whether you are an HR manager ordering employee joining kits, a global brand looking for B2B channels, or a quick-commerce network, we have built custom pipelines for you.
          </p>
        </div>

        {/* Navigation Selector Tabs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12 max-w-4xl mx-auto animate-fadeIn">
          {Object.keys(segments).map((key) => (
            <button
              key={key}
              onClick={() => setActiveSegment(key)}
              className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-2xl border font-bold text-sm sm:text-base transition-all duration-300 ${
                activeSegment === key
                  ? 'border-blue-700 bg-blue-50/50 text-blue-800 shadow-md'
                  : 'border-brand-border bg-white text-slate-600 hover:text-slate-900 hover:border-blue-300'
              }`}
            >
              {segments[key].icon}
              {segments[key].title.split('For ')[1]}
            </button>
          ))}
        </div>

        {/* Display Active Segment Card */}
        <div className="bg-white border border-brand-border rounded-3xl p-6 sm:p-10 transition-all duration-500 animate-fadeIn shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Content column */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                {segments[activeSegment].sub}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {segments[activeSegment].title}
              </h3>
              <p className="text-brand-textSecondary text-sm sm:text-base leading-relaxed font-semibold">
                {segments[activeSegment].desc}
              </p>
              
              <div className="pt-4">
                <button
                  onClick={() => onOpenQuote({ category: segments[activeSegment].title, message: `Requesting a discussion on solutions: ${segments[activeSegment].sub}` })}
                  className="py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.01] flex items-center gap-2"
                >
                  Discuss This Solution <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Use Case column */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Key Sourcing Use Cases</h4>
              
              <div className="space-y-4">
                {segments[activeSegment].usecases.map((usecase, uIdx) => (
                  <div 
                    key={uIdx}
                    className="p-5 bg-slate-50 border border-brand-border rounded-2xl flex gap-4 items-start hover:border-blue-300 transition-colors shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h5 className="font-extrabold text-slate-900 text-sm sm:text-base">{usecase.title}</h5>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed font-semibold">
                        {usecase.details || usecase.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
