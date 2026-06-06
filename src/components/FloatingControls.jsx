import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function FloatingControls({ onOpenQuote }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = "https://wa.me/919820216355?text=Hi%20Ultra%20D%20Multiventures,%2520I%2520am%2520interested%2520in%2520corporate%2520sourcing%2520and%2520custom%2520gifting%2520solutions.";

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          className="p-3 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-850 rounded-full border border-slate-200 shadow-xl transition-all hover:scale-105 active:scale-95 animate-fadeIn"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* WhatsApp Chat Floating Trigger */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3.5 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 flex items-center justify-center group"
      >
        <svg 
          className="w-6 h-6 fill-white text-white group-hover:scale-105 transition-transform" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
        </svg>
        <span className="absolute right-14 bg-slate-900 border border-slate-800 text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mr-2">
          Chat on WhatsApp
        </span>
      </a>

    </div>
  );
}
