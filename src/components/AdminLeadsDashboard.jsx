import React, { useState, useEffect } from 'react';
import { X, FileSpreadsheet, Search, Database } from 'lucide-react';
import { fetchLeads, exportToCSV } from '../utils/leadsStorage';

export default function AdminLeadsDashboard({ isOpen, onClose }) {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const loadLeads = async () => {
        setLoading(true);
        const data = await fetchLeads();
        setLeads(data);
        setLoading(false);
      };
      loadLeads();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleExport = () => {
    exportToCSV(leads);
  };

  const filteredLeads = leads.filter(lead => {
    const term = searchTerm.toLowerCase();
    return (
      (lead.name && lead.name.toLowerCase().includes(term)) ||
      (lead.company && lead.company.toLowerCase().includes(term)) ||
      (lead.email && lead.email.toLowerCase().includes(term)) ||
      (lead.phone && lead.phone.toLowerCase().includes(term)) ||
      (lead.category && lead.category.toLowerCase().includes(term))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Dashboard container */}
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 animate-slideUp max-h-[90vh] flex flex-col">
        {/* Header decoration */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500" />

        {/* Title bar */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                B2B Lead Sourcing Hub <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold uppercase tracking-wider">Excel & Sheet Console</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage, configure Google Sheets sync, and download lead inquiries.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dashboard Main Panel */}
        <div className="flex-grow overflow-y-auto p-6 flex flex-col">

          {/* Leads Table Full-width container */}
          <div className="w-full flex flex-col h-full min-h-[300px]">

            {/* Table actions bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-4">

              {/* Search input */}
              <div className="relative flex-grow max-w-md">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by name, company, email, phone, category..."
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors text-xs font-semibold"
                />
              </div>

              {/* Actions: Export Excel */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleExport}
                  className="py-2.5 px-5 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FileSpreadsheet className="w-4 h-4" /> Export to Excel (CSV)
                </button>
              </div>

            </div>

            {/* Table Container */}
            <div className="flex-grow overflow-auto border border-slate-200 rounded-2xl relative">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center p-10 text-center space-y-3 text-slate-500 min-h-[250px]">
                  <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin" />
                  <span className="block font-semibold text-sm text-slate-700">Fetching live leads from SheetDB...</span>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-10 text-center space-y-2 text-slate-400 min-h-[250px]">
                  <FileSpreadsheet className="w-12 h-12 text-slate-350 stroke-1" />
                  <span className="block font-bold text-sm text-slate-700">No Lead Inquiries Registered Yet</span>
                  <span className="block text-xs text-slate-400 max-w-xs mx-auto">
                    Fill out a sourcing lead form or RFP quote request on the homepage or in the quote popup.
                  </span>
                </div>
              ) : (
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider select-none sticky top-0 z-10">
                    <tr>
                      <th className="py-3 px-4 font-extrabold">Timestamp</th>
                      <th className="py-3 px-4 font-extrabold">Name</th>
                      <th className="py-3 px-4 font-extrabold">Company</th>
                      <th className="py-3 px-4 font-extrabold">Contact info</th>
                      <th className="py-3 px-4 font-extrabold">Category</th>
                      <th className="py-3 px-4 font-extrabold">Qty & Customization</th>
                      <th className="py-3 px-4 font-extrabold">Message Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-semibold text-slate-500 whitespace-nowrap">
                          {new Date(lead.timestamp).toLocaleDateString()} <br />
                          <span className="text-[10px] text-slate-400 font-medium">{new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </td>
                        <td className="py-3.5 px-4 font-extrabold text-slate-800 whitespace-nowrap">
                          {lead.name}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-700">
                          {lead.company}
                        </td>
                        <td className="py-3.5 px-4 leading-relaxed font-semibold text-slate-600">
                          <span className="block text-[11px] font-bold text-slate-800">{lead.email}</span>
                          <span className="block text-[10px] font-medium text-slate-500">{lead.phone}</span>
                        </td>
                        <td className="py-3.5 px-4 font-extrabold">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 uppercase tracking-wide text-[10px]">
                            {lead.category || 'General'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 leading-normal font-semibold text-slate-700">
                          <span className="block font-extrabold text-slate-800">MOQ: {lead.qty || lead.quantity}</span>
                          <span className="block text-[10px] text-slate-500">Custom: {lead.customization || 'None'}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 max-w-xs break-words">
                          {lead.details || lead.message}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Lead Count Footer */}
            <div className="mt-3 shrink-0 flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
              <span>Showing {filteredLeads.length} of {leads.length} entries</span>
              <span className="text-[10px] uppercase tracking-wide text-slate-400">Database Engine: localStorage Local DB</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
