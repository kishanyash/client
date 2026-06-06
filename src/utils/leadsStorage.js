// Utility to manage B2B lead syncing with SheetDB Google Sheets API, and exporting.

const WEBHOOK_KEY = 'ultrad_sheets_webhook_url';

// Default URL placeholder - points directly to your SheetDB API
const DEFAULT_WEBHOOK_URL = 'https://sheetdb.io/api/v1/w2lkzbravlsre';

/**
 * Configure/Set the SheetDB URL
 */
export function setWebhookUrl(url) {
  localStorage.setItem(WEBHOOK_KEY, url);
}

/**
 * Get the current SheetDB URL
 */
export function getWebhookUrl() {
  return localStorage.getItem(WEBHOOK_KEY) || DEFAULT_WEBHOOK_URL;
}

/**
 * Save a new lead entry - POST directly to SheetDB (no localStorage)
 */
export async function saveLead(leadData) {
  try {
    const newLead = {
      id: `LD-${Date.now()}-${Math.floor(Math.random() * 900) + 100}`,
      timestamp: new Date().toISOString(),
      name: leadData.name || '',
      company: leadData.company || '',
      email: leadData.email || '',
      phone: leadData.phone || '',
      category: leadData.category || 'General',
      qty: leadData.qty || leadData.quantity || '100',
      customization: leadData.customization || 'None',
      details: leadData.details || leadData.message || ''
    };

    const webhookUrl = getWebhookUrl();
    if (webhookUrl) {
      // SheetDB expects payload wrapped in {"data": [lead]}
      const payload = { data: [newLead] };
      
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) {
        throw new Error(`SheetDB response status: ${res.status}`);
      }
      console.log('Lead synced to Google Sheets successfully via SheetDB');
    }
    
    return newLead;
  } catch (e) {
    console.error('Error syncing lead to SheetDB', e);
    return null;
  }
}

/**
 * Fetch all leads live from Google Sheet via SheetDB API
 */
export async function fetchLeads() {
  const webhookUrl = getWebhookUrl();
  if (!webhookUrl) return [];
  
  try {
    const res = await fetch(webhookUrl);
    if (!res.ok) {
      throw new Error(`Failed to fetch leads: ${res.status}`);
    }
    const data = await res.json();
    // SheetDB returns the rows chronologically (oldest first).
    // Reverse it so the newest submissions are at the top of the table.
    return Array.isArray(data) ? data.reverse() : [];
  } catch (err) {
    console.error('Error fetching leads from SheetDB', err);
    return [];
  }
}

/**
 * Export leads as CSV formatted specifically for Excel.
 * Excel expects UTF-8 BOM, comma delimiters, and escaped double quotes.
 */
export function exportToCSV(leads) {
  if (!leads || leads.length === 0) {
    alert('No leads available to export.');
    return;
  }

  // Define column headers
  const headers = [
    'Lead ID',
    'Date & Time',
    'Contact Name',
    'Company',
    'Email Address',
    'Phone / WhatsApp',
    'Category',
    'Est. Quantity',
    'Customization Requested',
    'Requirements / Message'
  ];

  // Map entries to rows
  const rows = leads.map(lead => [
    lead.id,
    new Date(lead.timestamp).toLocaleString(),
    lead.name || '',
    lead.company || '',
    lead.email || '',
    lead.phone || '',
    lead.category || 'General Sourcing',
    lead.qty || lead.quantity || 'N/A',
    lead.customization || 'None',
    (lead.details || lead.message || '').replace(/\n/g, ' ') // remove newlines for clean CSV
  ]);

  // Convert to CSV string, escaping quotes
  const csvContent = [
    headers.join(','),
    ...rows.map(row =>
      row.map(value => {
        const strVal = String(value);
        if (strVal.includes(',') || strVal.includes('"') || strVal.includes('\n')) {
          return `"${strVal.replace(/"/g, '""')}"`;
        }
        return strVal;
      }).join(',')
    )
  ].join('\r\n');

  // Excel UTF-8 Byte Order Mark (BOM) trigger
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `UltraD_Sourcing_Leads_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
