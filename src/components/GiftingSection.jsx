import { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

export default function GiftingSection({ onOpenQuote }) {
  const [configStep, setConfigStep] = useState(1);
  const [giftingConfig, setGiftingConfig] = useState({
    itemType: 'Premium Combo Kit',
    branding: 'Laser Logo Engraving',
    packaging: 'Eco Matte Black Box',
    volume: '250'
  });

  const categories = [
    { name: 'Premium Combo Kit', desc: 'Notebook + pen + thermos + cardholder bundle' },
    { name: 'Eco-Friendly Set', desc: 'Bamboo cups + organic hoodies + seed paper pens' },
    { name: 'Corporate Apparel', desc: 'High quality hoodies, polo shirts & crewnecks' },
    { name: 'Modern Tech Hampers', desc: 'Wireless chargers + noise canceling earbuds + power banks' }
  ];

  const brandings = [
    { name: 'Laser Logo Engraving', desc: 'Sharp, premium permanent metallic engraving' },
    { name: 'Debossed Leather Emboss', desc: 'Classic deep luxury pressing for journals' },
    { name: 'Multi-Color Screen Print', desc: 'Vibrant direct ink printing for apparel/bags' },
    { name: 'Metalic Badge Foil', desc: 'Glossy gold/silver hot stamping' }
  ];

  const packages = [
    { name: 'Eco Matte Black Box', desc: 'Vented cardboard box with eco paper filler shred' },
    { name: 'Premium Luxury Wooden Box', desc: 'Sleek dark oak wood casing with magnetic latch' },
    { name: 'Custom Branded Ribbed Bag', desc: 'Heavy canvas tote or textured paper cord bag' }
  ];

  const handleConfigChange = (field, value) => {
    setGiftingConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (configStep < 3) {
      setConfigStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (configStep > 1) {
      setConfigStep(prev => prev - 1);
    }
  };

  const triggerConfigQuote = () => {
    onOpenQuote({
      category: 'Gifting',
      quantity: giftingConfig.volume,
      customization: `${giftingConfig.branding} on ${giftingConfig.itemType}`,
      message: `Configurator Proposal: Sourcing "${giftingConfig.itemType}" with "${giftingConfig.branding}" customization, packaged in "${giftingConfig.packaging}". Estimated quantity: ${giftingConfig.volume} units.`
    });
  };

  return (
    <section className="py-20 md:py-24 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold tracking-wider text-blue-700 uppercase">
            Corporate Gifting
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Custom Gifting & <span className="text-gradient-blue">Joining Kits</span> at Scale
          </h2>
          <p className="text-brand-textSecondary text-base sm:text-lg font-medium">
            High margin B2B premium gift hampers, customized tech bundles, and employee joiner kits. Build custom boxes that reflect your brand.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Gifting Showcase */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-blue-600">
              {/* Soft brand decorations */}
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full border-[20px] border-blue-500/40" />
              <div className="absolute -bottom-10 -left-8 w-40 h-40 rounded-full bg-blue-500/40 blur-2xl" />

              <div className="relative px-6 pt-8 pb-6 flex flex-col items-center text-center">
                <span className="text-[11px] font-black uppercase tracking-widest text-blue-100">
                  Curated Corporate Hampers
                </span>
                <img
                  src="hero-products.png"
                  alt="Range of brandable corporate gifting products — appliances, drinkware, grooming, camera and more"
                  className="w-full max-w-xs h-auto object-contain mt-4 drop-shadow-[0_18px_24px_rgba(8,19,64,0.35)]"
                />
                <p className="text-sm font-semibold text-blue-50 mt-4 leading-relaxed max-w-xs">
                  Premium products, your logo, packed and delivered to every desk.
                </p>
              </div>
            </div>

            <div className="bg-white border border-brand-border rounded-2xl p-5 space-y-3 shadow-sm">
              <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Custom Packaging Solutions
              </h4>
              <p className="text-xs text-brand-textSecondary leading-relaxed font-semibold">
                We handle premium box sleeve printing, custom tissue wraps, metallic sticker badges, individual desktop delivery cards, and pan-India multi-office rollout schedules.
              </p>
              <button 
                onClick={triggerConfigQuote}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-600 hover:text-blue-800 mt-2 transition-colors group"
              >
                Request Custom Hamper Consultation 
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column - 3 Step Configurator */}
          <div className="lg:col-span-7 bg-white border border-brand-border rounded-3xl p-6 sm:p-8 relative shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Configure Corporate Hamper
              </h3>
              <span className="text-xs font-bold text-slate-600 bg-slate-50 border border-brand-border px-2.5 py-1 rounded-lg">
                Step {configStep} of 3
              </span>
            </div>

            {/* Configurator Steps Progress bar */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3].map((step) => (
                <div 
                  key={step}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    configStep >= step ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>

            {/* Step content — fixed height so the card stays the same size across all steps */}
            <div className="min-h-[340px]">
            {/* STEP 1: Choose Product Portfolio */}
            {configStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">1. Select Hamper Portfolio Category</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => handleConfigChange('itemType', cat.name)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        giftingConfig.itemType === cat.name
                          ? 'border-blue-700 bg-blue-50/50 text-blue-800 shadow-sm'
                          : 'border-brand-border bg-slate-50/50 text-slate-600 hover:text-slate-900 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-extrabold text-sm block mb-1 text-slate-900">{cat.name}</span>
                      <span className="text-xs text-slate-500 block font-semibold leading-tight">{cat.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Choose Custom Branding Style */}
            {configStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">2. Select Custom Logo Application Style</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {brandings.map((brand) => (
                    <button
                      key={brand.name}
                      onClick={() => handleConfigChange('branding', brand.name)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        giftingConfig.branding === brand.name
                          ? 'border-blue-700 bg-blue-50/50 text-blue-800 shadow-sm'
                          : 'border-brand-border bg-slate-50/50 text-slate-600 hover:text-slate-900 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-extrabold text-sm block mb-1 text-slate-900">{brand.name}</span>
                      <span className="text-xs text-slate-500 block font-semibold leading-tight">{brand.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Choose Custom Premium Packaging */}
            {configStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">3. Choose Luxury Packing Case</p>
                  <div className="grid grid-cols-1 gap-3">
                    {packages.map((pack) => (
                      <button
                        key={pack.name}
                        onClick={() => handleConfigChange('packaging', pack.name)}
                        className={`text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                          giftingConfig.packaging === pack.name
                            ? 'border-blue-700 bg-blue-50/50 text-blue-800'
                            : 'border-brand-border bg-slate-50/50 text-slate-600 hover:text-slate-900 hover:border-blue-300 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <span className="font-extrabold text-sm block mb-1 text-slate-900">{pack.name}</span>
                          <span className="text-xs text-slate-500 block font-semibold leading-tight">{pack.desc}</span>
                        </div>
                        {giftingConfig.packaging === pack.name && <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sourcing Volume slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Est. Sourcing Volume (Qty)</label>
                    <span className="text-sm font-extrabold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-lg">
                      {giftingConfig.volume} Kits
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="1000" 
                    step="50"
                    value={giftingConfig.volume} 
                    onChange={(e) => handleConfigChange('volume', e.target.value)}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 border border-brand-border"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-wider">
                    <span>MOQ: 50 Kits</span>
                    <span>1,000+ Kits</span>
                  </div>
                </div>
              </div>
            )}
            </div>

            {/* Configurator Footer Controls */}
            <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-100">
              {configStep > 1 ? (
                <button
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 bg-slate-50 border border-brand-border rounded-xl hover:bg-slate-100 transition-colors"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {configStep < 3 ? (
                <button
                  onClick={handleNextStep}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors flex items-center gap-1"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={triggerConfigQuote}
                  className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md hover:scale-[1.01]"
                >
                  Get a Quote for This Hamper
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
