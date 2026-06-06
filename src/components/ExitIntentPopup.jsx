import React, { useState, useEffect } from 'react';
import { X, FileDown, CheckCircle, Mail, Phone, BookOpen } from 'lucide-react';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [formData, setFormData] = useState({ email: '', phone: '' });
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check local storage so we don't annoy users who already closed it
    const dismissed = localStorage.getItem('ud_exit_dismissed');
    if (dismissed) return;

    const handleMouseLeave = (e) => {
      if (e.clientY < 20 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasTriggered]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('ud_exit_dismissed', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);

    // Trigger PDF catalog download
    const link = document.createElement('a');
    link.href = '/Ultra D Multiventures_Your Sourcing Partner (1).pdf';
    link.download = 'Ultra D Multiventures - Corporate Sourcing Catalogue.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Close after delay
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('ud_exit_dismissed', 'true');
    }, 4000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleDismiss}
      />
      
      {/* Pop Container */}
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 animate-slideUp">
        
        {/* Border glow stripes */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500" />
        
        <button 
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-655 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
            <CheckCircle className="w-14 h-14 text-emerald-600 mb-4 animate-bounce" />
            <h4 className="text-xl font-extrabold text-slate-900 mb-2">Downloading Catalogue!</h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed font-semibold">
              We have initiated the download of our authorized sourcing catalog. Check your browser download queue! Our corporate brochure has also been mailed to <span className="text-slate-900 font-extrabold">{formData.email}</span>.
            </p>
          </div>
        ) : (
          <div className="p-6 sm:p-8 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">Before you go...</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed font-semibold">
                Download our comprehensive B2B Sourcing Portfolio Catalog including catalog pricing tiers, MOQs, and corporate customizations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Work Email *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input 
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="e.g. rohan@google.com"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white text-xs font-semibold shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1.5">Mobile / WhatsApp *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input 
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-250 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white text-xs font-semibold shadow-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 font-bold tracking-wide text-xs text-white transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10"
              >
                Download PDF Catalogue <FileDown className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
