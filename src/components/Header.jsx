import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import UltraDLogo from './UltraDLogo';

export default function Header({ activeTab, setActiveTab, onOpenQuote }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products' },
    { id: 'brands', label: 'Brands' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'gifting', label: 'Gifting' },
    { id: 'operations', label: 'Supply Chain' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
    
    // Smooth scroll to top of page when tab changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-md py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex items-center cursor-pointer hover:opacity-90 transition-opacity"
        >
          <UltraDLogo height={32} />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                activeTab === item.id 
                  ? 'text-blue-600 bg-blue-50 border border-blue-100 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Header CTA & Burger */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenQuote}
            className="hidden sm:flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-sm font-bold text-white transition-all shadow-md shadow-blue-500/10 hover:shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            Get a Quote <ArrowRight className="w-4 h-4" />
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-900 rounded-lg bg-slate-100 border border-slate-200 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[76px] bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-2xl py-6 px-4 animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 text-base font-semibold rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'text-blue-600 bg-blue-50 border border-blue-100' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-base font-bold text-white transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              Get a Quote <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
