export interface Env {
  DB?: D1Database;
  ASSETS?: Fetcher;
}

export interface Session {
  user_id: number;
  username: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  expires_at: string;
  is_active: number;
}

export interface User {
  id: number;
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
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  affiliate_url: string;
  category_id?: number | null;
  category_name?: string;
  is_active?: number;
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

export interface SiteSettings {
  site_title?: string;
  site_description?: string;
  site_logo?: string;
  site_favicon?: string;
  contact_email?: string;
  social_facebook?: string;
  social_twitter?: string;
  social_instagram?: string;
  homepage_html?: string;
  footer_html?: string;
  meta_keywords?: string;
  google_analytics_id?: string;
}
