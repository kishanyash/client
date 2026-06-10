import { useState } from 'react';
import { X, CheckCircle, Mail, Phone, Building, Layers, AlertTriangle } from 'lucide-react';
import { saveLead } from '../utils/leadsStorage';

export default function QuoteModal({ isOpen, onClose, prefilledData }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: 'Gifting',
    quantity: '100',
    customization: 'None',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  // Merge prefilled values into the form whenever a new prefill object
  // is passed in (state adjustment during render, per React guidance)
  const [lastPrefill, setLastPrefill] = useState(null);
  if (prefilledData !== lastPrefill) {
    setLastPrefill(prefilledData);
    if (prefilledData) {
      setFormData(prev => ({ ...prev, ...prefilledData }));
    }
  }

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    // Sync lead to the Google Sheet via SheetDB
    const result = await saveLead(formData);

    setIsSubmitting(false);

    if (!result) {
      setIsError(true);
      return;
    }

    setReferenceId(result.id);
    setIsSuccess(true);

    // Auto close after 4 seconds
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        category: 'Gifting',
        quantity: '100',
        customization: 'None',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-white border border-brand-border rounded-2xl shadow-2xl overflow-hidden z-10 animate-slideUp">
        
        {/* Decorative Top Glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-blue-600" />
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg bg-slate-50 hover:bg-slate-100 border border-brand-border transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="p-12 text-center flex flex-col items-center justify-center min-h-[450px]">
            <CheckCircle className="w-20 h-20 text-emerald-600 animate-bounce mb-6" />
            <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Request Submitted!</h3>
            <p className="text-slate-600 font-semibold max-w-md mx-auto mb-6 leading-relaxed">
              Thank you, <span className="text-slate-900 font-extrabold">{formData.name}</span>. We've received your request. Our team will call or email you with pricing within one business day.
            </p>
            <div className="text-xs text-blue-700 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 font-bold shadow-sm">
              Reference ID: {referenceId}
            </div>
          </div>
        ) : (
          <div className="p-8 max-h-[90vh] overflow-y-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Request a Quote
              </h2>
              <p className="text-sm text-slate-500 font-semibold mt-1">
                Tell us what you need — products, quantities, and timelines — and we'll respond with our best pricing.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Contact Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Your Name *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <CheckCircle className="w-4 h-4 text-slate-400" />
                    </span>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rohan Sharma"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-brand-border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors shadow-sm text-sm font-semibold"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Company Name *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <Building className="w-4 h-4 text-slate-400" />
                    </span>
                    <input 
                      type="text" 
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Acme Industries Pvt Ltd"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-brand-border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors shadow-sm text-sm font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Work Email *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <Mail className="w-4 h-4 text-slate-400" />
                    </span>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rohan@acme.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-brand-border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors shadow-sm text-sm font-semibold"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mobile / WhatsApp *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                      <Phone className="w-4 h-4 text-slate-400" />
                    </span>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-brand-border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors shadow-sm text-sm font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Sourcing Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                      <Layers className="w-4 h-4 text-slate-400" />
                    </span>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-brand-border rounded-xl text-slate-800 appearance-none focus:outline-none focus:border-blue-500 focus:bg-white transition-colors shadow-sm text-sm font-semibold"
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Grooming">Grooming</option>
                      <option value="Appliances">Appliances</option>
                      <option value="Gifting">Corporate Gifting</option>
                      <option value="Utility">Utilities (Bottles/Bags)</option>
                      <option value="Distribution">Distribution Deal</option>
                    </select>
                  </div>
                </div>

                {/* Sourcing Quantity */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Est. MOQ / Qty</label>
                  <input 
                    type="text" 
                    name="quantity"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g. 250"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-brand-border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors shadow-sm text-sm font-semibold"
                  />
                </div>

                {/* Custom Branding Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Custom Branding</label>
                  <select
                    name="customization"
                    value={formData.customization}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-brand-border rounded-xl text-slate-800 appearance-none focus:outline-none focus:border-blue-500 focus:bg-white transition-colors shadow-sm text-sm font-semibold"
                  >
                    <option value="None">No Branding Required</option>
                    <option value="Logo Embossing">Logo Embossing</option>
                    <option value="Laser Engraving">Laser Engraving</option>
                    <option value="Screen Print">Screen Printing</option>
                    <option value="Eco Packaging">Custom Luxury Packaging</option>
                    <option value="Other">Custom Combo Assembly</option>
                  </select>
                </div>
              </div>

              {/* Requirement message */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Procurement Details / Specifications</label>
                <textarea 
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details like preferred brands (e.g. Fujifilm, Philips), deadline, delivery locations, custom box expectations, etc..."
                  className="w-full px-4 py-3 bg-slate-50 border border-brand-border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors resize-none shadow-sm text-sm font-semibold leading-relaxed"
                />
              </div>

              {isError && (
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold leading-relaxed">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Something went wrong while submitting your request. Please try again, or reach us directly at <a href="tel:+919820216355" className="underline font-bold">+91 98202 16355</a> / <a href="mailto:cs@ultramultiventures.co.in" className="underline font-bold">cs@ultramultiventures.co.in</a>.
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold tracking-wide transition-all shadow-lg shadow-blue-500/10 text-white flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Request...
                  </>
                ) : (
                  'Submit Quote Request'
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
