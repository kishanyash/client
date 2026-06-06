import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, Sparkles } from 'lucide-react';
import { saveLead } from '../utils/leadsStorage';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    qty: '100',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Save lead to local DB & Sheets API
    await saveLead({
      ...formData,
      category: 'Procurement Sourcing'
    });
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          qty: '100',
          details: ''
        });
      }, 5000);
    }, 1200);
  };

  return (
    <section className="py-20 md:py-24 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column - Contact details & Map Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg relative flex flex-col justify-between">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold tracking-wider text-blue-700 uppercase">
                📞 Contact Us
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-none">
                Start Your <span className="text-gradient-blue">Sourcing Partnership</span> Today
              </h2>
              
              <p className="text-brand-textSecondary text-sm sm:text-base leading-relaxed font-semibold">
                Have a bulk corporate gifting requirement? Need exclusive brand pricing? Tell us your targets, and our account team will formulate a proposal within two business days.
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Email Inquiry</span>
                    <a href="mailto:cs@ultramultiventures.co.in" className="text-sm sm:text-base font-black text-slate-800 hover:text-blue-650 transition-colors">
                      cs@ultramultiventures.co.in
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Phone / WhatsApp</span>
                    <a href="tel:+919820216355" className="text-sm sm:text-base font-black text-slate-800 hover:text-blue-650 transition-colors">
                      +91 98202 16355
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Mumbai Corporate HQ</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 block mt-0.5 leading-relaxed">
                      Ultra D Sourcing Hub, Borivali East, Mumbai, India.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Google Map Frame */}
            <div className="relative rounded-2xl border border-slate-200 bg-slate-100 overflow-hidden h-48 w-full mt-6 shadow-sm shrink-0">
              <iframe
                title="Ultra D Mumbai Corporate HQ Map"
                src="https://maps.google.com/maps?q=1st%20floor,%20Blue%20rose%20industrial%20estate,%20121,%20next%20to%20metro%20mall,%20Borivali%20East,%20Mumbai,%20Maharashtra%20400066&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

          {/* Right Column - B2B lead capture Form */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg relative">
            
            {isSuccess ? (
              <div className="p-10 text-center flex flex-col items-center justify-center min-h-[420px]">
                <CheckCircle className="w-16 h-16 text-emerald-600 animate-bounce mb-6" />
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Proposal Initiated!</h3>
                <p className="text-slate-600 font-semibold max-w-sm mx-auto mb-6 text-sm leading-relaxed">
                  Thank you, <span className="text-slate-900 font-extrabold">{formData.name}</span>. Your bulk RFQ inquiry has been registered. Our Mumbai operations node will compile a customized proposal within 2 business days.
                </p>
                <div className="text-xs text-blue-700 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 font-bold shadow-sm">
                  Refer ID: CN-{Math.floor(Math.random() * 90000) + 10000}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                    Submit Bulk RFP Proposal <Sparkles className="w-4 h-4 text-blue-600" />
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">
                    Direct-to-warehouse negotiations. Guaranteed best pricing. Vetted SLAs.
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
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm font-semibold shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Company Name *</label>
                    <input 
                      type="text" 
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Google India"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm font-semibold shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Work Email *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rohan@google.com"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm font-semibold shadow-sm"
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
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm font-semibold shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Est. Sourcing Qty *</label>
                  <select
                    name="qty"
                    value={formData.qty}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm font-semibold shadow-sm"
                  >
                    <option value="50">50 - 100 units (Small corporate event)</option>
                    <option value="250">100 - 500 units (Employee joining kits)</option>
                    <option value="750">500 - 2,000 units (Festive corporate gifting)</option>
                    <option value="5000">2,000+ units (National dealer rewards / retail supply)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Sourcing requirements specifications *</label>
                  <textarea 
                    name="details"
                    required
                    rows="4"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="e.g. Sourcing 250 Fujifilm Instax Mini 12 Cameras packaged in a luxury matte black eco-box, branded with embossed logo. Need delivery to offices in Mumbai and Bangalore by November 15th."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors resize-none text-sm leading-relaxed shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 font-bold tracking-wide transition-all text-white flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? 'Verifying RFP metrics...' : 'Submit RFQ Proposal'}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
