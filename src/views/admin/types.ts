import { Category, Product, Review, SiteSettings, User, Coupon, Article, Order, Store, Brand } from '../../types';

export interface AdminUserSession {
  id: number | string;
  username: string;
  email: string;
  role: string;
}

export interface AdminStats {
  products: number;
  categories: number;
  users: number;
  pendingReviews: number;
  activeCoupons: number;
  articles?: number;
  orders?: number;
}

export interface AdminNotice {
  type: 'success' | 'error';
  message: string;
}

export interface AdminDashboardProps {
  currentUser: AdminUserSession;
  stats: AdminStats;
  products: Product[];
  categories: Category[];
  users: User[];
  reviews: Review[];
  coupons: Coupon[];
  articles?: Article[];
  orders?: Order[];
  outboundClicks?: any[];
  stores?: Store[];
  brands?: Brand[];
  settings: SiteSettings;
  activeTab?: string;
  notice?: AdminNotice;
}
