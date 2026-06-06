import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Quote, Star, Check } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      quote: "Ultra D streamlined our entire employee onboarding joining-kit procurement nationwide and reduced our overall procurement costs by 20%. Their single-point accountability from packaging to direct desktop delivery was absolutely faultless.",
      author: "Priyanka Nair",
      role: "HR Director",
      company: "Innovate Digital India",
      rating: 5,
      achievement: "Consolidated 8 vendors into 1"
    },
    {
      quote: "As an exclusive national distribution partner, Ultra D has scaled our B2B reach across multi-brand LFR networks. Their warehouse logistics nodes and Amazon Wholesale integration made high-volume supply flawless.",
      author: "Vikram Malhotra",
      role: "VP Sourcing & Partnerships",
      company: "AeroTech Solutions",
      rating: 5,
      achievement: "Delivered 15,000+ units on time"
    },
    {
      quote: "Their customized B2B corporate gifting selection is unparalleled. From branding Fuji Film camera gift sets to custom eco-friendly water bottles, they provided absolute quality, transparent tracking, and premium matte packaging.",
      author: "Ananya Goel",
      role: "Marketing Manager",
      company: "Nexus Finance Corp",
      rating: 5,
      achievement: "99.2% on-time corporate rollout"
    }
  ];

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 md:py-24 bg-brand-bg relative overflow-hidden">
      {/* Decorative Radial Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold tracking-wider text-blue-700 uppercase">
            💬 Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Trusted by Elite Brands
          </h2>
          <p className="text-brand-textSecondary text-sm sm:text-base font-medium">
            See how corporate procurement officers, brand managers, and HR heads streamline bulk logistics with Ultra D.
          </p>
        </div>

        {/* Carousel Box */}
        <div className="relative bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl">
          
          {/* Quote Icon */}
          <div className="absolute -top-6 left-8 sm:left-12 w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/10">
            <Quote className="w-5 h-5 text-white" />
          </div>

          <div className="min-h-[220px] flex flex-col justify-between">
            <div className="space-y-6">
              {/* Star Rating */}
              <div className="flex gap-1">
                {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-lg sm:text-xl font-semibold text-slate-800 italic leading-relaxed">
                "{reviews[activeIndex].quote}"
              </blockquote>
            </div>

            {/* Author Details & Indicators */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <cite className="not-italic font-black text-slate-900 text-base sm:text-lg block">
                  {reviews[activeIndex].author}
                </cite>
                <span className="text-xs sm:text-sm text-slate-500 font-semibold">
                  {reviews[activeIndex].role} &mdash; <span className="text-blue-600 font-bold">{reviews[activeIndex].company}</span>
                </span>
              </div>

              {/* Sourcing Achievement Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700">
                <Check className="w-4 h-4 text-blue-600" />
                {reviews[activeIndex].achievement}
              </div>
            </div>

          </div>

          {/* Slider Buttons */}
          <div className="absolute bottom-10 right-8 sm:right-12 flex gap-2">
            <button 
              onClick={handlePrev}
              className="p-2 text-slate-655 hover:text-slate-900 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNext}
              className="p-2 text-slate-655 hover:text-slate-900 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all hover:scale-105 active:scale-95"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Dots Navigator */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'w-8 bg-blue-600' : 'w-2 bg-slate-250'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
