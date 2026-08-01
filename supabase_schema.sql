-- ==============================================================================
-- ULTRA D MULTI VENTURES - COMPLETE DYNAMIC SUPABASE DATABASE SCHEMA & MIGRATION
-- Execute this SQL script in your Supabase Dashboard -> SQL Editor
-- ==============================================================================

-- 1. Create 'leads' Table (Inquiries & RFQs)
CREATE TABLE IF NOT EXISTS public.leads (
  id VARCHAR PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(100),
  category VARCHAR(255) DEFAULT 'General',
  qty VARCHAR(100) DEFAULT '100',
  customization VARCHAR(255) DEFAULT 'None',
  details TEXT,
  status VARCHAR(50) DEFAULT 'New',
  notes TEXT
);

-- 2. Create 'products' Table (Dynamic Catalog)
CREATE TABLE IF NOT EXISTS public.products (
  id VARCHAR PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL DEFAULT 'Corporate Supply',
  price VARCHAR(100) DEFAULT 'RFQ / Bulk Price',
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  in_stock BOOLEAN DEFAULT true
);

-- 3. Create 'brands' Table (Synced TrustBar & Brand Distribution)
CREATE TABLE IF NOT EXISTS public.brands (
  id VARCHAR PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name VARCHAR(255) NOT NULL,
  logo_url TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'Trusted Partner',
  badge VARCHAR(100) DEFAULT 'Authorized Partner',
  reach VARCHAR(255) DEFAULT 'Pan-India Distribution',
  description TEXT,
  categories_handled TEXT DEFAULT 'Corporate Supply & Gifting'
);

-- Safely add columns if 'brands' table was created previously without them
ALTER TABLE public.brands ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'Trusted Partner';
ALTER TABLE public.brands ADD COLUMN IF NOT EXISTS badge VARCHAR(100) DEFAULT 'Authorized Partner';
ALTER TABLE public.brands ADD COLUMN IF NOT EXISTS reach VARCHAR(255) DEFAULT 'Pan-India Distribution';
ALTER TABLE public.brands ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.brands ADD COLUMN IF NOT EXISTS categories_handled TEXT DEFAULT 'Corporate Supply & Gifting';

-- Safely add columns to 'products' table if needed
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- Drop and recreate RLS Access Policies
DROP POLICY IF EXISTS "Allow public all to leads" ON public.leads;
DROP POLICY IF EXISTS "Allow public all to products" ON public.products;
DROP POLICY IF EXISTS "Allow public all to brands" ON public.brands;

CREATE POLICY "Allow public all to leads" ON public.leads FOR ALL TO public USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all to products" ON public.products FOR ALL TO public USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all to brands" ON public.brands FOR ALL TO public USING (true) WITH CHECK (true);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_brands_created_at ON public.brands(created_at DESC);

