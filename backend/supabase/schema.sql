-- ==============================================================================
-- JYOTI ENTERPRISE — B2B WHOLESALE GARMENT DATABASE SCHEMA
-- PostgreSQL / Supabase Migration
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  image_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCTS
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(150) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  description TEXT,
  fabric VARCHAR(200) NOT NULL,
  sizes TEXT[] DEFAULT ARRAY['M', 'L', 'XL', 'XXL'],
  colours TEXT[] DEFAULT ARRAY['Assorted'],
  moq INT NOT NULL DEFAULT 12,
  unit VARCHAR(50) DEFAULT 'pcs',
  price NUMERIC(10, 2),
  show_price BOOLEAN DEFAULT FALSE,
  availability VARCHAR(50) DEFAULT 'In Stock',
  is_featured BOOLEAN DEFAULT FALSE,
  primary_image TEXT,
  gallery_images TEXT[] DEFAULT ARRAY[]::TEXT[],
  specifications JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. WHOLESALE ENQUIRIES / LEADS
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(150) NOT NULL,
  business_name VARCHAR(150),
  phone VARCHAR(50) NOT NULL,
  whatsapp VARCHAR(50),
  city VARCHAR(100),
  business_type VARCHAR(100),
  interested_products TEXT[] DEFAULT ARRAY[]::TEXT[],
  approx_quantity VARCHAR(100),
  budget VARCHAR(100),
  message TEXT,
  status VARCHAR(50) DEFAULT 'New', -- New, Contacted, Quotation Sent, Negotiation, Converted, Lost
  lead_source VARCHAR(50) DEFAULT 'quote_modal',
  notes JSONB DEFAULT '[]'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. BUSINESS QUESTIONNAIRE STARTER LEADS
CREATE TABLE IF NOT EXISTS business_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  city VARCHAR(100),
  business_type VARCHAR(100),
  budget_range VARCHAR(100),
  interested_garments TEXT[] DEFAULT ARRAY[]::TEXT[],
  status VARCHAR(50) DEFAULT 'New',
  notes JSONB DEFAULT '[]'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BLOG POSTS / GUIDES
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(200) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  category VARCHAR(100),
  read_time VARCHAR(50),
  excerpt TEXT,
  summary TEXT,
  key_takeaways TEXT[] DEFAULT ARRAY[]::TEXT[],
  content JSONB NOT NULL,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SETTINGS
CREATE TABLE IF NOT EXISTS site_settings (
  id VARCHAR(50) PRIMARY KEY DEFAULT 'default',
  brand_name VARCHAR(100) DEFAULT 'JYOTI ENTERPRISE',
  whatsapp_number VARCHAR(50) DEFAULT '919876543210',
  display_whatsapp VARCHAR(50) DEFAULT '[WHATSAPP NUMBER]',
  display_phone VARCHAR(50) DEFAULT '[PHONE NUMBER]',
  display_email VARCHAR(100) DEFAULT '[EMAIL]',
  display_address TEXT DEFAULT '[BUSINESS ADDRESS]',
  business_hours TEXT DEFAULT 'Monday – Saturday: 10:00 AM – 7:30 PM (Sunday Closed)',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public can view products & categories
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON site_settings FOR SELECT USING (true);

-- Public can insert leads
CREATE POLICY "Public insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert business requests" ON business_requests FOR INSERT WITH CHECK (true);
