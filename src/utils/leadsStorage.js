import { saveLeadToSupabase } from './supabaseLeads';

/**
 * Save lead locally to localStorage as backup.
 */
function saveLocalLead(lead) {
  try {
    const stored = JSON.parse(localStorage.getItem('ultra_d_local_leads') || '[]');
    stored.unshift(lead);
    localStorage.setItem('ultra_d_local_leads', JSON.stringify(stored.slice(0, 200)));
  } catch (e) {
    console.warn('Could not save to localStorage', e);
  }
}

/**
 * Get all local backup leads.
 */
export function getLocalLeads() {
  try {
    return JSON.parse(localStorage.getItem('ultra_d_local_leads') || '[]');
  } catch (e) {
    return [];
  }
}

/**
 * Save Lead function - syncs directly to Supabase Database 'leads' table.
 */
export async function saveLead(leadData) {
  const newLead = {
    id: `LD-${Date.now()}-${Math.floor(Math.random() * 900) + 100}`,
    timestamp: new Date().toISOString(),
    created_at: new Date().toISOString(),
    name: leadData.name || 'Anonymous Client',
    company: leadData.company || '',
    email: leadData.email || '',
    phone: leadData.phone || '',
    category: leadData.category || 'General Inquiry',
    qty: leadData.qty || leadData.quantity || '100',
    customization: leadData.customization || 'None',
    details: leadData.details || leadData.message || '',
    status: 'New'
  };

  // 1. Save locally as immediate backup
  saveLocalLead(newLead);

  // 2. Save directly to Supabase DB
  await saveLeadToSupabase(newLead);

  return newLead;
}

/**
 * Save Liquidation lead directly to Supabase Database.
 */
export async function saveLiquidationLead(data) {
  return saveLead({
    ...data,
    category: data.category
      ? `Liquidation - ${data.category}`
      : 'Stock Liquidation (Seller)'
  });
}
