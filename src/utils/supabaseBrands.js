import { supabase } from '../lib/supabase';

/**
 * Fetch all brand logos from Supabase 'brands' table.
 */
export async function fetchBrandsFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase brands fetch warning:', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error fetching brands from Supabase:', err);
    return [];
  }
}

/**
 * Create a new brand entry in Supabase (syncs automatically to both TrustBar & Brand Distribution).
 */
export async function createBrandInSupabase(brand) {
  try {
    const newBrand = {
      id: brand.id || `BRD-${Date.now()}-${Math.floor(Math.random() * 900) + 100}`,
      name: brand.name,
      logo_url: brand.logo_url,
      category: brand.category || 'Trusted Partner',
      badge: brand.badge || 'Authorized Channel Partner',
      reach: brand.reach || 'Pan-India Corporate Fulfillment',
      description: brand.description || brand.desc || `${brand.name} authorized distribution channel for corporate sourcing & bulk orders.`,
      categories_handled: brand.categories_handled || 'Corporate Supply & Gifting'
    };

    const { data, error } = await supabase
      .from('brands')
      .insert([newBrand])
      .select();

    if (error) {
      console.error('Supabase create brand error:', error.message);
      return { success: false, error: error.message, brand: newBrand };
    }

    return { success: true, brand: data ? data[0] : newBrand };
  } catch (err) {
    console.error('Error creating brand in Supabase:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Delete a brand from Supabase.
 */
export async function deleteBrandFromSupabase(id) {
  try {
    const { error } = await supabase
      .from('brands')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete brand error:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error deleting brand from Supabase:', err);
    return false;
  }
}
