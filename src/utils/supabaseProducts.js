import { supabase } from '../lib/supabase';

/**
 * Fetch all products from Supabase 'products' table.
 */
export async function fetchProductsFromSupabase() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase products fetch warning:', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Error fetching products from Supabase:', err);
    return [];
  }
}

/**
 * Create a new product in Supabase.
 */
export async function createProductInSupabase(product) {
  try {
    const newProduct = {
      id: product.id || `PRD-${Date.now()}-${Math.floor(Math.random() * 900) + 100}`,
      title: product.title,
      category: product.category || 'Corporate Supply',
      price: product.price || 'RFQ / Bulk Price',
      description: product.description || '',
      features: product.features || [],
      images: product.images || [], // Array of image URLs / base64 URIs
      in_stock: product.in_stock !== undefined ? product.in_stock : true
    };

    const { data, error } = await supabase
      .from('products')
      .insert([newProduct])
      .select();

    if (error) {
      console.error('Supabase create product error:', error.message);
      return { success: false, error: error.message, product: newProduct };
    }

    return { success: true, product: data ? data[0] : newProduct };
  } catch (err) {
    console.error('Error creating product in Supabase:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Update an existing product in Supabase.
 */
export async function updateProductInSupabase(id, updates) {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Supabase update product error:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error updating product in Supabase:', err);
    return false;
  }
}

/**
 * Delete a product from Supabase.
 */
export async function deleteProductFromSupabase(id) {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete product error:', error.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error deleting product from Supabase:', err);
    return false;
  }
}
