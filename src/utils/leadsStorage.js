// Utility to push B2B leads to Google Sheets via the SheetDB API.
//
// SECURITY NOTE: these URLs ship in the public JS bundle. In the SheetDB
// dashboard, restrict each endpoint to POST-only (disable GET) so visitors
// cannot read the collected leads. The client reads leads directly in the
// Google Sheet itself.

// Main sheet - buyer RFQs, contact form, brochure downloads
const DEFAULT_WEBHOOK_URL = 'https://sheetdb.io/api/v1/w2lkzbravlsre';

// Optional separate SheetDB endpoint for Liquidation (seller) leads.
// Leave empty to send liquidation leads to the same sheet as buyer RFQs.
// To separate them: create a second sheet (or tab) with the same column
// headers, generate a SheetDB API URL for it, and paste it here.
const LIQUIDATION_WEBHOOK_URL = '';

/**
 * Save a new lead entry - POST directly to SheetDB.
 * Returns the saved lead object on success, or null if the sync failed
 * (callers should surface an error to the visitor in that case).
 */
export async function saveLead(leadData, webhookOverride = null) {
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

    const webhookUrl = webhookOverride || DEFAULT_WEBHOOK_URL;

    // SheetDB expects payload wrapped in {"data": [lead]}
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: [newLead] })
    });

    if (!res.ok) {
      throw new Error(`SheetDB response status: ${res.status}`);
    }

    return newLead;
  } catch (e) {
    console.error('Error syncing lead to SheetDB', e);
    return null;
  }
}

/**
 * Save a Liquidation (seller) lead. Goes to the dedicated liquidation
 * sheet if LIQUIDATION_WEBHOOK_URL is configured, otherwise the main sheet.
 */
export async function saveLiquidationLead(data) {
  return saveLead(
    {
      ...data,
      category: data.category
        ? `Liquidation - ${data.category}`
        : 'Stock Liquidation (Seller)'
    },
    LIQUIDATION_WEBHOOK_URL || null
  );
}
