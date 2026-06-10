import { useState } from 'react';
import { CheckCircle, AlertTriangle, BadgeIndianRupee, Truck, ShieldCheck, Recycle, PackageSearch } from 'lucide-react';
import { saveLiquidationLead } from '../utils/leadsStorage';

export default function LiquidationSection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    category: 'Consumer Electronics',
    qty: '100',
    customization: 'Brand New (Sealed)',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    const result = await saveLiquidationLead(formData);
    setIsSubmitting(false);

    if (!result) {
      setIsError(true);
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        category: 'Consumer Electronics',
        qty: '100',
        customization: 'Brand New (Sealed)',
        details: ''
      });
    }, 6000);
  };

  const benefits = [
    {
      icon: <BadgeIndianRupee className="w-6 h-6 text-emerald-600" />,
      title: 'Best Market Valuation',
      desc: 'Transparent stock assessment with competitive bulk buyout offers — no hidden deductions.'
    },
    {
      icon: <Truck className="w-6 h-6 text-blue-600" />,
      title: 'Doorstep Stock Pickup',
      desc: 'We arrange complete logistics from your warehouse or store. Pan-India pickup network.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: 'Quick & Secure Payment',
      desc: 'Fast deal closure with documented agreements and timely payment settlement.'
    },
    {
      icon: <Recycle className="w-6 h-6 text-amber-600" />,
      title: 'Any Stock Condition',
      desc: 'Excess inventory, dead stock, box-opened, customer returns, or discontinued lines — we evaluate it all.'
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-bold tracking-wider text-emerald-700 uppercase">
            <PackageSearch className="w-3.5 h-3.5" /> Liquidation Expert
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Turn Excess Stock Into <span className="text-gradient-blue">Instant Capital</span>
          </h2>
          <p className="text-brand-textSecondary text-base sm:text-lg font-medium">
            Sitting on surplus inventory, dead stock, or discontinued product lines? Ultra D Multiventures buys bulk stock directly from brands, distributors, and retailers — with fair valuation, fast pickup, and quick settlement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* Left Column - Benefits */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {benefits.map((item, idx) => (
                <div key={idx} className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-brand-border flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-brand-textSecondary mt-1.5 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* How it works strip */}
            <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">How It Works</h3>
              <ol className="space-y-3 text-sm font-semibold">
                <li className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black shrink-0">1</span>
                  Share your stock details using the form — category, quantity, and condition.
                </li>
                <li className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black shrink-0">2</span>
                  Our liquidation desk evaluates and shares a buyout offer within 2 business days.
                </li>
                <li className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black shrink-0">3</span>
                  Deal closure, doorstep pickup, and prompt payment settlement.
                </li>
              </ol>
            </div>
          </div>

          {/* Right Column - Seller lead capture form */}
          <div className="bg-white border border-brand-border rounded-3xl p-6 sm:p-10 shadow-lg relative">

            {isSuccess ? (
              <div className="p-10 text-center flex flex-col items-center justify-center min-h-[420px]">
                <CheckCircle className="w-16 h-16 text-emerald-600 animate-bounce mb-6" />
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Stock Details Received!</h3>
                <p className="text-slate-600 font-semibold max-w-sm mx-auto text-sm leading-relaxed">
                  Thank you, <span className="text-slate-900 font-extrabold">{formData.name}</span>. Our liquidation desk will review your inventory details and contact you with a valuation offer within 2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Sell Your Stock To Us
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">
                    Fill in your inventory details and get a no-obligation buyout offer.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Contact Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rohan Sharma"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-brand-border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm font-semibold shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Company / Firm Name *</label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Sharma Distributors"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-brand-border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm font-semibold shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rohan@company.com"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-brand-border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm font-semibold shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-brand-border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm font-semibold shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Stock Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-brand-border rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm font-semibold shadow-sm"
                    >
                      <option value="Consumer Electronics">Consumer Electronics & Gadgets</option>
                      <option value="Home Appliances">Home Appliances</option>
                      <option value="Lifestyle & Personal Care">Lifestyle & Personal Care</option>
                      <option value="FMCG / General Merchandise">FMCG / General Merchandise</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Stock Condition *</label>
                    <select
                      name="customization"
                      value={formData.customization}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-brand-border rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm font-semibold shadow-sm"
                    >
                      <option value="Brand New (Sealed)">Brand New (Sealed)</option>
                      <option value="Box Opened / Unused">Box Opened / Unused</option>
                      <option value="Customer Returns">Customer Returns</option>
                      <option value="Refurbished">Refurbished</option>
                      <option value="Mixed Lot">Mixed Lot</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Approx. Stock Quantity *</label>
                  <select
                    name="qty"
                    value={formData.qty}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-brand-border rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm font-semibold shadow-sm"
                  >
                    <option value="100">Under 100 units</option>
                    <option value="500">100 - 500 units</option>
                    <option value="2000">500 - 2,000 units</option>
                    <option value="5000">2,000 - 10,000 units</option>
                    <option value="10000">10,000+ units</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Stock Details & Expected Price *</label>
                  <textarea
                    name="details"
                    required
                    rows="4"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="e.g. 800 units of Philips trimmers (sealed, 2024 stock) lying in our Mumbai warehouse. MRP ₹1,899 each. Expecting 40-50% of MRP for full lot pickup."
                    className="w-full px-4 py-3 bg-slate-50 border border-brand-border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors resize-none text-sm leading-relaxed shadow-sm"
                  />
                </div>

                {isError && (
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold leading-relaxed">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      Something went wrong while submitting. Please try again, or reach us directly on WhatsApp at <a href="https://wa.me/919820216355" target="_blank" rel="noopener noreferrer" className="underline font-bold">+91 98202 16355</a>.
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold tracking-wide transition-all text-white flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting Stock Details...' : 'Get My Buyout Offer'}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
