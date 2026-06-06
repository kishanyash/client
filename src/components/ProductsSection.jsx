import React, { useState } from 'react';
import { Search, Filter, Layers, BadgeCheck, ShoppingBag, ArrowUpRight } from 'lucide-react';

export default function ProductsSection({ onOpenQuote }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');

  const categories = ['All', 'Electronics', 'Grooming', 'Appliances', 'Gifting', 'Utilities'];
  const brands = ['All', 'Fujifilm', 'Philips', 'AWIPL', 'Custom Branding'];

  const catalog = [
    {
      id: 1,
      name: 'Fujifilm Instax Mini 12 Camera',
      category: 'Electronics',
      brand: 'Fujifilm',
      moq: '50 units',
      branding: 'Eco Gift Box Sleeve',
      rating: 4.8,
      desc: 'Popular instant photo camera, perfect for team rewards and creative corporate campaigns.'
    },
    {
      id: 2,
      name: 'Philips Multi-Grooming Trimmer Set',
      category: 'Grooming',
      brand: 'Philips',
      moq: '100 units',
      branding: 'Laser Engraved Handle / Box',
      rating: 4.9,
      desc: 'Premium rechargeable multi-groomer. High demand B2B utility item for festive rewards.'
    },
    {
      id: 3,
      name: 'Ultra D Executive Eco Joining Kit',
      category: 'Gifting',
      brand: 'Custom Branding',
      moq: '25 kits',
      branding: 'Logo Debossed Box & Goods',
      rating: 5.0,
      desc: 'Includes matte steel thermos, leather notebook, metallic pen, and cotton canvas bag.'
    },
    {
      id: 4,
      name: 'Matte Black Vacuum Thermos Bottle',
      category: 'Utilities',
      brand: 'Custom Branding',
      moq: '100 units',
      branding: 'Laser Logo Engraving',
      rating: 4.7,
      desc: 'Double-walled insulated water bottle. Kept hot/cold for 24 hours. Excellent promo gift.'
    },
    {
      id: 5,
      name: 'Philips Induction Cooker (HD4928)',
      category: 'Appliances',
      brand: 'Philips',
      moq: '50 units',
      branding: 'Box logo printing',
      rating: 4.8,
      desc: 'High efficiency induction glass cooktop. Standard home appliance gift option for dealers.'
    },
    {
      id: 6,
      name: 'Smart 3-in-1 Wireless Charging Pad',
      category: 'Electronics',
      brand: 'AWIPL',
      moq: '150 units',
      branding: 'Matte Face Printing',
      rating: 4.6,
      desc: 'Charges iPhone, AirPods, and Apple Watch simultaneously. Premium tech merchandise.'
    },
    {
      id: 7,
      name: 'Double Bed Sheet Premium Cotton Set',
      category: 'Utilities',
      brand: 'AWIPL',
      moq: '200 units',
      branding: 'Custom Ribbon Bow Tie & Tag',
      rating: 4.8,
      desc: 'Direct mill premium cotton bedding, standard gift item for distributor campaigns.'
    },
    {
      id: 8,
      name: 'Active Noise Canceling Earbuds',
      category: 'Electronics',
      brand: 'Custom Branding',
      moq: '100 units',
      branding: 'Case Face Laser Print',
      rating: 4.7,
      desc: 'TWS earbuds with full digital display. Sleek team gifting option with deep bass.'
    }
  ];

  const filteredCatalog = catalog.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

    const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;

    return matchesSearch && matchesCategory && matchesBrand;
  });

  const handleRequestQuote = (product) => {
    onOpenQuote({
      category: product.category,
      quantity: product.moq.split(' ')[0],
      customization: product.branding,
      message: `Requesting a B2B volume pricing proposal for: "${product.name}" (${product.brand}).`
    });
  };

  return (
    <section className="py-20 md:py-24 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold tracking-wider text-blue-700 uppercase">
            🛍️ Products Catalog
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Explore Our Sourcing <span className="text-gradient-blue">Portfolio</span>
          </h2>
          <p className="text-brand-textSecondary text-base sm:text-lg font-medium">
            High-volume corporate supplies, authorized electronic brands, and lifestyle accessories. Select a product to initiate a customized bulk RFQ proposal.
          </p>
        </div>

        {/* Filter Controls Panel */}
        <div className="bg-slate-100/60 border border-slate-200 p-6 rounded-3xl mb-10 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Search Input */}
            <div className="lg:col-span-6 relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search across 5,000+ premium corporate products..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors shadow-sm text-sm font-semibold"
              />
            </div>

            {/* Brand Select */}
            <div className="lg:col-span-6 relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Filter className="w-5 h-5" />
              </span>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full pl-11 pr-8 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 appearance-none focus:outline-none focus:border-blue-500 transition-colors font-bold shadow-sm text-sm"
              >
                <option value="All">All Partner Brands</option>
                {brands.filter(b => b !== 'All').map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-655 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200'
                  }`}
              >
                {category === 'All' ? 'All Categories' : category}
              </button>
            ))}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs sm:text-sm text-brand-textSecondary font-semibold">
          <div>
            Showing <span className="text-slate-900 font-extrabold">{filteredCatalog.length}</span> premium offerings
          </div>
          <div className="flex items-center gap-1">
            <Layers className="w-4 h-4 text-blue-600" />
            Standard B2B Sourcing Tier
          </div>
        </div>

        {/* Products Grid */}
        {filteredCatalog.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCatalog.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-all duration-300 group shadow-sm"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-blue-700">
                      {product.category}
                    </span>
                    <span className="text-[9px] font-bold text-slate-500 flex items-center gap-0.5">
                      <ShoppingBag className="w-3 h-3" />
                      MOQ: {product.moq}
                    </span>
                  </div>

                  {/* Product Title */}
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mb-2 group-hover:text-blue-650 transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  {/* Brand Tag */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <BadgeCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="text-xs font-bold text-slate-800">{product.brand}</span>
                  </div>

                  {/* Desc */}
                  <p className="text-brand-textSecondary text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed font-semibold">
                    {product.desc}
                  </p>
                </div>

                {/* Footer specs & Button */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex flex-col gap-1 text-[11px] font-medium text-slate-500">
                    <span>Branding: <span className="text-slate-800 font-extrabold">{product.branding}</span></span>
                    <span>Support: <span className="text-slate-800 font-extrabold">Warranty + Mockup</span></span>
                  </div>

                  <button
                    onClick={() => handleRequestQuote(product)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-blue-600 hover:text-white text-xs font-bold text-slate-800 border border-slate-200 hover:border-transparent transition-all flex items-center justify-center gap-1 group/btn"
                  >
                    Request Quote
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl">
            <p className="text-brand-textSecondary mb-2 font-semibold">No custom sourcing items match your filter criteria.</p>
            <p className="text-xs text-slate-550">Try modifying search tags or selecting "All Categories".</p>
          </div>
        )}

      </div>
    </section>
  );
}
