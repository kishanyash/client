import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
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
import LiquidationSection from './components/LiquidationSection';
import QuoteModal from './components/QuoteModal';
import ExitIntentPopup from './components/ExitIntentPopup';
import FloatingControls from './components/FloatingControls';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  // Detect initial route from URL
  const getInitialTab = () => {
    const path = window.location.pathname.replace(/^\//, '').toLowerCase();
    if (path === 'admin') return 'admin';
    return 'home';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [prefilledData, setPrefilledData] = useState(null);
  const [adminSession, setAdminSession] = useState(null);

  // Initialize and listen to Supabase Auth state changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setAdminSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAdminSession(session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  // Sync URL with activeTab changes
  useEffect(() => {
    const path = activeTab === 'home' ? '/' : `/${activeTab}`;
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  }, [activeTab]);

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      if (path === 'admin') setActiveTab('admin');
      else if (['about', 'supply', 'distribution', 'liquidation', 'contact'].includes(path)) setActiveTab(path);
      else setActiveTab('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenQuote = (data = null) => {
    setPrefilledData(data);
    setIsQuoteOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteOpen(false);
    setPrefilledData(null);
  };

  const handleAdminLogout = async () => {
    await supabase.auth.signOut();
    setAdminSession(null);
  };

  // Render Admin Portal View if activeTab is 'admin'
  if (activeTab === 'admin') {
    if (adminSession) {
      return (
        <AdminDashboard 
          session={adminSession} 
          onLogout={handleAdminLogout} 
          onBackToSite={() => setActiveTab('home')} 
        />
      );
    }
    return (
      <AdminLogin 
        onLoginSuccess={(sess) => setAdminSession(sess)} 
        onBackToSite={() => setActiveTab('home')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col justify-between selection:bg-brand-accent selection:text-white relative">
      
      {/* Sticky Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenQuote={() => handleOpenQuote({ category: 'Gifting', quantity: '100', message: 'Inquiring about bulk corporate gifting.' })}
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
          <div className="animate-fadeIn pt-24">
            <AboutSection onOpenQuote={handleOpenQuote} />
          </div>
        )}

        {activeTab === 'supply' && (
          <div className="animate-fadeIn pt-20">
            <ProductsSection onOpenQuote={handleOpenQuote} />
            <SolutionsSection onOpenQuote={handleOpenQuote} />
            <GiftingSection onOpenQuote={handleOpenQuote} />
          </div>
        )}

        {activeTab === 'distribution' && (
          <div className="animate-fadeIn pt-24">
            <BrandsSection onOpenQuote={handleOpenQuote} />
            <SupplyChainSection onOpenQuote={handleOpenQuote} />
          </div>
        )}

        {activeTab === 'liquidation' && (
          <div className="animate-fadeIn pt-24">
            <LiquidationSection />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="animate-fadeIn pt-24">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Footer Navigation Map */}
      <Footer setActiveTab={setActiveTab} />

      {/* Global Interactive Quote Request Modal */}
      <QuoteModal 
        isOpen={isQuoteOpen} 
        onClose={handleCloseQuote} 
        prefilledData={prefilledData} 
      />

      {/* Exit Intent brochure downloader */}
      <ExitIntentPopup />

      {/* WhatsApp chat & Mobile controls */}
      <FloatingControls />

    </div>
  );
}
