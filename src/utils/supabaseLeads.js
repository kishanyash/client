import { supabase } from '../lib/supabase';

/**
 * Save lead directly to Supabase 'leads' table.
 */
export async function saveLeadToSupabase(leadData) {
  try {
    const newLead = {
      id: leadData.id || `LD-${Date.now()}-${Math.floor(Math.random() * 900) + 100}`,
      name: leadData.name || 'Anonymous',
      company: leadData.company || '',
      email: leadData.email || '',
      phone: leadData.phone || '',
      category: leadData.category || 'General',
      qty: String(leadData.qty || leadData.quantity || '100'),
      customization: leadData.customization || 'None',
      details: leadData.details || leadData.message || '',
      status: 'New'
    };

    const { data, error } = await supabase
      .from('leads')
      .insert([newLead])
      .select();

    if (error) {
      console.warn('Supabase insert error (table may not exist yet):', error.message);
      return { success: false, lead: newLead, error };
    }

    return { success: true, lead: data ? data[0] : newLead };
  } catch (err) {
    console.error('Failed to save lead to Supabase:', err);
    return { success: false, error: err };
  }
}

/**
 * Fetch all leads from Supabase 'leads' table.
 */
export async function fetchLeadsFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error:', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error fetching leads from Supabase:', err);
    return [];
  }
}

/**
 * Update status and notes for a lead in Supabase.
 */
export async function updateLeadStatusInSupabase(id, status, notes = '') {
  try {
    const updatePayload = { status };
    if (notes !== undefined && notes !== null) {
      updatePayload.notes = notes;
    }

    const { data, error } = await supabase
      .from('leads')
      .update(updatePayload)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase update status error:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error updating lead status in Supabase:', err);
    return false;
  }
}

/**
 * Delete a lead from Supabase.
 */
export async function deleteLeadFromSupabase(id) {
  try {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error deleting lead from Supabase:', err);
    return false;
  }
}
