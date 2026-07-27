import { useState, useEffect } from 'react';
import { 
  fetchLeadsFromSupabase, 
  updateLeadStatusInSupabase, 
  deleteLeadFromSupabase 
} from '../utils/supabaseLeads';
import { 
  fetchProductsFromSupabase, 
  createProductInSupabase, 
  updateProductInSupabase,
  deleteProductFromSupabase 
} from '../utils/supabaseProducts';
import { 
  fetchBrandsFromSupabase, 
  createBrandInSupabase, 
  deleteBrandFromSupabase 
} from '../utils/supabaseBrands';
import { getLocalLeads } from '../utils/leadsStorage';
import { 
  Search, Filter, RefreshCw, LogOut, Package, Tag, Building2, 
  Plus, Trash2, AlertCircle, FileSpreadsheet, X, Upload, 
  Image as ImageIcon, Layers, Inbox, Edit3
} from 'lucide-react';
import UltraDLogo from './UltraDLogo';

export default function AdminDashboard({ session, onLogout, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries', 'products', 'brands'
  
  // Leads State
  const [leads, setLeads] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedLead, setSelectedLead] = useState(null);

  // Products State
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null = new, object = edit
  const [newProduct, setNewProduct] = useState({
    title: '',
    category: 'Corporate Supply',
    price: 'RFQ / Bulk Pricing',
    description: '',
    featuresStr: '',
    images: [] // Array of image URLs / base64 URIs
  });

  // Brands State
  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [newBrand, setNewBrand] = useState({
    name: '',
    logo_url: ''
  });

  // Global State
  const [isConnected, setIsConnected] = useState(true);

  // Load All Data
  const loadData = async () => {
    // 1. Load Leads
    setLoadingLeads(true);
    try {
      const dbLeads = await fetchLeadsFromSupabase();
      const localBackup = getLocalLeads();
      const combinedMap = new Map();
      localBackup.forEach(item => combinedMap.set(item.id, item));
      if (dbLeads && dbLeads.length > 0) {
        dbLeads.forEach(item => combinedMap.set(item.id, item));
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
      const mergedList = Array.from(combinedMap.values());
      mergedList.sort((a, b) => new Date(b.created_at || b.timestamp) - new Date(a.created_at || a.timestamp));
      setLeads(mergedList);
    } catch (err) {
      console.error('Error loading leads:', err);
    } finally {
      setLoadingLeads(false);
    }

    // 2. Load Products
    setLoadingProducts(true);
    try {
      const dbProducts = await fetchProductsFromSupabase();
      setProducts(dbProducts);
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setLoadingProducts(false);
    }

    // 3. Load Brands
    setLoadingBrands(true);
    try {
      const dbBrands = await fetchBrandsFromSupabase();
      setBrands(dbBrands);
    } catch (err) {
      console.error('Error loading brands:', err);
    } finally {
      setLoadingBrands(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      (lead.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.company || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.phone || '').includes(searchQuery) ||
      (lead.id || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || 
      (lead.category || '').toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || 
      (lead.status || 'New').toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Handle Status Update
  const handleStatusChange = async (leadId, newStatus) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => ({ ...prev, status: newStatus }));
    }
    await updateLeadStatusInSupabase(leadId, newStatus);
  };

  // Handle Delete Lead
  const handleDeleteLead = async (leadId) => {
    if (!window.confirm('Delete this inquiry record permanently?')) return;
    setLeads(prev => prev.filter(l => l.id !== leadId));
    if (selectedLead?.id === leadId) setSelectedLead(null);
    await deleteLeadFromSupabase(leadId);
  };

  // Handle Add Multiple Images for Product
  const handleProductImagesUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({
          ...prev,
          images: [...prev.images, reader.result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle Remove Image from new product draft
  const handleRemoveProductImage = (index) => {
    setNewProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Open modal for NEW product
  const handleOpenCreateProduct = () => {
    setEditingProduct(null);
    setNewProduct({
      title: '',
      category: 'Corporate Supply',
      price: 'RFQ / Bulk Pricing',
      description: '',
      featuresStr: '',
      images: []
    });
    setShowAddProductModal(true);
  };

  // Open modal for EDITING existing product
  const handleOpenEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      title: product.title || '',
      category: product.category || 'Corporate Supply',
      price: product.price || 'RFQ / Bulk Pricing',
      description: product.description || '',
      featuresStr: Array.isArray(product.features) ? product.features.join('\n') : '',
      images: Array.isArray(product.images) ? product.images : []
    });
    setShowAddProductModal(true);
  };

  // Submit New or Edited Product
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.title.trim()) return;

    const featuresList = newProduct.featuresStr
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    const productPayload = {
      title: newProduct.title,
      category: newProduct.category,
      price: newProduct.price,
      description: newProduct.description,
      features: featuresList,
      images: newProduct.images.length > 0 
        ? newProduct.images 
        : ['https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800']
    };

    if (editingProduct) {
      // Update existing product in Supabase
      const success = await updateProductInSupabase(editingProduct.id, productPayload);
      if (success) {
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...productPayload } : p));
        setShowAddProductModal(false);
        setEditingProduct(null);
      } else {
        alert('Error updating product in database.');
      }
    } else {
      // Create new product in Supabase
      const res = await createProductInSupabase(productPayload);
      if (res.success) {
        setProducts(prev => [res.product, ...prev]);
        setShowAddProductModal(false);
        setNewProduct({
          title: '',
          category: 'Corporate Supply',
          price: 'RFQ / Bulk Pricing',
          description: '',
          featuresStr: '',
          images: []
        });
      } else {
        alert(`Error saving product: ${res.error || 'Something went wrong. Please try again.'}`);
      }
    }
  };

  // Delete Product
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Delete this product from catalog?')) return;
    setProducts(prev => prev.filter(p => p.id !== productId));
    await deleteProductFromSupabase(productId);
  };

  // Handle Upload Brand Logo
  const handleBrandLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewBrand(prev => ({ ...prev, logo_url: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Submit New Brand Logo
  const handleCreateBrand = async (e) => {
    e.preventDefault();
    if (!newBrand.name.trim() || !newBrand.logo_url) {
      alert('Please enter brand name and upload or paste logo image.');
      return;
    }

    const res = await createBrandInSupabase(newBrand);
    if (res.success) {
      setBrands(prev => [res.brand, ...prev]);
      setShowAddBrandModal(false);
      setNewBrand({ name: '', logo_url: '' });
    } else {
      alert(`Error saving brand: ${res.error}`);
    }
  };

  // Delete Brand Logo
  const handleDeleteBrand = async (brandId) => {
    if (!window.confirm('Delete this brand logo from TrustBar?')) return;
    setBrands(prev => prev.filter(b => b.id !== brandId));
    await deleteBrandFromSupabase(brandId);
  };

  // CSV Export
  const exportToCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Date', 'Name', 'Company', 'Email', 'Phone', 'Category', 'Quantity', 'Customization', 'Details', 'Status'];
    const rows = filteredLeads.map(l => [
      l.id,
      new Date(l.created_at || l.timestamp || Date.now()).toLocaleString(),
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.company || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.category || '').replace(/"/g, '""')}"`,
      `"${(l.qty || l.quantity || '').replace(/"/g, '""')}"`,
      `"${(l.customization || '').replace(/"/g, '""')}"`,
      `"${(l.details || l.message || '').replace(/"/g, '""')}"`,
      l.status || 'New'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ultrad_inquiries_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Header */}
      <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UltraDLogo className="h-7" />
            <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Admin Control Center
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              Main Site
            </button>

            <button
              onClick={onLogout}
              className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Navigation Tabs (Inquiries, Products, TrustBar Logos) */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'inquiries' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Inbox className="w-4 h-4" /> Inquiries & RFQs ({leads.length})
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'products' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Package className="w-4 h-4" /> Dynamic Catalog ({products.length})
            </button>

            <button
              onClick={() => setActiveTab('brands')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'brands' 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4" /> TrustBar Logos ({brands.length})
            </button>
          </div>

          <button
            onClick={loadData}
            className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl transition-all cursor-pointer"
            title="Refresh All Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: INQUIRIES & LEADS MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Toolbar */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search inquiries by client, email..."
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-400 mr-1">Status:</span>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="All" className="bg-slate-900">All Statuses</option>
                    <option value="New" className="bg-slate-900">New</option>
                    <option value="Contacted" className="bg-slate-900">Contacted</option>
                    <option value="In Progress" className="bg-slate-900">In Progress</option>
                    <option value="Closed" className="bg-slate-900">Closed</option>
                  </select>
                </div>

                <button
                  onClick={exportToCSV}
                  className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-600/20"
                >
                  <FileSpreadsheet className="w-4 h-4" /> Export CSV
                </button>
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 uppercase text-[10px] font-semibold text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-4">Inquiry ID</th>
                      <th className="px-6 py-4">Client / Company</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Quantity / Details</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {loadingLeads ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                          <RefreshCw className="w-6 h-6 animate-spin text-blue-400 mx-auto mb-2" />
                          <span>Loading inquiries...</span>
                        </td>
                      </tr>
                    ) : filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center text-slate-400">
                          <p className="text-base font-semibold text-slate-300">No Inquiries Found</p>
                          <p className="text-xs text-slate-500 mt-1">Inquiries submitted on your website will appear here in real-time.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr 
                          key={lead.id} 
                          className="hover:bg-slate-800/40 transition-colors cursor-pointer"
                          onClick={() => setSelectedLead(lead)}
                        >
                          <td className="px-6 py-4 font-mono text-blue-400 font-semibold">{lead.id}</td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-slate-100">{lead.name || 'Anonymous'}</div>
                            <div className="text-[11px] text-slate-400">{lead.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-800 border border-slate-700 text-slate-300">
                              {lead.category || 'General'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-slate-200">Qty: {lead.qty || lead.quantity || 'N/A'}</div>
                          </td>
                          <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={lead.status || 'New'}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                              className="bg-slate-950 text-slate-200 text-xs px-2.5 py-1 rounded-lg border border-slate-700 focus:outline-none"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-slate-400 text-[11px]">
                            {new Date(lead.created_at || lead.timestamp || Date.now()).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: DYNAMIC PRODUCTS MANAGER */}
        {/* ========================================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header & Add Button */}
            <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <div>
                <h3 className="text-base font-bold text-white">Dynamic Product Catalog</h3>
                <p className="text-xs text-slate-400 mt-0.5">Manage products and multi-image galleries live on your website.</p>
              </div>
              <button
                onClick={handleOpenCreateProduct}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add New Product
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loadingProducts ? (
                <div className="col-span-full py-12 text-center text-slate-400">
                  <RefreshCw className="w-6 h-6 animate-spin text-blue-400 mx-auto mb-2" />
                  <span>Loading product catalog...</span>
                </div>
              ) : products.length === 0 ? (
                <div className="col-span-full bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
                  <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <h4 className="text-base font-bold text-slate-200">No Products Added Yet</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-4">
                    Click below to add your first product with multiple image uploads. Products will appear live on the website!
                  </p>
                  <button
                    onClick={handleOpenCreateProduct}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl"
                  >
                    Add Product Now
                  </button>
                </div>
              ) : (
                products.map((product) => (
                  <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition-all">
                    <div>
                      {/* Multi-image thumbnail header */}
                      <div className="h-48 bg-slate-950 relative overflow-hidden">
                        <img 
                          src={product.images?.[0] || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'} 
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                        <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-700 text-blue-400 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                          {product.category}
                        </span>
                        {product.images?.length > 1 && (
                          <span className="absolute bottom-3 right-3 bg-slate-950/80 text-white text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                            <ImageIcon className="w-3 h-3 text-blue-400" /> +{product.images.length - 1} images
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-white leading-snug">{product.title}</h4>
                          <span className="text-xs font-mono text-emerald-400 shrink-0 font-semibold">{product.price}</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2">{product.description}</p>
                        
                        {product.features && product.features.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {product.features.slice(0, 3).map((feat, idx) => (
                              <span key={idx} className="text-[10px] bg-slate-950 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                                • {feat}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-mono text-[10px]">{product.id}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditProduct(product)}
                          className="text-blue-400 hover:text-blue-300 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20 flex items-center gap-1 transition-all cursor-pointer font-semibold"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-400 hover:text-red-300 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 flex items-center gap-1 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: TRUSTBAR & BRAND LOGOS MANAGER */}
        {/* ========================================================================= */}
        {activeTab === 'brands' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header & Add Button */}
            <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <div>
                <h3 className="text-base font-bold text-white">TrustBar Brand Logos</h3>
                <p className="text-xs text-slate-400 mt-0.5">Manage corporate client and brand logos scrolling on the homepage marquee.</p>
              </div>
              <button
                onClick={() => setShowAddBrandModal(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Brand Logo
              </button>
            </div>

            {/* Brands Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {loadingBrands ? (
                <div className="col-span-full py-12 text-center text-slate-400">
                  <RefreshCw className="w-6 h-6 animate-spin text-blue-400 mx-auto mb-2" />
                  <span>Loading brand logos...</span>
                </div>
              ) : brands.length === 0 ? (
                <div className="col-span-full bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
                  <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <h4 className="text-base font-bold text-slate-200">No Brands Added Yet</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-4">
                    Click below to add brand logos. They will appear live on the homepage marquee and brand distribution page!
                  </p>
                  <button
                    onClick={() => setShowAddBrandModal(true)}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl"
                  >
                    Add Brand Logo Now
                  </button>
                </div>
              ) : (
                brands.map((brand) => (
                  <div key={brand.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-between text-center relative group">
                    <div className="w-full h-20 bg-slate-950 rounded-xl border border-slate-800/80 p-2 flex items-center justify-center mb-3">
                      <img src={brand.logo_url} alt={brand.name} className="max-h-14 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" />
                    </div>
                    <span className="text-xs font-semibold text-slate-200 truncate w-full mb-3">{brand.name}</span>
                    <button
                      onClick={() => handleDeleteBrand(brand.id)}
                      className="w-full py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[11px] font-medium rounded-lg border border-red-500/20 flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODAL: ADD PRODUCT WITH MULTI-IMAGE SUPPORT */}
      {/* ========================================================================= */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">
                  {editingProduct ? `Edit Product: ${editingProduct.title}` : 'Add New Product'}
                </h3>
              </div>
              <button onClick={() => { setShowAddProductModal(false); setEditingProduct(null); }} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  placeholder="e.g. Philips Premium Corporate Joining Gift Set"
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1">Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 focus:outline-none"
                  >
                    <option value="Corporate Supply">Corporate Supply</option>
                    <option value="Gifting">Corporate Gifting</option>
                    <option value="Electronics">Electronics & Gadgets</option>
                    <option value="Liquidation">Liquidation Surplus</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1">Price / MOQ *</label>
                  <input
                    type="text"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="e.g. ₹1,499 / MOQ 50 pcs"
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Detailed product overview..."
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1">Product Features (One per line)</label>
                <textarea
                  rows={3}
                  value={newProduct.featuresStr}
                  onChange={(e) => setNewProduct({ ...newProduct, featuresStr: e.target.value })}
                  placeholder="Custom Logo Branding Included&#10;Fast Pan-India Delivery&#10;Original Manufacturer Warranty"
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 focus:outline-none font-mono"
                />
              </div>

              {/* Multi-Image File Uploader */}
              <div>
                <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1">Upload Product Images (Multiple allowed)</label>
                <div className="flex items-center gap-3">
                  <label className="bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 px-4 py-2.5 rounded-xl cursor-pointer flex items-center gap-2 text-xs font-semibold transition-all">
                    <Upload className="w-4 h-4 text-blue-400" /> Choose Images
                    <input type="file" multiple accept="image/*" onChange={handleProductImagesUpload} className="hidden" />
                  </label>
                  <span className="text-[11px] text-slate-400">{newProduct.images.length} image(s) selected</span>
                </div>

                {/* Live Image Previews */}
                {newProduct.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {newProduct.images.map((img, i) => (
                      <div key={i} className="relative h-16 rounded-lg overflow-hidden group">
                        <img src={img} alt="preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveProductImage(i)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 opacity-90 hover:opacity-100"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button type="button" onClick={() => { setShowAddProductModal(false); setEditingProduct(null); }} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl cursor-pointer shadow-lg shadow-blue-600/20">
                  {editingProduct ? 'Update Product Changes' : 'Save New Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD BRAND LOGO */}
      {/* ========================================================================= */}
      {showAddBrandModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-base font-bold text-white">Add Brand (Syncs Site-Wide)</h3>
                  <p className="text-[11px] text-blue-400 font-semibold">
                    ✨ Upload once — automatically syncs to both TrustBar marquee & Brand Distribution!
                  </p>
                </div>
              </div>
              <button onClick={() => setShowAddBrandModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBrand} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  value={newBrand.name}
                  onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                  placeholder="e.g. Philips, Sony, Samsung, Welspun"
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-300 uppercase tracking-wider mb-1">Upload Logo Image or Paste URL *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBrandLogoUpload}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-xl px-3 py-2"
                />
                <p className="text-[11px] text-slate-500 my-1">or paste image URL below:</p>
                <input
                  type="text"
                  value={newBrand.logo_url}
                  onChange={(e) => setNewBrand({ ...newBrand, logo_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-3.5 py-2 focus:outline-none font-mono text-[11px]"
                />
              </div>

              {newBrand.logo_url && (
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-center h-20">
                  <img src={newBrand.logo_url} alt="preview" className="max-h-14 max-w-full object-contain" />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setShowAddBrandModal(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl">Save Brand Logo</button>
              </div>
            </form>
          </div>
        </div>
      )}



    </div>
  );
}
