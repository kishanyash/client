import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import UltraDLogo from './UltraDLogo';

export default function Footer({ setActiveTab, onOpenQuote }) {
  const currentYear = new Date().getFullYear();

  const handleNav = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center cursor-pointer hover:opacity-90 transition-opacity" onClick={() => handleNav('home')}>
              <UltraDLogo height={30} />
            </div>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Ultra D Multiventures Private Limited is India's trusted B2B partner in corporate supply, promotional merchandising, and premium gifting solutions for leading national and international brands.
            </p>

            {/* Direct Contact Buttons */}
            <div className="space-y-2 pt-2">
              <a 
                href="mailto:cs@ultramultiventures.co.in" 
                className="flex items-center gap-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                cs@ultramultiventures.co.in
              </a>
              <a 
                href="tel:+919820216355" 
                className="flex items-center gap-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                +91 98202 16355
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm font-semibold">
              {['home', 'about', 'brands', 'solutions', 'gifting'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => handleNav(item)} 
                    className="text-slate-400 hover:text-white transition-colors capitalize text-left"
                  >
                    {item === 'operations' ? 'Supply Chain' : item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sourcing Categories Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Sourcing Portfolios</h4>
            <ul className="space-y-2 text-xs sm:text-sm font-semibold">
              <li>
                <button onClick={() => handleNav('products')} className="text-slate-400 hover:text-white transition-colors text-left">
                  Consumer Electronics & Gadgets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('products')} className="text-slate-400 hover:text-white transition-colors text-left">
                  Philips Home Appliances LFR
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('products')} className="text-slate-400 hover:text-white transition-colors text-left">
                  Grooming & Personal Care
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gifting')} className="text-slate-400 hover:text-white transition-colors text-left">
                  Custom Joining Kits & hampers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('products')} className="text-slate-400 hover:text-white transition-colors text-left">
                  Utilities & Eco Drinkware
                </button>
              </li>
            </ul>
          </div>

          {/* Corporate Offices Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Logistics Network</h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block text-xs uppercase tracking-wide">Mumbai HQ</span>
                  Corporate hub, warehousing, custom gifting packaging line.
                </div>
              </div>
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block text-xs uppercase tracking-wide">Delhi-NCR & Bangalore</span>
                  Quick fulfillment warehousing, tech distribution.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
          <div>
            &copy; {currentYear} Ultra D Multiventures Private Limited. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-white transition-colors font-semibold">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors font-semibold">Terms of Sourcing</a>
            <a href="#compliance" className="hover:text-white transition-colors font-semibold">Corporate Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
