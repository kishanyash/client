import { useState, useEffect } from 'react';
import { fetchProductsFromSupabase } from '../utils/supabaseProducts';
import { Search, BadgeCheck, ArrowUpRight, Image as ImageIcon, ChevronLeft, ChevronRight, Package, X, CheckCircle2, Tag } from 'lucide-react';

export default function ProductsSection({ onOpenQuote }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeImageIndexes, setActiveImageIndexes] = useState({});
  const [detailProduct, setDetailProduct] = useState(null); // Selected product for detail modal
  const [modalActiveImage, setModalActiveImage] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchProductsFromSupabase().then((data) => {
      if (data && data.length > 0) {
        const formatted = data.map(p => ({
          id: p.id,
          name: p.title,
          category: p.category || 'Corporate Supply',
          brand: 'Ultra D Verified',
          moq: p.price || 'Bulk Price',
          branding: 'Custom Logo Branding',
          rating: 5.0,
          desc: p.description || '',
          features: p.features || [],
          images: p.images && p.images.length > 0 ? p.images : []
        }));
        setProducts(formatted);
      }
      setLoading(false);
    });
  }, []);

  // Dynamic categories
  const allCategories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  const filteredProducts = products.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.desc.toLowerCase().includes(searchTerm.toLowerCase());
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
    <section className="py-16 bg-slate-50 relative min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-3 py-1 rounded-full uppercase tracking-wider">
            Enterprise Sourcing Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore Verified B2B Merchandise
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Browse our dynamically updated catalog of corporate gifts, appliances, tech gadgets, and bulk supply items. Click any item for complete specifications.
          </p>
        </div>

        {/* Filter Controls Bar */}
        {products.length > 0 && (
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search product catalog..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full md:w-auto">
              {allCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16 text-slate-400">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent mb-4" />
            <p className="text-sm font-semibold">Loading product catalog...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700">No Products Added Yet</h3>
            <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto">
              Products will appear here once added by the admin through the Admin Portal. Contact us for a custom sourcing quote in the meantime!
            </p>
            <button
              onClick={() => onOpenQuote({ category: 'Corporate Supply', message: 'Interested in corporate supply catalog.' })}
              className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md cursor-pointer"
            >
              Request a Custom Quote
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((item) => {
              const currentImgIndex = activeImageIndexes[item.id] || 0;
              const totalImgs = item.images.length;

              return (
                <div 
                  key={item.id}
                  onClick={() => openDetailModal(item)}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Multi-Image Carousel Header */}
                    <div className="h-56 bg-slate-100 relative overflow-hidden group/img">
                      {totalImgs > 0 ? (
                        <img 
                          src={item.images[currentImgIndex]} 
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                          <Package className="w-12 h-12" />
                        </div>
                      )}
                      
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-blue-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase shadow-sm">
                        {item.category}
                      </span>

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
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-slate-900/60 backdrop-blur-md px-2 py-0.5 rounded-full text-white text-[10px]">
                            <ImageIcon className="w-3 h-3 text-blue-400" />
                            <span>{currentImgIndex + 1}/{totalImgs}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                          {item.name}
                        </h3>
                      </div>

                      {item.desc && (
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{item.desc}</p>
                      )}

                      <div className="pt-2 flex flex-wrap gap-2 text-xs">
                        <span className="bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded-md border border-blue-100">
                          {item.moq}
                        </span>
                      </div>

                      {item.features && item.features.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {item.features.slice(0, 3).map((feat, idx) => (
                            <span key={idx} className="text-[10px] bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                              • {feat}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:underline">
                      Click to View Details
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenQuote({ category: item.category, message: `Inquiring about bulk quote for ${item.name}` });
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
      {/* PRODUCT DETAIL MODAL */}
      {/* ========================================================================= */}
      {detailProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl relative space-y-6 my-8 border border-slate-100">
            {/* Close Button */}
            <button
              onClick={() => setDetailProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Column: Image Viewer */}
              <div className="md:col-span-6 space-y-3">
                <div className="h-64 md:h-80 bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200">
                  {detailProduct.images && detailProduct.images.length > 0 ? (
                    <img
                      src={detailProduct.images[modalActiveImage] || detailProduct.images[0]}
                      alt={detailProduct.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <Package className="w-16 h-16" />
                    </div>
                  )}

                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-blue-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase shadow-sm border border-blue-100">
                    {detailProduct.category}
                  </span>
                </div>

                {/* Thumbnails list */}
                {detailProduct.images && detailProduct.images.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {detailProduct.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setModalActiveImage(idx)}
                        className={`h-16 w-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                          modalActiveImage === idx ? 'border-blue-600 shadow-md scale-95' : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Full Details */}
              <div className="md:col-span-6 space-y-4">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                    <Tag className="w-3 h-3" /> {detailProduct.category}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">
                    {detailProduct.name}
                  </h3>
                  <div className="inline-block bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-lg border border-slate-200">
                    {detailProduct.moq}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Product Description</h4>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                    {detailProduct.desc || 'Contact our B2B team for full specifications and custom branding details.'}
                  </p>
                </div>

                {/* Key Features */}
                {detailProduct.features && detailProduct.features.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Specifications & Features</h4>
                    <ul className="space-y-1.5">
                      {detailProduct.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <BadgeCheck className="w-4 h-4" /> Ready for Bulk RFQ
                  </span>
                  <button
                    onClick={() => {
                      const prodName = detailProduct.name;
                      const prodCat = detailProduct.category;
                      setDetailProduct(null);
                      onOpenQuote({ category: prodCat, message: `Inquiring about bulk quote for product: ${prodName}` });
                    }}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
                  >
                    Request Bulk Quote <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
