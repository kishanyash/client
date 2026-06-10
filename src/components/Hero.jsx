import { ArrowRight, ShieldCheck, ShoppingBag, BadgePercent, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: ShoppingBag, label: 'Wide Range of Products' },
  { icon: ShieldCheck, label: 'Trusted Quality' },
  { icon: BadgePercent, label: 'Best Deals' },
  { icon: Truck, label: 'On-Time Delivery' }
];

// Entrance choreography for backdrop and badges
const showcaseVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 230, damping: 22 } }
};

export default function Hero({ onOpenQuote, setActiveTab }) {
  const stats = [
    { value: '5,000+', label: 'Premium SKUs', desc: 'Across 45+ categories' },
    { value: '80+', label: 'Global Brands', desc: 'Fujifilm, Philips, AWIPL' },
    { value: '3', label: 'Logistics Hubs', desc: 'Mumbai, Delhi-NCR, Bangalore' },
    { value: '2 Days', label: 'Proposal Turnaround', desc: 'On every bulk inquiry' }
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden grid-bg">
      {/* Decorative Radial Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 animate-fadeIn">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-none text-slate-900">
              Your Trusted Partner in <span className="text-gradient-blue">Corporate Supply</span> & Promo Solutions
            </h1>

            <p className="text-base sm:text-lg text-brand-textSecondary max-w-2xl mx-auto lg:mx-0 font-medium">
              From electronics and appliances to personal care, clinical products, bed sheets to water bottles — we source it all, so you can focus on what matters most.
            </p>

            {/* Trust Feature Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto lg:mx-0 pt-2">
              {features.map((feature, idx) => (
                <div key={idx} className="flex flex-col items-center lg:items-start gap-2 text-center lg:text-left">
                  <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 leading-tight">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* Brand Tagline */}
            <p className="text-sm font-extrabold tracking-widest uppercase text-blue-700 border-l-4 border-blue-600 pl-3 inline-block">
              You Need It, We Have It
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-bold text-white shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Request a Quote <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setActiveTab('supply');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-white hover:bg-slate-50 text-sm font-bold text-slate-800 border border-brand-border shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Explore Products
              </button>
            </div>
          </div>

          {/* Right Visual Column - Banner-style Product Showcase */}
          <motion.div
            className="lg:col-span-5 relative w-full max-w-lg mx-auto lg:max-w-none"
            variants={showcaseVariants}
            initial="hidden"
            animate="show"
          >
            <div className="relative h-[440px] sm:h-[500px] flex items-center justify-center">

              {/* Royal blue brand circle (like the banner) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div variants={itemVariants} className="relative w-[82%] max-w-[420px] aspect-square rounded-full bg-blue-600 shadow-2xl shadow-blue-600/25">
                  <div className="absolute inset-5 rounded-full border border-white/15" />
                  <div className="absolute -top-3 right-10 w-2.5 h-2.5 rounded-full bg-blue-300" />
                  <div className="absolute bottom-10 -left-1 w-2 h-2 rounded-full bg-blue-200" />
                </motion.div>
              </div>

              {/* Soft ground shadow under the products */}
              <div className="absolute bottom-12 inset-x-12 h-10 rounded-[100%] bg-slate-900/15 blur-2xl" />

              {/* Single transparent product image — fades up on load */}
              <motion.img
                src="/hero-products.png"
                alt="Corporate supply product range — coffee machine, backpack, water bottle, trimmer, camera and towels"
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 220, damping: 24 }}
                className="relative z-20 translate-x-0.5 w-[92%] max-w-[460px] h-auto object-contain drop-shadow-[0_22px_30px_rgba(8,19,64,0.30)]"
                onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
              />

            </div>
          </motion.div>

        </div>

        {/* Stats Grid Dashboard */}
        <div className="mt-16 lg:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-brand-border hover:border-blue-300 hover:shadow-md rounded-2xl p-5 sm:p-6 transition-all duration-300 group hover:-translate-y-1 text-center sm:text-left"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-black text-slate-800 mt-1.5 uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
