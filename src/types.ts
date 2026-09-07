export interface Env {
  DB?: D1Database;
  ASSETS?: Fetcher;
}

export interface Session {
  user_id: number | string;
  username: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  expires_at: string;
  is_active: number;
}

export interface User {
  id: number | string;
  username: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  is_active: number;
  created_at?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent_id?: number | null;
  is_active?: number;
  display_order?: number;
  in_menu?: number;
  icon?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image_url: string;
  affiliate_url: string;
  category_id?: number | null;
  category_name?: string;
  is_active?: number;
  created_at?: string;
  store_name?: string;
  badge?: string;
  rating?: number;
  review_count?: number;
  brand?: string;
  is_featured?: number;
  emi_available?: number;
  emi_starting_price?: number;
  flash_deal?: number;
  claimed_percentage?: number;
  price_history?: { month: string; price: number }[];
  specs?: Record<string, string>;
  pros?: string[];
  cons?: string[];
  delivery_info?: string;
  verdict?: string;
  product_type?: 'affiliate' | 'physical' | 'digital';
  digital_file_url?: string;
  digital_license_info?: string;
  seo_title?: string;
  seo_description?: string;
  variants?: ProductVariant[];
  scores?: ProductScore;
  store_offers?: StoreOffer[];
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author_name: string;
  category: string;
  tags?: string;
  read_time_minutes?: number;
  is_featured?: number;
  is_published?: number;
  views_count?: number;
  featured_product_ids?: string;
  seo_title?: string;
  seo_description?: string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  variant_name: string;
  price: number;
  original_price?: number;
  sku?: string;
  is_in_stock?: number;
  created_at?: string;
}

export interface ProductScore {
  product_id: number;
  display_score: number;
  performance_score: number;
  camera_score: number;
  battery_score: number;
  value_score: number;
  overall_score: number;
  verdict?: string;
  updated_at?: string;
}

export interface StoreOffer {
  id: number;
  product_id: number;
  store_name: string;
  price: number;
  store_url: string;
  badge?: string;
  in_stock?: number;
  delivery_time?: string;
  warranty_info?: string;
  created_at?: string;
}

export interface Review {
  id: number;
  product_id: number;
  product_name?: string;
  user_name: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface Coupon {
  id: number;
  code: string;
  description: string;
  discount_type: 'fixed' | 'percentage';
  discount_value: number;
  min_purchase: number;
  max_uses?: number | null;
  expires_at?: string | null;
  is_active: number;
}

export interface PriceAlert {
  id?: number;
  product_id: number;
  product_name?: string;
  email: string;
  target_price: number;
  current_price: number;
  created_at?: string;
}

export interface SiteSettings {
  site_title?: string;
  site_description?: string;
  site_logo?: string;
  site_favicon?: string;
  contact_email?: string;
  contact_phone?: string;
  whatsapp_number?: string;
  announcement_text?: string;
  announcement_active?: string;
  social_facebook?: string;
  social_twitter?: string;
  social_instagram?: string;
  homepage_html?: string;
  footer_html?: string;
  meta_keywords?: string;
  google_analytics_id?: string;
  flash_sale_enabled?: string;
  flash_sale_title?: string;
  flash_sale_ends?: string;
  emi_enabled?: string;
  currency_converter_enabled?: string;
  delivery_estimator_enabled?: string;
  comparison_enabled?: string;
  dark_mode_default?: string;
}

export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address?: string;
  city?: string;
  district?: string;
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  payment_method: 'cod' | 'esewa' | 'khalti' | 'fonepay' | 'bank_transfer';
  payment_status: 'pending' | 'paid' | 'failed';
  order_status: 'placed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  delivery_type: 'physical' | 'digital';
  digital_download_code?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Store {
  id: number;
  name: string;
  slug: string;
  logo_url?: string;
  website_url?: string;
  affiliate_url?: string;
  description?: string;
  rating: number;
  review_count: number;
  is_verified: number;
  location: string;
  delivery_coverage: string;
  return_policy: string;
  warranty_support: string;
  is_active: number;
  created_at?: string;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo_url?: string;
  description?: string;
  origin_country: string;
  warranty_service_center: string;
  is_featured: number;
  created_at?: string;
}

export interface OutboundClick {
  id?: number;
  product_id?: number;
  target_type: 'product' | 'store_offer' | 'coupon' | 'custom';
  store_name: string;
  target_url: string;
  referrer?: string;
  user_agent?: string;
  ip_country?: string;
  created_at?: string;
}
