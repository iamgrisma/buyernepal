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
  price_history?: { month: string; price: number; recorded_at?: string }[];
  specs?: Record<string, string>;
  pros?: string[];
  cons?: string[];
  delivery_info?: string;
  verdict?: string;
  direct_sell?: number;
  product_type?: 'affiliate' | 'physical' | 'digital';
  digital_file_url?: string;
  digital_license_info?: string;
  seo_title?: string;
  seo_description?: string;
  votes_up?: number;
  votes_down?: number;
  temperature?: number;
  variants?: ProductVariant[];
  scores?: ProductScore;
  score_display?: number;
  score_performance?: number;
  score_camera?: number;
  score_battery?: number;
  score_value?: number;
  score_overall?: number;
  score_verdict?: string;
  store_offers?: StoreOffer[];
}

export interface PriceAlert {
  id?: number;
  product_id: number;
  email: string;
  target_price: number;
  current_price: number;
  is_active?: number;
  created_at?: string;
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
  focus_keyword?: string;
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
  is_approved?: number | boolean;
  created_at: string;
  helpful_count?: number;
  unhelpful_count?: number;
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
  store_name?: string;
  store_url?: string;
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
  flash_sale_subtitle?: string;
  flash_sale_ends?: string;
  emi_enabled?: string;
  currency_converter_enabled?: string;
  delivery_estimator_enabled?: string;
  comparison_enabled?: string;
  dark_mode_default?: string;

  // 1. Visual Theme & Layout
  theme_accent_color?: string;
  theme_font?: string;
  theme_container_width?: string;
  theme_border_radius?: string;
  sticky_header_enabled?: string;
  card_style?: 'modern' | 'bordered' | 'compact';
  catalog_default_view?: 'grid' | 'list' | 'table';

  // 2. Section Visibility Toggles (1 = show, 0 = hide)
  hero_enabled?: string;
  header_badges_enabled?: string;
  trust_strip_enabled?: string;
  coupons_section_enabled?: string;
  categories_section_enabled?: string;
  filter_bar_enabled?: string;
  catalog_section_enabled?: string;
  delivery_guide_section_enabled?: string;
  blog_section_enabled?: string;
  faq_section_enabled?: string;
  editorial_banner_enabled?: string;
  trending_section_enabled?: string;
  brands_strip_enabled?: string;
  newsletter_section_enabled?: string;
  top_charts_enabled?: string;

  // 3. Navigation Menu Manager
  menu_show_vehicles?: string;
  menu_show_deals?: string;
  menu_show_compare?: string;
  menu_show_charts?: string;
  menu_show_blog?: string;
  menu_show_coupons?: string;
  menu_show_stores?: string;
  menu_show_brands?: string;
  custom_nav_1_label?: string;
  custom_nav_1_url?: string;
  custom_nav_2_label?: string;
  custom_nav_2_url?: string;
  custom_nav_3_label?: string;
  custom_nav_3_url?: string;

  // 4. Header Badges Microcopy (3 pills on right of nav strip)
  nav_highlight_1?: string;
  nav_highlight_2?: string;
  nav_highlight_3?: string;

  // 5. Hero Microcopy & Stats
  hero_eyebrow?: string;
  hero_headline_line1?: string;
  hero_headline_line2?: string;
  hero_subtitle?: string;
  hero_tags?: string;
  hero_point_1?: string;
  hero_point_2?: string;
  hero_point_3?: string;
  hero_point_4?: string;
  hero_stat1_num?: string;
  hero_stat1_lbl?: string;
  hero_stat2_num?: string;
  hero_stat2_lbl?: string;
  hero_stat3_num?: string;
  hero_stat3_lbl?: string;

  // 6. Trust Strip Microcopy (4 cards)
  trust_item1_icon?: string;
  trust_item1_title?: string;
  trust_item1_desc?: string;
  trust_item2_icon?: string;
  trust_item2_title?: string;
  trust_item2_desc?: string;
  trust_item3_icon?: string;
  trust_item3_title?: string;
  trust_item3_desc?: string;
  trust_item4_icon?: string;
  trust_item4_title?: string;
  trust_item4_desc?: string;

  // 7. Categories & Catalog Headings
  categories_kicker?: string;
  categories_title?: string;
  catalog_kicker?: string;
  catalog_title?: string;

  // 8. Editorial Banner & FAQ Microcopy
  editorial_banner_kicker?: string;
  editorial_banner_title?: string;
  editorial_banner_text?: string;
  faq_kicker?: string;
  faq_title?: string;

  // 9. REHub Single Product Page Controls
  product_scores_enabled?: string;
  product_emi_calculator_enabled?: string;
  product_price_history_enabled?: string;
  product_reviews_enabled?: string;
  whatsapp_chat_enabled?: string;
  affiliate_cloaking_prefix?: string;

  // 10. Footer, Custom Code & Disclosures
  footer_about_text?: string;
  footer_disclosure_text?: string;
  copyright_text?: string;
  custom_css?: string;
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

export interface Vehicle {
  id: number;
  name: string;
  slug: string;
  brand: string;
  vehicle_type: 'car' | 'suv' | 'hatchback' | 'sedan' | 'bike' | 'scooter' | 'pickup';
  fuel_type: 'ev' | 'petrol' | 'diesel' | 'hybrid';
  price_npr: number;
  original_price_npr?: number;
  badge?: string;
  image_url: string;
  gallery_images?: string[];
  distributor_nepal: string;
  showroom_location?: string;
  warranty_battery?: string;
  warranty_vehicle?: string;
  battery_capacity_kwh?: number;
  range_km?: number;
  motor_power_kw?: number;
  motor_torque_nm?: number;
  top_speed_kmh?: number;
  acceleration_0_100?: number;
  charging_time_dc_fast?: string;
  charging_time_ac_home?: string;
  charging_port?: string;
  engine_displacement_cc?: number;
  transmission?: string;
  fuel_economy_kmpl?: number;
  fuel_tank_liters?: number;
  ground_clearance_mm: number;
  seating_capacity: number;
  boot_space_liters?: number;
  airbags_count?: number;
  ncap_rating?: string;
  annual_road_tax_npr?: number;
  verdict_nepal: string;
  pros?: string[];
  cons?: string[];
  rating: number;
  score_overall: number;
  scores?: {
    range_efficiency?: number;
    performance?: number;
    ground_clearance?: number;
    nepal_value?: number;
    charging_network?: number;
  };
  auto_loan_min_downpayment_npr?: number;
  auto_loan_est_monthly_emi?: number;
  test_drive_url?: string;
  brochure_url?: string;
  is_featured?: number;
  is_active: number;
  created_at?: string;
}

export interface VehicleInquiry {
  id: number;
  vehicle_id: number;
  vehicle_name: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  city: string;
  inquiry_type: 'test_drive' | 'price_quote' | 'bank_loan_assist' | 'exchange';
  preferred_date?: string;
  message?: string;
  status: 'new' | 'contacted' | 'test_drive_scheduled' | 'closed';
  created_at: string;
}

export interface VehicleCuratedCollection {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  icon: string;
  filter_fuel?: string;
  filter_type?: string;
  max_price?: number;
  min_price?: number;
  min_range?: number;
  min_ground_clearance?: number;
  description: string;
}

