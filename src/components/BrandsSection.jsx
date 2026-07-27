import { useState, useEffect } from 'react';
import { CheckCircle2, MapPin, Zap, Building2, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchBrandsFromSupabase } from '../utils/supabaseBrands';

const BRANDS_PER_PAGE = 3;

export default function BrandsSection({ onOpenQuote }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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
          desc: b.desc || `${b.name} authorized distribution channel for corporate sourcing & bulk orders.`,
          categories: b.categories_handled || 'Corporate Supply & Gifting',
          benefits: ['Direct OEM Invoicing', '100% Genuine Manufacturer Guarantee', 'Bulk RFQ Support']
        }));
        setBrands(formatted);
      }
      setLoading(false);
    });
  }, []);

  const totalPages = Math.ceil(brands.length / BRANDS_PER_PAGE);
  const startIdx = (currentPage - 1) * BRANDS_PER_PAGE;
  const paginatedBrands = brands.slice(startIdx, startIdx + BRANDS_PER_PAGE);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-24 bg-brand-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold tracking-wider text-blue-700 uppercase">
            Authorized Brands
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Exclusive Brand <span className="text-gradient-blue">Distribution</span> & Trust
          </h2>
          <p className="text-brand-textSecondary text-base sm:text-lg font-medium">
            Ultra D is a vetted authorized partner for top-tier national and international product brands, providing complete compliance and authentic warranty coverage.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16 text-slate-400">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mb-4" />
            <p className="text-sm font-semibold">Loading brand partners from Supabase...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && brands.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700">No Brand Partners Added Yet</h3>
            <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
              Brand distribution partners will appear here once added by the admin through the Admin Portal.
            </p>
            <button
              onClick={() => onOpenQuote({ category: 'Brand Distribution', message: 'Interested in brand distribution partnership.' })}
              className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md cursor-pointer"
            >
              Inquire About Distribution
            </button>
          </div>
        )}

        {/* Brands Cards list (paginated) */}
        {!loading && brands.length > 0 && (
          <>
            <div className="space-y-8">
              {paginatedBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="bg-white border border-brand-border hover:border-blue-300 rounded-3xl p-6 sm:p-10 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-md"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-600" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-4 space-y-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-lg inline-block">
                        {brand.badge}
                      </span>

                      <div className="h-14 flex items-center">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="h-12 max-w-[200px] object-contain text-slate-800"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) {
                              e.target.nextSibling.style.display = 'flex';
                            }
                          }}
                        />
                        <div className="hidden items-center gap-2 text-xl font-black text-slate-800 uppercase">
                          <Building2 className="w-6 h-6 text-blue-600" />
                          <span>{brand.name}</span>
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                        {brand.name}
                      </h3>

                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>Coverage: {brand.reach}</span>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => onOpenQuote({ message: `Inquiring about corporate distribution supply partnership with: ${brand.name}` })}
                          className="py-2.5 px-5 rounded-xl bg-slate-50 border border-brand-border hover:bg-slate-100 hover:border-blue-300 text-xs font-bold text-slate-800 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                        >
                          Inquire Distribution Deal <Zap className="w-3.5 h-3.5 text-blue-600" />
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-8 space-y-6">
                      <div>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Operational Overview</h4>
                        <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-semibold">
                          {brand.desc}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Primary Categories Handled</h5>
                          <span className="text-sm font-extrabold text-slate-900 block">
                            {brand.categories}
                          </span>
                        </div>

                        <div>
                          <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Credibility Protections</h5>
                          <ul className="space-y-1.5">
                            {brand.benefits.map((benefit, bIdx) => (
                              <li key={bIdx} className="flex items-center gap-2 text-xs text-slate-600 font-bold">
                                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
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
                  Page {currentPage} of {totalPages} • {brands.length} brand{brands.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
