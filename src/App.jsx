import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import WhatWeDo from './components/WhatWeDo';
import WhyUltraD from './components/WhyUltraD';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ProductsSection from './components/ProductsSection';
import GiftingSection from './components/GiftingSection';
import BrandsSection from './components/BrandsSection';
import SolutionsSection from './components/SolutionsSection';
import SupplyChainSection from './components/SupplyChainSection';
import ContactSection from './components/ContactSection';
import AboutSection from './components/AboutSection';
import QuoteModal from './components/QuoteModal';
import ExitIntentPopup from './components/ExitIntentPopup';
import FloatingControls from './components/FloatingControls';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [prefilledData, setPrefilledData] = useState(null);

  const handleOpenQuote = (data = null) => {
    setPrefilledData(data);
    setIsQuoteOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteOpen(false);
    setPrefilledData(null);
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-between selection:bg-brand-accent selection:text-white relative">
      
      {/* Sticky Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenQuote={() => handleOpenQuote({ category: 'Gifting', quantity: '100', message: 'Inquiring about bulk corporate sitemaps.' })} 
      />

      {/* Main Orchestrator */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            {/* Above the Fold Hero */}
            <Hero onOpenQuote={() => handleOpenQuote()} setActiveTab={setActiveTab} />
            
            {/* Auto Scrolling Brand logos */}
            <TrustBar />
            
            {/* 4 Capability Pillars */}
            <WhatWeDo setActiveTab={setActiveTab} onOpenQuote={handleOpenQuote} />
            
            {/* Differentiators & Metrics */}
            <WhyUltraD onOpenQuote={handleOpenQuote} />
            
            {/* Interactive Hamper Configurator */}
            <GiftingSection onOpenQuote={handleOpenQuote} />
            
            {/* Client Reviews */}
            <Testimonials />
            
            {/* Bottom Form Sourcing Lead Capture */}
            <ContactSection />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="animate-fadeIn pt-16">
            <AboutSection onOpenQuote={handleOpenQuote} />
          </div>
        )}

        {activeTab === 'products' && (
          <div className="animate-fadeIn pt-16">
            <ProductsSection onOpenQuote={handleOpenQuote} />
          </div>
        )}

        {activeTab === 'brands' && (
          <div className="animate-fadeIn pt-16">
            <BrandsSection onOpenQuote={handleOpenQuote} />
          </div>
        )}

        {activeTab === 'solutions' && (
          <div className="animate-fadeIn pt-16">
            <SolutionsSection onOpenQuote={handleOpenQuote} />
          </div>
        )}

        {activeTab === 'gifting' && (
          <div className="animate-fadeIn pt-16">
            <GiftingSection onOpenQuote={handleOpenQuote} />
          </div>
        )}

        {activeTab === 'operations' && (
          <div className="animate-fadeIn pt-16">
            <SupplyChainSection onOpenQuote={handleOpenQuote} />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="animate-fadeIn pt-16">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Footer Navigation Map */}
      <Footer setActiveTab={setActiveTab} onOpenQuote={handleOpenQuote} />

      {/* Global Interactive Quote Request Modal */}
      <QuoteModal 
        isOpen={isQuoteOpen} 
        onClose={handleCloseQuote} 
        prefilledData={prefilledData} 
      />

      {/* Exit Intent brochure downloader */}
      <ExitIntentPopup />

      {/* WhatsApp chat & Mobile controls */}
      <FloatingControls 
        onOpenQuote={() => handleOpenQuote()} 
      />

    </div>
  );
}
