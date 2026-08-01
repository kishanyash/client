import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { fetchProductsFromSupabase } from '../utils/supabaseProducts';
import { Search, BadgeCheck, ArrowUpRight, Image as ImageIcon, ChevronLeft, ChevronRight, Package, X, CheckCircle2, Tag, ShieldCheck, Sparkles, Truck, Clock, Layers, FileText } from 'lucide-react';

// Helper to safely parse string/array features and images
const ensureArray = (val) => {
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {}
    if (val.trim()) return val.split(',').map(s => s.trim()).filter(Boolean);
  }
  return [];
};

export default function ProductsSection({ onOpenQuote }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImageIndexes, setActiveImageIndexes] = useState({});
  const [detailProduct, setDetailProduct] = useState(null);
  const [modalActiveImage, setModalActiveImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchProductsFromSupabase().then((data) => {
      if (data && data.length > 0) {
        const dbProducts = data.map(p => ({
          id: p.id,
          name: p.title,
          category: p.category || 'Corporate Supply',
          brand: 'Ultra D Verified',
          moq: p.price || 'RFQ / Bulk Price',
          branding: 'Custom Logo Branding',
          rating: 5.0,
          desc: p.description || '',
          features: ensureArray(p.features),
          images: ensureArray(p.images)
        }));
        setProducts(dbProducts);
      } else {
        setProducts([]);
      }
      setLoading(false);
    });
  }, []);

  // Keyboard Escape listener & document body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setDetailProduct(null);
    };

    if (detailProduct) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [detailProduct]);

  // Dynamic categories
  const allCategories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  const filteredProducts = products.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const nextImage = (productId, totalImages, e) => {
    e.stopPropagation();
    setActiveImageIndexes(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (productId, totalImages, e) => {
    e.stopPropagation();
    setActiveImageIndexes(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const openDetailModal = (product) => {
    setDetailProduct(product);
    setModalActiveImage(0);
  };

  return (
    <section className="pt-2 pb-16 bg-slate-50 relative min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header Bar: Title + Search & Category Filters */}
        <div className="bg-white p-4 md:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-blue-100 flex items-center gap-1 w-fit">
              <Sparkles className="w-3 h-3 text-blue-600" /> B2B Verified Merchandise Catalog
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Corporate Supply Portfolio
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search catalog or features..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat 
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-200">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mb-3" />
            <p className="text-sm font-bold text-slate-600">Loading B2B Merchandise Catalog...</p>
          </div>
        )}

        {/* Empty Search State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <Package className="w-16 h-16 text-slate-300 mx-auto" />
            <div>
              <h3 className="text-lg font-bold text-slate-800">No Matching Merchandise Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Try adjusting your search criteria or request a custom procurement quote from our sourcing team.
              </p>
            </div>
            <button
              onClick={() => onOpenQuote({ category: 'Corporate Supply', message: 'Inquiring for custom corporate merchandise sourcing.' })}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer transition-all"
            >
              Request Custom Sourcing Quote
            </button>
          </div>
        )}

        {/* Product Grid */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((item) => {
              const itemImages = ensureArray(item.images);
              const itemFeatures = ensureArray(item.features);
              const currentImgIndex = activeImageIndexes[item.id] || 0;
              const totalImgs = itemImages.length;

              return (
                <div 
                  key={item.id}
                  onClick={() => openDetailModal(item)}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Multi-Image Carousel Header */}
                    <div className="h-56 bg-slate-100 relative overflow-hidden group/img">
                      {totalImgs > 0 ? (
                        <img 
                          src={itemImages[currentImgIndex]} 
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400">
                          <Package className="w-12 h-12 mb-1 opacity-50" />
                          <span className="text-[11px] font-semibold text-slate-400">Sample Image Preview</span>
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-blue-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase shadow-sm border border-blue-100">
                        {item.category}
                      </span>

                      {/* Quick Detail Click Indicator */}
                      <div className="absolute top-3 right-3 bg-slate-900/70 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3 text-blue-400" /> Click to Expand
                      </div>

                      {totalImgs > 1 && (
                        <>
                          <button
                            onClick={(e) => prevImage(item.id, totalImgs, e)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-opacity opacity-0 group-hover/img:opacity-100 cursor-pointer"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => nextImage(item.id, totalImgs, e)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-opacity opacity-0 group-hover/img:opacity-100 cursor-pointer"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-slate-900/70 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white text-[10px] font-medium">
                            <ImageIcon className="w-3 h-3 text-blue-400" />
                            <span>{currentImgIndex + 1}/{totalImgs}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h3>

                      {item.desc && (
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{item.desc}</p>
                      )}

                      <div className="pt-1 flex items-center gap-2 text-xs">
                        <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-lg border border-blue-100">
                          {item.moq}
                        </span>
                        <span className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Supply
                        </span>
                      </div>

                      {itemFeatures.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {itemFeatures.slice(0, 3).map((feat, idx) => (
                            <span key={idx} className="text-[10px] font-semibold bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                              • {feat}
                            </span>
                          ))}
                          {itemFeatures.length > 3 && (
                            <span className="text-[10px] font-bold text-blue-600 px-1">
                              +{itemFeatures.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom CTAs */}
                  <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openDetailModal(item);
                      }}
                      className="text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 border border-blue-100 hover:bg-blue-100 px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" /> View Specs
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenQuote({ category: item.category, message: `Inquiring about bulk quote for ${item.name} (${item.moq})` });
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-500/10 transition-all cursor-pointer"
                    >
                      Request Quote <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* DETAILED PRODUCT SPECIFICATIONS MODAL (Rendered via React Portal) */}
      {/* ========================================================================= */}
      {detailProduct && createPortal(
        <div 
          onClick={() => setDetailProduct(null)}
          className="fixed inset-0 z-[999999] bg-slate-900/80 backdrop-blur-md overflow-y-auto p-4 sm:p-6 grid place-items-center cursor-pointer animate-fadeIn"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-7 md:p-8 shadow-2xl relative space-y-6 border border-slate-100 cursor-default text-slate-900 my-auto z-[1000000]"
          >
            {/* Close Button */}
            <button
              onClick={() => setDetailProduct(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer z-20 shadow-sm"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start pt-2">
              
              {/* Left Column: Image Gallery Viewer */}
              <div className="lg:col-span-6 space-y-3.5">
                <div className="h-56 sm:h-72 bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200 group">
                  {ensureArray(detailProduct.images).length > 0 ? (
                    <img
                      src={ensureArray(detailProduct.images)[modalActiveImage] || ensureArray(detailProduct.images)[0]}
                      alt={detailProduct.name}
                      className="w-full h-full object-cover transition-all duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                      <Package className="w-14 h-14 mb-2 text-slate-300" />
                      <span className="text-xs font-semibold text-slate-400">Image Preview Unavailable</span>
                    </div>
                  )}

                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-blue-700 text-[10px] sm:text-[11px] font-extrabold px-3 py-1 rounded-full uppercase shadow-sm border border-blue-100">
                    {detailProduct.category}
                  </span>

                  {ensureArray(detailProduct.images).length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-slate-900/75 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                      <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>{modalActiveImage + 1} of {ensureArray(detailProduct.images).length}</span>
                    </div>
                  )}
                </div>

                {/* Thumbnails Strip */}
                {ensureArray(detailProduct.images).length > 1 && (
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                    {ensureArray(detailProduct.images).map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setModalActiveImage(idx)}
                        className={`h-14 w-14 sm:h-16 sm:w-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                          modalActiveImage === idx 
                            ? 'border-blue-600 shadow-md ring-2 ring-blue-600/20 scale-95' 
                            : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="bg-slate-50 border border-slate-200 p-2.5 sm:p-3 rounded-xl flex items-center gap-2">
                    <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0" />
                    <div>
                      <h5 className="text-[10px] sm:text-[11px] font-bold text-slate-900 uppercase">Pan-India Logistics</h5>
                      <p className="text-[9px] sm:text-[10px] text-slate-500 font-semibold">Multi-city desk delivery</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-2.5 sm:p-3 rounded-xl flex items-center gap-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0" />
                    <div>
                      <h5 className="text-[10px] sm:text-[11px] font-bold text-slate-900 uppercase">Fast Turnaround</h5>
                      <p className="text-[9px] sm:text-[10px] text-slate-500 font-semibold">Custom samples in 48h</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Full Specifications & Description */}
              <div className="lg:col-span-6 space-y-4 sm:space-y-5">
                
                <div className="space-y-2 border-b border-slate-100 pb-3.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                      <Tag className="w-3 h-3" /> {detailProduct.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                      <BadgeCheck className="w-3 h-3" /> Verified B2B Stock
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                    {detailProduct.name}
                  </h3>

                  <div className="flex items-center gap-2.5 pt-0.5">
                    <div className="bg-blue-600 text-white text-xs font-extrabold px-3 py-1 rounded-lg shadow-sm">
                      {detailProduct.moq}
                    </div>
                    {detailProduct.branding && (
                      <div className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-200 flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-blue-600" /> {detailProduct.branding}
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Description */}
                <div className="space-y-1">
                  <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-blue-600" /> Product Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {detailProduct.desc || 'High-volume corporate supply merchandise tailored for bulk procurement, employee onboarding kits, client appreciation gifts, and custom brand promotions.'}
                  </p>
                </div>

                {/* Features & Specifications */}
                {ensureArray(detailProduct.features).length > 0 && (
                  <div className="space-y-1.5 pt-0.5">
                    <h4 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest">
                      Specifications & Key Features
                    </h4>
                    <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                      {ensureArray(detailProduct.features).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs font-semibold text-slate-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action CTAs */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-blue-600" /> Free Custom Logo Proof
                  </div>
                  
                  <button
                    onClick={() => {
                      const prodName = detailProduct.name;
                      const prodCat = detailProduct.category;
                      const prodMoq = detailProduct.moq;
                      setDetailProduct(null);
                      onOpenQuote({ 
                        category: prodCat, 
                        quantity: '100',
                        customization: detailProduct.branding || 'Custom Logo Branding',
                        message: `Inquiring for bulk procurement quote: "${prodName}" (${prodMoq}). Please send formal quotation and custom branding mockups.` 
                      });
                    }}
                    className="w-full sm:w-auto px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer"
                  >
                    Request Bulk Quotation <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>,
        document.body
      )}

    </section>
  );
}


