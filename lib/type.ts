// lib/types.ts

// Matches your D1 schema for Products
export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  long_description_html: string | null;
  image_url: string;
  current_price: number;
  currency: string;
  brand: string | null;
  specifications_json: string | null; // Keep as string, parse on client
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
}

// Matches your D1 schema for Categories
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

// Matches your D1 schema for Reviews
export interface Review {
  id: string;
  product_id: string;
  title: string;
  body_html: string;
  rating: number;
  pros: string; // Is a JSON string array '["..."]'
  cons: string; // Is a JSON string array '["..."]'
  status: 'draft' | 'published';
}

// Matches your D1 schema for Links
export interface AffiliateLink {
  id: string;
  slug: string;
  product_id: string;
  destination_url: string;
  status: 'active' | 'inactive';
}

// The combined type your /api/public/products/slug/:slug endpoint should return
export interface ProductDetailsResponse {
  product: Product;
  review: Review | null;
  primary_link: AffiliateLink | null; // You MUST join and return this
}
