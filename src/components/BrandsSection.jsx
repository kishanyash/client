import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, MapPin, Zap, Building2, ChevronLeft, ChevronRight, Search, Tag, X, ArrowUpRight, ShieldCheck, Layers } from 'lucide-react';
import { fetchBrandsFromSupabase } from '../utils/supabaseBrands';

const BRANDS_PER_PAGE = 4;

export default function BrandsSection({ onOpenQuote }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrandModal, setSelectedBrandModal] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchBrandsFromSupabase().then(data => {
      if (data && data.length > 0) {
        const formatted = data.map(b => ({
          id: b.id,
          name: b.name,
          logo: b.logo_url,
          badge: b.badge || 'Authorized Partner',
          reach: b.reach || 'Pan-India Distribution',
          desc: b.description || b.desc || `${b.name} authorized distribution channel for corporate sourcing & bulk orders.`,
          categories: b.categories_handled || 'Corporate Supply & Gifting',
          benefits: ['Direct OEM Invoicing', '100% Genuine Manufacturer Guarantee', 'Bulk RFQ Support']
        }));
        setBrands(formatted);
      }
      setLoading(false);
    });
  }, []);

  // Keyboard Escape listener & scroll locking
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedBrandModal(null);
    };

    if (selectedBrandModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedBrandModal]);

  // Categories list
  const allCategories = ['All', ...new Set(brands.map(b => b.categories).filter(Boolean))];

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          brand.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          brand.categories.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || brand.categories.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredBrands.length / BRANDS_PER_PAGE);
  const startIdx = (currentPage - 1) * BRANDS_PER_PAGE;
  const paginatedBrands = filteredBrands.slice(startIdx, startIdx + BRANDS_PER_PAGE);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-24 bg-brand-bg relative min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold tracking-wider text-blue-700 uppercase">
            Authorized Brands
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Exclusive Brand <span className="text-gradient-blue">Distribution</span> & Partners
          </h2>
          <p className="text-brand-textSecondary text-base sm:text-lg font-medium">
            Ultra D is an authorized channel partner for top-tier national and international product brands, providing complete OEM compliance and authentic warranty coverage.
          </p>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search brand partners or categories..."
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-600 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-200">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mb-4" />
            <p className="text-sm font-semibold text-slate-600">Loading brand partners...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredBrands.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <Building2 className="w-16 h-16 text-slate-300 mx-auto" />
            <div>
              <h3 className="text-xl font-bold text-slate-700">No Brand Partners Found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Try adjusting your search criteria or contact our business development team to inquire about brand distribution partnerships.
              </p>
            </div>
            <button
              onClick={() => onOpenQuote({ category: 'Brand Distribution', message: 'Interested in brand distribution partnership.' })}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all"
            >
              Inquire About Distribution Partnership
            </button>
          </div>
        )}

        {/* Brand Cards Grid */}
        {!loading && filteredBrands.length > 0 && (
          <>
            <div className="space-y-8">
              {paginatedBrands.map((brand) => (
                <div
                  key={brand.id}
                  onClick={() => setSelectedBrandModal(brand)}
                  className="bg-white border border-brand-border hover:border-blue-300 rounded-3xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-lg cursor-pointer group"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 group-hover:bg-blue-700 transition-colors" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Brand Logo & Coverage */}
                    <div className="lg:col-span-4 space-y-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-lg inline-block">
                        {brand.badge}
                      </span>

                      <div className="h-16 flex items-center bg-slate-50 border border-slate-100 rounded-2xl p-3">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="h-10 max-w-[180px] object-contain text-slate-800"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) {
                              e.target.nextSibling.style.display = 'flex';
                            }
                          }}
                        />
                        <div className="hidden items-center gap-2 text-lg font-black text-slate-800 uppercase">
                          <Building2 className="w-5 h-5 text-blue-600" />
                          <span>{brand.name}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                        {brand.name}
                      </h3>

                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Coverage: {brand.reach}</span>
                      </div>

                      <div className="pt-2 flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBrandModal(brand);
                          }}
                          className="py-2.5 px-4 rounded-xl bg-blue-50 border border-blue-100 hover:bg-blue-100 text-xs font-bold text-blue-700 transition-all flex items-center gap-1 cursor-pointer"
                        >
                          View Brand Info <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenQuote({ message: `Inquiring about corporate distribution supply deal for brand: ${brand.name}` });
                          }}
                          className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/10 cursor-pointer"
                        >
                          Inquire Deal <Zap className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Operational Overview & Details */}
                    <div className="lg:col-span-8 space-y-5">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Operational Overview</h4>
                        <p className="text-sm text-slate-800 leading-relaxed font-semibold">
                          {brand.desc}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                        <div>
                          <h5 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Primary Categories Handled</h5>
                          <span className="text-xs font-extrabold text-slate-900 block">
                            {brand.categories}
                          </span>
                        </div>

                        <div>
                          <h5 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Credibility Protections</h5>
                          <ul className="space-y-1">
                            {brand.benefits.map((benefit, bIdx) => (
                              <li key={bIdx} className="flex items-center gap-2 text-xs text-slate-700 font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-12">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <span className="text-xs text-slate-400 ml-3 font-semibold">
                  Page {currentPage} of {totalPages} • {filteredBrands.length} brand{filteredBrands.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </>
        )}

      </div>

      {/* ========================================================================= */}
      {/* BRAND DISTRIBUTION PROFILE MODAL */}
      {/* ========================================================================= */}
      {selectedBrandModal && createPortal(
        <div 
          onClick={() => setSelectedBrandModal(null)}
          className="fixed inset-0 z-[999999] bg-slate-900/80 backdrop-blur-md overflow-y-auto p-4 sm:p-6 grid place-items-center cursor-pointer animate-fadeIn"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 border border-slate-100 cursor-default text-slate-900 my-auto z-[1000000]"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedBrandModal(null)}
              className="absolute top-5 right-5 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer z-20 shadow-sm"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              {/* Header Logo & Title */}
              <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
                <div className="h-20 w-44 bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-center shrink-0">
                  <img src={selectedBrandModal.logo} alt={selectedBrandModal.name} className="max-h-14 max-w-full object-contain" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md inline-block mb-1">
                    {selectedBrandModal.badge}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900">{selectedBrandModal.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>Coverage: {selectedBrandModal.reach}</span>
                  </div>
                </div>
              </div>

              {/* Operational Overview */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Authorized Channel Profile</h4>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {selectedBrandModal.desc}
                </p>
              </div>

              {/* Categories & Protections */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-4">
                <div>
                  <h5 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Primary Categories Handled</h5>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{selectedBrandModal.categories}</span>
                  </div>
                </div>

                <div>
                  <h5 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">Credibility Protections</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedBrandModal.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Direct Factory / OEM Pricing
                </span>
                
                <button
                  onClick={() => {
                    const brandName = selectedBrandModal.name;
                    setSelectedBrandModal(null);
                    onOpenQuote({ message: `Inquiring for authorized brand distribution deal: "${brandName}". Please send corporate pricing catalog.` });
                  }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/25 hover:shadow-xl transition-all cursor-pointer"
                >
                  Inquire Distribution Deal <Zap className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}

    </section>
  );
}

