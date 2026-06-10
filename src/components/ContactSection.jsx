import { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';
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
  const [isError, setIsError] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    // Sync lead to the Google Sheet via SheetDB
    const result = await saveLead({
      ...formData,
      category: 'Procurement Sourcing'
    });

    setIsSubmitting(false);

    if (!result) {
      setIsError(true);
      return;
    }

    setReferenceId(result.id);
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
    }, 6000);
  };

  return (
    <section className="py-20 md:py-24 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column - Contact details & Map Card */}
          <div className="bg-white border border-brand-border rounded-3xl p-6 sm:p-10 shadow-lg relative flex flex-col justify-between">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold tracking-wider text-blue-700 uppercase">
                Contact Us
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-none">
                Start Your <span className="text-gradient-blue">Sourcing Partnership</span> Today
              </h2>
              
              <p className="text-brand-textSecondary text-sm sm:text-base leading-relaxed font-semibold">
                Have a bulk gifting requirement? Need brand-authorized pricing? Tell us what you need, and our team will get back to you with a detailed proposal within two business days.
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-brand-border flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Email Inquiry</span>
                    <a href="mailto:cs@ultramultiventures.co.in" className="text-sm sm:text-base font-black text-slate-800 hover:text-blue-700 transition-colors">
                      cs@ultramultiventures.co.in
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-brand-border flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Phone / WhatsApp</span>
                    <a href="tel:+919820216355" className="text-sm sm:text-base font-black text-slate-800 hover:text-blue-700 transition-colors">
                      +91 98202 16355
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-brand-border flex items-center justify-center shrink-0">
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
            <div className="relative rounded-2xl border border-brand-border bg-slate-100 overflow-hidden h-48 w-full mt-6 shadow-sm shrink-0">
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
          <div className="bg-white border border-brand-border rounded-3xl p-6 sm:p-10 shadow-lg relative">
            
            {isSuccess ? (
              <div className="p-10 text-center flex flex-col items-center justify-center min-h-[420px]">
                <CheckCircle className="w-16 h-16 text-emerald-600 animate-bounce mb-6" />
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Proposal Initiated!</h3>
                <p className="text-slate-600 font-semibold max-w-sm mx-auto mb-6 text-sm leading-relaxed">
                  Thank you, <span className="text-slate-900 font-extrabold">{formData.name}</span>. We've received your requirement. Our Mumbai team will send you a customized proposal within two business days.
                </p>
                <div className="text-xs text-blue-700 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 font-bold shadow-sm">
                  Refer ID: {referenceId}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    Tell Us Your Requirement
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1 leading-relaxed">
                    Share a few details and we'll respond with pricing and timelines.
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
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Company Name *</label>
                    <input 
                      type="text" 
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Acme Industries Pvt Ltd"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-brand-border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm font-semibold shadow-sm"
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
                      placeholder="e.g. rohan@acme.com"
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

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Est. Sourcing Qty *</label>
                  <select
                    name="qty"
                    value={formData.qty}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-brand-border rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors text-sm font-semibold shadow-sm"
                  >
                    <option value="50">50 - 100 units (Small corporate event)</option>
                    <option value="250">100 - 500 units (Employee joining kits)</option>
                    <option value="750">500 - 2,000 units (Festive corporate gifting)</option>
                    <option value="5000">2,000+ units (National dealer rewards / retail supply)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Your Requirement *</label>
                  <textarea 
                    name="details"
                    required
                    rows="4"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="e.g. Sourcing 250 Fujifilm Instax Mini 12 Cameras packaged in a luxury matte black eco-box, branded with embossed logo. Need delivery to offices in Mumbai and Bangalore by November 15th."
                    className="w-full px-4 py-3 bg-slate-50 border border-brand-border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors resize-none text-sm leading-relaxed shadow-sm"
                  />
                </div>

                {isError && (
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold leading-relaxed">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      Something went wrong while submitting your inquiry. Please try again, or reach us directly at <a href="tel:+919820216355" className="underline font-bold">+91 98202 16355</a> / <a href="mailto:cs@ultramultiventures.co.in" className="underline font-bold">cs@ultramultiventures.co.in</a>.
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold tracking-wide transition-all text-white flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending Inquiry...' : 'Send Inquiry'}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
