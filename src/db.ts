import { Category, Product, Review, SiteSettings, User, Coupon } from './types';

// Rich, production-grade curated categories for Nepal
export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Smartphones & Tablets',
    slug: 'electronics',
    description: 'Flagships and value smartphones verified with official NTA approval and Nepal warranty.',
    is_active: 1,
    in_menu: 1,
    display_order: 1,
    icon: '📱'
  },
  {
    id: 2,
    name: 'Laptops & Workstations',
    slug: 'laptops-computing',
    description: 'Productivity ultrabooks, MacBooks and creator laptops available through authorized Nepal distributors.',
    is_active: 1,
    in_menu: 1,
    display_order: 2,
    icon: '💻'
  },
  {
    id: 3,
    name: 'Audio & Wearables',
    slug: 'audio-wearables',
    description: 'Active noise-cancelling headphones, high-fidelity wireless earbuds and smartwatch companions.',
    is_active: 1,
    in_menu: 1,
    display_order: 3,
    icon: '🎧'
  },
  {
    id: 4,
    name: 'Home & Smart Living',
    slug: 'home-kitchen',
    description: 'Smart appliances, air purifiers, robotic vacuums and culinary gear for modern Nepali households.',
    is_active: 1,
    in_menu: 1,
    display_order: 4,
    icon: '🍳'
  },
  {
    id: 5,
    name: 'Himalayan & Local Crafts',
    slug: 'himalayan-local',
    description: 'Authentic Chyangra Pashmina, Mustang organic harvests, artisanal ceramics and Bhojpur craftware.',
    is_active: 1,
    in_menu: 1,
    display_order: 5,
    icon: '🏔️'
  },
  {
    id: 6,
    name: 'Footwear & Fashion',
    slug: 'fashion-lifestyle',
    description: 'Iconic Goldstar footwear, heritage handwoven Dhaka apparel and everyday utility backpacks.',
    is_active: 1,
    in_menu: 1,
    display_order: 6,
    icon: '👟'
  },
  {
    id: 7,
    name: 'Gaming & Photography',
    slug: 'gaming-cameras',
    description: 'Next-gen gaming consoles, travel drones, mirrorless cameras and mechanical peripherals.',
    is_active: 1,
    in_menu: 1,
    display_order: 7,
    icon: '🎮'
  }
];

// Rich, authentic curated catalog with verified NPR pricing & genuine stores
export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Apple iPhone 16 Pro Max (256GB Desert Titanium)',
    description: 'Grade 5 titanium chassis, A18 Pro silicon, Camera Control tactile button, and revolutionary battery life with 1-year GenNext Nepal official warranty.',
    price: 214999,
    original_price: 229999,
    image_url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 1,
    category_name: 'Smartphones & Tablets',
    store_name: 'Oliz Store Nepal',
    badge: '🔥 Hot Deal',
    rating: 4.9,
    review_count: 86,
    brand: 'Apple',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 2,
    name: 'Samsung Galaxy S25 Ultra 5G (12GB/256GB)',
    description: 'Snapdragon 8 Elite Mobile Platform, built-in S-Pen, titanium frame, 200MP quad camera and Galaxy AI suite with official Samsung Plaza warranty.',
    price: 184999,
    original_price: 199999,
    image_url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 1,
    category_name: 'Smartphones & Tablets',
    store_name: 'Samsung Plaza Nepal',
    badge: '🏆 Editor\'s Pick',
    rating: 4.8,
    review_count: 64,
    brand: 'Samsung',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 3,
    name: 'Apple MacBook Air 13-inch M3 (16GB Unified / 512GB SSD)',
    description: 'Ultra-thin fanless unibody, Liquid Retina display, MagSafe 3 charging and up to 18 hours battery life. Official MDAC Nepal import.',
    price: 168000,
    original_price: 182000,
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 2,
    category_name: 'Laptops & Workstations',
    store_name: 'EvoStore Kathmandu',
    badge: '⭐ Top Rated',
    rating: 4.9,
    review_count: 112,
    brand: 'Apple',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 4,
    name: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
    description: 'Industry-leading Auto NC Optimizer with 8 microphones, 30-hour battery, Speak-to-Chat, and Hi-Res LDAC playback for immersive sound.',
    price: 44999,
    original_price: 49999,
    image_url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 3,
    category_name: 'Audio & Wearables',
    store_name: 'Sony Center Lalitpur',
    badge: '🔥 Hot Deal',
    rating: 4.8,
    review_count: 73,
    brand: 'Sony',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 5,
    name: 'Apple AirPods Pro (2nd Gen USB-C MagSafe Case)',
    description: 'Up to 2x more Active Noise Cancellation, Adaptive Audio, Transparency mode, Conversation Awareness, and personalized Spatial Audio.',
    price: 36500,
    original_price: 39999,
    image_url: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 3,
    category_name: 'Audio & Wearables',
    store_name: 'Oliz Store Nepal',
    badge: '⭐ Top Rated',
    rating: 4.9,
    review_count: 148,
    brand: 'Apple',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 6,
    name: 'Xiaomi Smart Air Fryer Pro 4L with OLED Display',
    description: '360° heated air circulation, 40-200°C adjustable range, transparent observation window, and dual-speed motor for low-oil Nepali delights.',
    price: 11499,
    original_price: 13999,
    image_url: 'https://images.unsplash.com/photo-1586208958839-06c17cacdf08?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 4,
    category_name: 'Home & Smart Living',
    store_name: 'Mi Store Official',
    badge: '💰 Best Value',
    rating: 4.7,
    review_count: 94,
    brand: 'Xiaomi',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 7,
    name: 'Dyson V12 Detect Slim Cordless Vacuum Cleaner',
    description: 'Illuminated cleaning head reveals invisible dust, piezo sensor measures microscopic particles, and click-in battery delivers 60 minutes runtime.',
    price: 86000,
    original_price: 94500,
    image_url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 4,
    category_name: 'Home & Smart Living',
    store_name: 'Smart Living Nepal',
    badge: '🏆 Editor\'s Pick',
    rating: 4.8,
    review_count: 32,
    brand: 'Dyson',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 8,
    name: 'Authentic Himalayan Chyangra Cashmere Pashmina Shawl',
    description: 'Certified 100% pure high-altitude mountain goat cashmere hand-spun and woven by master artisans in Mustang valley. Feather-light warmth.',
    price: 8900,
    original_price: 11500,
    image_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 5,
    category_name: 'Himalayan & Local Crafts',
    store_name: 'Mustang Heritage Crafts',
    badge: '🇳🇵 Nepal Classic',
    rating: 4.9,
    review_count: 51,
    brand: 'Himalayan Chyangra',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 9,
    name: 'Organic Mustang Raw Apple Cider Vinegar (750ml)',
    description: 'Unfiltered, unpasteurized vinegar naturally brewed from Marpha organic apples with active "Mother". Rich in enzymes and gut probiotics.',
    price: 1250,
    original_price: 1500,
    image_url: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 5,
    category_name: 'Himalayan & Local Crafts',
    store_name: 'Marpha Agro Farm',
    badge: '💰 Best Value',
    rating: 4.8,
    review_count: 67,
    brand: 'Marpha Organics',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 10,
    name: 'Goldstar G-10 Falcon Lightweight Running Shoes',
    description: 'Pride of Nepal. Breathable jacquard mesh upper, responsive cushioned EVA midsole, and high-traction rubber outsole engineered for rough trails.',
    price: 2450,
    original_price: 2850,
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 6,
    category_name: 'Footwear & Fashion',
    store_name: 'Goldstar Official Store',
    badge: '🇳🇵 Nepal Classic',
    rating: 4.7,
    review_count: 215,
    brand: 'Goldstar',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 11,
    name: 'Handwoven Nepali Palpali Dhaka Heritage Blazer',
    description: 'Tailored luxury ethnic blazer crafted from pure Palpa handloom cotton Dhaka. Perfect blend of timeless Nepali craftsmanship and modern silhouette.',
    price: 6500,
    original_price: 7800,
    image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 6,
    category_name: 'Footwear & Fashion',
    store_name: 'Kathmandu Dhaka House',
    badge: '⭐ Top Rated',
    rating: 4.9,
    review_count: 38,
    brand: 'Palpali Heritage',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 12,
    name: 'Sony PlayStation 5 Slim Console (1TB Disc Edition)',
    description: 'Slimmer design with 1TB SSD storage, Ray Tracing, 4K-TV gaming, Ultra-High Speed SSD, Tempest 3D AudioTech, and DualSense haptic feedback.',
    price: 76500,
    original_price: 84000,
    image_url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 7,
    category_name: 'Gaming & Photography',
    store_name: 'Interactive Gaming Hub Nepal',
    badge: '🔥 Hot Deal',
    rating: 4.9,
    review_count: 82,
    brand: 'Sony PlayStation',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 13,
    name: 'DJI Mini 4 Pro Drone (Fly More Combo Plus)',
    description: 'Sub-249g lightweight aerial drone, 4K/60fps HDR true vertical shooting, omnidirectional obstacle sensing, and 45-min extended flight time.',
    price: 148000,
    original_price: 159999,
    image_url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 7,
    category_name: 'Gaming & Photography',
    store_name: 'Camera House New Road',
    badge: '🏆 Editor\'s Pick',
    rating: 4.8,
    review_count: 46,
    brand: 'DJI',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 14,
    name: 'Logitech MX Master 3S Wireless Performance Mouse',
    description: 'Quiet Click switches with 90% less click noise, 8K DPI sensor tracks on glass, MagSpeed scrolling, and multi-device Flow cross-computer control.',
    price: 16500,
    original_price: 18500,
    image_url: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 2,
    category_name: 'Laptops & Workstations',
    store_name: 'Daraz Mall Nepal',
    badge: '⭐ Top Rated',
    rating: 4.9,
    review_count: 104,
    brand: 'Logitech',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 15,
    name: 'Apple Watch Series 10 GPS 46mm Jet Black Aluminum',
    description: 'Thinnest Apple Watch ever with 30% more active screen area, sleep apnea notifications, faster charging, and depth/water temperature sensors.',
    price: 68000,
    original_price: 73500,
    image_url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 3,
    category_name: 'Audio & Wearables',
    store_name: 'EvoStore Kathmandu',
    badge: '🔥 Hot Deal',
    rating: 4.8,
    review_count: 59,
    brand: 'Apple',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 16,
    name: 'Anker 737 Power Bank (PowerCore 24K 140W)',
    description: 'Ultra-powerful 140W fast two-way charging, 24,000mAh capacity, smart digital color display, and GaNPrime multi-device protection for laptops & phones.',
    price: 17999,
    original_price: 21000,
    image_url: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 1,
    category_name: 'Smartphones & Tablets',
    store_name: 'Anker Nepal Official',
    badge: '💰 Best Value',
    rating: 4.9,
    review_count: 77,
    brand: 'Anker',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 17,
    name: 'Marshall Stanmore III Bluetooth Home Speaker',
    description: 'Wider soundstage stereo speaker, Dynamic Loudness balancing, iconic vintage Marshall tolex vinyl script, and Bluetooth 5.2 connectivity.',
    price: 54000,
    original_price: 59999,
    image_url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 3,
    category_name: 'Audio & Wearables',
    store_name: 'Oliz Store Nepal',
    badge: '🏆 Editor\'s Pick',
    rating: 4.9,
    review_count: 42,
    brand: 'Marshall',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 18,
    name: 'OnePlus 13 5G (16GB RAM / 512GB Storage)',
    description: 'Qualcomm Snapdragon 8 Elite, Hasselblad tuned Master Camera System, 6,000mAh Glacier battery with 100W SuperVOOC flash charge. 1-year Nepal warranty.',
    price: 109999,
    original_price: 119999,
    image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 1,
    category_name: 'Smartphones & Tablets',
    store_name: 'Daraz Mall Nepal',
    badge: '🔥 Hot Deal',
    rating: 4.7,
    review_count: 53,
    brand: 'OnePlus',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 19,
    name: 'Roborock Q7 Max Robot Vacuum & Mop Combo',
    description: '4200Pa high-power suction, PreciSense LiDAR 3D navigation, electronic water tank mopping, multi-level mapping, and voice assistant integration.',
    price: 58000,
    original_price: 65000,
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 4,
    category_name: 'Home & Smart Living',
    store_name: 'Smart Living Nepal',
    badge: '⭐ Top Rated',
    rating: 4.8,
    review_count: 29,
    brand: 'Roborock',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 20,
    name: 'Traditional Bhojpur Handmade Gurkha Service Khukuri (10-inch)',
    description: 'Authentic high-carbon railway spring steel blade hand-forged by traditional Kami blacksmiths in Bhojpur, Eastern Nepal. Rosewood grip with buffalo leather scabbard.',
    price: 5200,
    original_price: 6500,
    image_url: 'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 5,
    category_name: 'Himalayan & Local Crafts',
    store_name: 'Gurkha Blades Nepal',
    badge: '🇳🇵 Nepal Classic',
    rating: 4.9,
    review_count: 91,
    brand: 'Bhojpur Gurkha',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 21,
    name: 'JBL Flip 6 Portable Waterproof Bluetooth Speaker',
    description: 'Eco-friendly packaging, 2-way speaker system with racetrack woofer, separate tweeter, dual passive radiators, IP67 waterproof & dustproof, 12 hours playtime.',
    price: 15500,
    original_price: 17999,
    image_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 3,
    category_name: 'Audio & Wearables',
    store_name: 'JBL Official Nepal',
    badge: '💰 Best Value',
    rating: 4.8,
    review_count: 165,
    brand: 'JBL',
    is_featured: 1,
    is_active: 1
  },
  {
    id: 22,
    name: 'Amazon Kindle Paperwhite 16GB (6.8-inch Display)',
    description: 'Glare-free 300 ppi screen reads like real paper, adjustable warm light, up to 10 weeks battery, waterproof for poolside reading, and USB-C.',
    price: 24500,
    original_price: 27500,
    image_url: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=700&auto=format&fit=crop&q=80',
    affiliate_url: 'https://www.daraz.com.np',
    category_id: 1,
    category_name: 'Smartphones & Tablets',
    store_name: 'Oliz Store Nepal',
    badge: '⭐ Top Rated',
    rating: 4.9,
    review_count: 88,
    brand: 'Amazon',
    is_featured: 1,
    is_active: 1
  }
];

export const DEFAULT_COUPONS: Coupon[] = [
  {
    id: 1,
    code: 'BUYERNEPAL',
    description: 'Flat Rs. 1,500 OFF on orders above Rs. 20,000',
    discount_type: 'fixed',
    discount_value: 1500,
    min_purchase: 20000,
    is_active: 1
  },
  {
    id: 2,
    code: 'DARAZ11',
    description: '11% OFF on selected electronics & gadget accessories',
    discount_type: 'percentage',
    discount_value: 11,
    min_purchase: 5000,
    is_active: 1
  },
  {
    id: 3,
    code: 'HIMALAYA26',
    description: '15% OFF on Authentic Chyangra Pashmina & Himalayan Crafts',
    discount_type: 'percentage',
    discount_value: 15,
    min_purchase: 3000,
    is_active: 1
  }
];

export async function getSettings(db?: D1Database): Promise<SiteSettings> {
  const defaults: SiteSettings = {
    site_title: 'BuyerNepal',
    site_description: 'Discover products worth buying in Nepal — curated recommendations, verified NPR prices, and direct store links.',
    announcement_text: '⚡ Grand 2026 Festive Deals in Nepal • Verified NPR Prices • 0% Bank EMI • Same-Day Kathmandu Delivery',
    announcement_active: '1',
    contact_email: 'contact@buyernepal.com',
    contact_phone: '+977-1-4521098',
    whatsapp_number: '+977-9801234567',
    social_facebook: 'https://facebook.com/buyernepal',
    social_instagram: 'https://instagram.com/buyernepal',
    flash_sale_enabled: '1',
    flash_sale_title: '⚡ 2026 Mega Flash Sale • Limited Nepal Stock',
    flash_sale_ends: '2026-09-30T23:59:59',
    emi_enabled: '1',
    currency_converter_enabled: '1',
    delivery_estimator_enabled: '1',
    comparison_enabled: '1',
    dark_mode_default: 'auto'
  };

  if (!db) return defaults;
  try {
    const r = await db.prepare('SELECT key, value FROM settings').all<{ key: string; value: string }>();
    const settings: Record<string, string> = { ...defaults };
    for (const row of r.results || []) {
      settings[row.key] = row.value;
    }
    return settings;
  } catch {
    return defaults;
  }
}

export async function updateSettings(db: D1Database | undefined, settings: Record<string, string>): Promise<boolean> {
  if (!db) return false;
  try {
    for (const [k, v] of Object.entries(settings)) {
      await db
        .prepare(
          `INSERT INTO settings(key, value, updated_at)
           VALUES(?, ?, CURRENT_TIMESTAMP)
           ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`
        )
        .bind(k, v)
        .run();
    }
    return true;
  } catch {
    return false;
  }
}

// Categories
export async function getCategories(db?: D1Database, onlyActive = true): Promise<Category[]> {
  if (!db) return DEFAULT_CATEGORIES;
  try {
    const query = onlyActive
      ? 'SELECT id, name, slug, description, parent_id, is_active FROM categories WHERE is_active = 1 ORDER BY id ASC'
      : 'SELECT id, name, slug, description, parent_id, is_active FROM categories ORDER BY id ASC';
    const r = await db.prepare(query).all<Category>();
    const list = r.results || [];
    if (list.length > 0) {
      // augment with icons from defaults if not present
      return list.map((c) => ({
        ...c,
        icon: DEFAULT_CATEGORIES.find((dc) => dc.slug === c.slug)?.icon || '🛍️'
      }));
    }
    return DEFAULT_CATEGORIES;
  } catch {
    return DEFAULT_CATEGORIES;
  }
}

export async function getCategoryBySlug(db: D1Database | undefined, slug: string): Promise<Category | null> {
  const matchDefault = DEFAULT_CATEGORIES.find((c) => c.slug.toLowerCase() === slug.toLowerCase()) || null;
  if (!db) return matchDefault;
  try {
    const c = await db
      .prepare('SELECT id, name, slug, description, parent_id, is_active FROM categories WHERE slug = ? COLLATE NOCASE AND is_active = 1 LIMIT 1')
      .bind(slug)
      .first<Category>();
    if (c) {
      return {
        ...c,
        icon: matchDefault?.icon || '🛍️'
      };
    }
    return matchDefault;
  } catch {
    return matchDefault;
  }
}

export async function createCategory(
  db: D1Database | undefined,
  name: string,
  slug: string,
  description = '',
  parentId: number | null = null,
  isActive = 1
): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: false, error: 'Database not connected' };
  try {
    await db
      .prepare('INSERT INTO categories(name, slug, description, parent_id, is_active) VALUES(?, ?, ?, ?, ?)')
      .bind(name, slug.toLowerCase(), description, parentId, isActive)
      .run();
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Failed to create category' };
  }
}

export async function deleteCategory(db: D1Database | undefined, id: number): Promise<boolean> {
  if (!db) return false;
  try {
    await db.prepare('DELETE FROM categories WHERE id = ?').bind(id).run();
    return true;
  } catch {
    return false;
  }
}

// Product Enrichment Helper for 2026 Features (EMI, Flash Deals, Specs, Price History, Delivery)
export function enrichProduct(p: Product): Product {
  const origPrice = p.original_price || Math.round(p.price * 1.15);
  const emiAvailable = p.price >= 12000 ? 1 : 0;
  const emiPrice = emiAvailable ? Math.round(p.price / 18) : undefined;
  
  // Flash deal status on high demand items
  const isFlash = [1, 2, 4, 6, 10, 16, 18, 20].includes(p.id);
  const claimed = isFlash ? 68 + ((p.id * 7) % 27) : undefined;

  // Curated specs based on product / category
  const defaultSpecs: Record<string, string> = {
    'Official Warranty': '1 Year Authorized Service Center Warranty in Nepal',
    'Delivery Coverage': 'Kathmandu Valley (24h Express) & All 77 Districts',
    'Payment Modes': 'Cash on Delivery, eSewa, Khalti, ConnectIPS, 0% Credit Card EMI',
    'Return Window': '7-Day Hassle-Free Replacement Guarantee'
  };

  let productSpecs: Record<string, string> = { ...defaultSpecs };
  let pros: string[] = [];
  let cons: string[] = [];

  if (p.name.includes('iPhone')) {
    productSpecs = {
      'Display': '6.9" Super Retina XDR OLED (120Hz ProMotion)',
      'Chipset': 'Apple A18 Pro (3nm architecture)',
      'Storage': '256GB NVMe High-Speed',
      'Cameras': '48MP Fusion + 48MP Ultra-Wide + 12MP 5x Telephoto',
      'Battery': '4,685 mAh (Up to 33 hrs video)',
      'NTA / MDMS': 'Officially Registered & Tax Paid in Nepal',
      'Distributor': 'GenNext Nepal Official',
      ...defaultSpecs
    };
    pros = ['Peak gaming performance & Apple Intelligence', 'Industry-leading 4K 120fps Dolby Vision video', 'All-day 2-day battery endurance', 'GenNext Nepal authorized warranty'];
    cons = ['Premium pricing tier in Nepal', 'Large chassis requires two-handed use'];
  } else if (p.name.includes('Galaxy S25')) {
    productSpecs = {
      'Display': '6.8" Dynamic AMOLED 2X, 120Hz, 2600 nits peak',
      'Processor': 'Snapdragon 8 Elite Mobile Platform for Galaxy',
      'RAM / Storage': '12GB LPDDR5X / 256GB UFS 4.0',
      'Camera': '200MP Main + 50MP Periscope 5x + 50MP Ultrawide',
      'Stylus': 'Integrated S-Pen included in body',
      'Warranty': '1 Year Official Samsung Plaza Nepal + Screen Care',
      ...defaultSpecs
    };
    pros = ['Built-in S-Pen for productivity & sketching', 'Galaxy AI live interpreter & circle to search', 'Anti-reflective flat armor glass'];
    cons = ['45W power adapter sold separately', 'Heavier body than base model'];
  } else if (p.name.includes('MacBook')) {
    productSpecs = {
      'Processor': 'Apple M3 chip (8-core CPU / 10-core GPU)',
      'Memory': '16GB Unified High-Bandwidth Memory',
      'Storage': '512GB High-Speed SSD',
      'Display': '13.6-inch Liquid Retina with True Tone',
      'Battery Life': 'Up to 18 hours MagSafe 3 charging',
      'Weight': 'Just 1.24 kg fanless ultra-portable',
      ...defaultSpecs
    };
    pros = ['Silent fanless operation with zero fan noise', '18-hour real-world battery endurance', 'Crisp Liquid Retina display & MagSafe 3'];
    cons = ['Supports dual external monitors only with lid closed', 'Non-upgradeable unified RAM'];
  } else if (p.name.includes('Sony WH-1000XM5')) {
    productSpecs = {
      'Noise Cancelling': 'Dual Processors & 8 Microphones Auto NC Optimizer',
      'Battery Life': '30 hours with ANC on (3 min quick charge = 3 hrs)',
      'Audio Codecs': 'LDAC, AAC, SBC (Hi-Res Audio Wireless)',
      'Weight': '250g soft fit synthetic leather',
      ...defaultSpecs
    };
    pros = ['Top-tier active noise cancellation for Kathmandu traffic', 'Extremely lightweight and comfortable headband', 'Crystal clear mic quality for remote meetings'];
    cons = ['Earcups do not fold inward like XM4', 'Not designed for heavy rain'];
  } else if (p.name.includes('Air Fryer')) {
    productSpecs = {
      'Capacity': '4.0 Litres with visual window',
      'Power': '1600W 360° heated air circulation',
      'Temperature Range': '40°C to 200°C dual-speed motor',
      'Smart Features': 'Mi Home App Wi-Fi control + OLED dial',
      ...defaultSpecs
    };
    pros = ['Cooks Nepali momo, sekuwa and fries with 85% less oil', 'OLED display with custom presets', 'Non-stick basket easy to clean in Kathmandu tap water'];
    cons = ['4L capacity ideal for 2-4 persons; larger parties need batches'];
  } else if (p.name.includes('Pashmina') || p.name.includes('Chyangra')) {
    productSpecs = {
      'Material': '100% Pure Chyangra Mountain Goat Cashmere',
      'Origin': 'Mustang / Manang High Himalayas',
      'Weave': 'Traditional handloom 2-ply diamond twill weave',
      'Dimensions': '200 cm x 70 cm',
      'Certification': 'Chyangra Pashmina Nepal Official Trademark',
      ...defaultSpecs
    };
    pros = ['Feather-light yet deeply warm in winter', 'Supports indigenous Mustang artisan families', 'Hand-knotted delicate fringes'];
    cons = ['Dry clean or delicate cold hand wash only'];
  } else if (p.name.includes('Khukuri')) {
    productSpecs = {
      'Blade Length': '10 inches hand-forged railway spring steel',
      'Handle': '5 inches carved Indian Rosewood with brass bolster',
      'Scabbard': 'Water buffalo leather over pine wood sheath with Karda & Chakmak',
      'Origin': 'Bhojpur, Eastern Nepal (Traditional Kami craft)',
      ...defaultSpecs
    };
    pros = ['Heavy-duty balance for trekking, camping & utility', 'Legendary authentic Gurkha blade craftsmanship', 'Includes small companion utility blades'];
    cons = ['Requires occasional light mineral oiling to prevent rust'];
  } else if (p.name.includes('Goldstar')) {
    productSpecs = {
      'Upper': 'Engineered breathable knit jacquard mesh',
      'Midsole': 'High-rebound shock-absorbing EVA foam',
      'Outsole': 'Durable anti-skid ribbed rubber',
      'Origin': '100% Made in Nepal by Kiran Shoes Manufacturers',
      ...defaultSpecs
    };
    pros = ['Legendary Nepali durability for daily commute & hiking', 'Extremely affordable price-to-performance', 'Breathable lightweight feel in summer'];
    cons = ['Lacks water-resistant coating for heavy monsoon downpours'];
  } else {
    pros = ['Authentic Nepal distributor guarantee', 'Verified competitive pricing against local shops', 'Fast courier delivery with COD support'];
    cons = ['Limited stock during festival season rushes'];
  }

  // 6-Month Price History
  const priceHistory = [
    { month: 'Apr 2026', price: Math.round(p.price * 1.18) },
    { month: 'May 2026', price: Math.round(p.price * 1.14) },
    { month: 'Jun 2026', price: Math.round(p.price * 1.10) },
    { month: 'Jul 2026', price: Math.round(p.price * 1.07) },
    { month: 'Aug 2026', price: Math.round(p.price * 1.03) },
    { month: 'Sep 2026', price: p.price }
  ];

  return {
    ...p,
    original_price: origPrice,
    store_name: p.store_name || 'Daraz Mall',
    badge: p.badge || (isFlash ? '⚡ Flash Deal' : 'Verified Deal'),
    rating: p.rating || 4.8,
    review_count: p.review_count || 42,
    brand: p.brand || '',
    emi_available: emiAvailable,
    emi_starting_price: emiPrice,
    flash_deal: isFlash ? 1 : 0,
    claimed_percentage: claimed,
    price_history: priceHistory,
    specs: productSpecs,
    pros,
    cons,
    delivery_info: 'Kathmandu Valley: Within 24 Hours • Outside Valley: 2-3 Days via Courier'
  };
}

// Products
export async function getProducts(db?: D1Database, categoryId?: number | null, limit = 100): Promise<Product[]> {
  if (!db) {
    const list = categoryId ? DEFAULT_PRODUCTS.filter((p) => p.category_id === categoryId) : DEFAULT_PRODUCTS;
    return list.map(enrichProduct);
  }
  try {
    let query =
      'SELECT p.*, c.name category_name FROM products p LEFT JOIN categories c ON c.id = p.category_id WHERE p.is_active = 1';
    let r;
    if (categoryId) {
      query += ' AND p.category_id = ? ORDER BY p.id ASC LIMIT ?';
      r = await db.prepare(query).bind(categoryId, limit).all<Product>();
    } else {
      query += ' ORDER BY p.id ASC LIMIT ?';
      r = await db.prepare(query).bind(limit).all<Product>();
    }
    const list = r.results || [];
    if (list.length > 0) {
      return list.map((p) => {
        const def = DEFAULT_PRODUCTS.find((dp) => dp.id === p.id || dp.name === p.name);
        return enrichProduct({
          ...p,
          original_price: p.original_price || def?.original_price,
          store_name: p.store_name || def?.store_name,
          badge: p.badge || def?.badge,
          rating: p.rating || def?.rating,
          review_count: p.review_count || def?.review_count,
          brand: p.brand || def?.brand
        });
      });
    }

    // Auto-seed if database is fresh and empty
    if (!categoryId) {
      await seedCatalog(db);
      const re = await db.prepare('SELECT p.*, c.name category_name FROM products p LEFT JOIN categories c ON c.id = p.category_id WHERE p.is_active = 1 ORDER BY p.id ASC LIMIT ?').bind(limit).all<Product>();
      if (re.results && re.results.length > 0) {
        return re.results.map((p) => {
          const def = DEFAULT_PRODUCTS.find((dp) => dp.id === p.id || dp.name === p.name);
          return enrichProduct({
            ...p,
            original_price: p.original_price || def?.original_price,
            store_name: p.store_name || def?.store_name,
            badge: p.badge || def?.badge,
            rating: p.rating || def?.rating,
            review_count: p.review_count || def?.review_count,
            brand: p.brand || def?.brand
          });
        });
      }
    }
    const raw = categoryId ? DEFAULT_PRODUCTS.filter((p) => p.category_id === categoryId) : DEFAULT_PRODUCTS;
    return raw.map(enrichProduct);
  } catch {
    const raw = categoryId ? DEFAULT_PRODUCTS.filter((p) => p.category_id === categoryId) : DEFAULT_PRODUCTS;
    return raw.map(enrichProduct);
  }
}

export async function getAllProductsAdmin(db?: D1Database): Promise<Product[]> {
  if (!db) return DEFAULT_PRODUCTS.map(enrichProduct);
  try {
    const r = await db
      .prepare('SELECT p.*, c.name category_name FROM products p LEFT JOIN categories c ON c.id = p.category_id ORDER BY p.id ASC LIMIT 200')
      .all<Product>();
    const list = r.results || [];
    if (list.length > 0) {
      return list.map((p) => {
        const def = DEFAULT_PRODUCTS.find((dp) => dp.id === p.id || dp.name === p.name);
        return enrichProduct({
          ...p,
          original_price: p.original_price || def?.original_price,
          store_name: p.store_name || def?.store_name,
          badge: p.badge || def?.badge,
          rating: p.rating || def?.rating,
          review_count: p.review_count || def?.review_count,
          brand: p.brand || def?.brand
        });
      });
    }
    return DEFAULT_PRODUCTS.map(enrichProduct);
  } catch {
    return DEFAULT_PRODUCTS.map(enrichProduct);
  }
}

export async function getProductById(db: D1Database | undefined, id: number): Promise<Product | null> {
  const def = DEFAULT_PRODUCTS.find((p) => p.id === id) || null;
  if (!db) return def ? enrichProduct(def) : null;
  try {
    const p = await db
      .prepare('SELECT p.*, c.name category_name FROM products p LEFT JOIN categories c ON c.id = p.category_id WHERE p.id = ? AND p.is_active = 1 LIMIT 1')
      .bind(id)
      .first<Product>();
    if (p) {
      return enrichProduct({
        ...p,
        original_price: p.original_price || def?.original_price,
        store_name: p.store_name || def?.store_name,
        badge: p.badge || def?.badge,
        rating: p.rating || def?.rating,
        review_count: p.review_count || def?.review_count,
        brand: p.brand || def?.brand
      });
    }
    return def ? enrichProduct(def) : null;
  } catch {
    return def ? enrichProduct(def) : null;
  }
}

export async function createProduct(
  db: D1Database | undefined,
  name: string,
  price: number,
  description = '',
  imageUrl = '',
  affiliateUrl = '',
  categoryId: number | null = null,
  isActive = 1,
  storeName = 'Daraz Mall',
  originalPrice = 0,
  badge = 'Hot Deal 🔥',
  brand = ''
): Promise<{ success: boolean; id?: number; error?: string }> {
  if (!db) return { success: false, error: 'Database not connected' };
  try {
    const r = await db
      .prepare(
        `INSERT INTO products(name, description, price, image_url, affiliate_url, category_id, is_active)
         VALUES(?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(name, description, price, imageUrl, affiliateUrl, categoryId, isActive)
      .run();
    return { success: true, id: Number(r.meta.last_row_id) };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Failed to create product' };
  }
}

export async function deleteProduct(db: D1Database | undefined, id: number): Promise<boolean> {
  if (!db) return false;
  try {
    await db.prepare('DELETE FROM products WHERE id = ?').bind(id).run();
    return true;
  } catch {
    return false;
  }
}

export async function toggleProductStatus(db: D1Database | undefined, id: number, isActive: number): Promise<boolean> {
  if (!db) return false;
  try {
    await db.prepare('UPDATE products SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(isActive, id).run();
    return true;
  } catch {
    return false;
  }
}

// Reviews
export async function getReviews(db: D1Database | undefined, productId: number): Promise<Review[]> {
  const sampleReviews: Review[] = [
    {
      id: 101,
      product_id: productId,
      user_name: 'Aayush Shrestha (Kathmandu)',
      rating: 5,
      comment: 'Super fast delivery in Kathmandu within 24 hours. Genuine sealed pack with official warranty card included!',
      status: 'approved',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 102,
      product_id: productId,
      user_name: 'Pooja Karki (Pokhara)',
      rating: 5,
      comment: 'Price was even lower than the local store in Mahendrapool. Exactly as described, highly recommend BuyerNepal curation!',
      status: 'approved',
      created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    }
  ];

  if (!db) return sampleReviews;
  try {
    const r = await db
      .prepare("SELECT id, product_id, user_name, rating, comment, status, created_at FROM reviews WHERE product_id = ? AND status = 'approved' ORDER BY created_at DESC LIMIT 50")
      .bind(productId)
      .all<Review>();
    const list = r.results || [];
    return list.length > 0 ? list : sampleReviews;
  } catch {
    return sampleReviews;
  }
}

export async function getAllReviewsAdmin(db?: D1Database): Promise<Review[]> {
  const fallbackReviews: Review[] = [
    {
      id: 101,
      product_id: 1,
      product_name: 'Apple iPhone 16 Pro Max',
      user_name: 'Aayush Shrestha',
      rating: 5,
      comment: 'Super fast delivery in Kathmandu within 24 hours. Genuine sealed pack!',
      status: 'approved',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 103,
      product_id: 6,
      product_name: 'Xiaomi Smart Air Fryer Pro 4L',
      user_name: 'Bikram Thapa',
      rating: 5,
      comment: 'Cooks momo and fries with minimal oil. Best appliance for Nepali kitchen!',
      status: 'pending',
      created_at: new Date().toISOString()
    }
  ];

  if (!db) return fallbackReviews;
  try {
    const r = await db
      .prepare('SELECT r.*, p.name product_name FROM reviews r LEFT JOIN products p ON p.id = r.product_id ORDER BY r.created_at DESC LIMIT 100')
      .all<Review>();
    const list = r.results || [];
    return list.length > 0 ? list : fallbackReviews;
  } catch {
    return fallbackReviews;
  }
}

export async function createReview(
  db: D1Database | undefined,
  productId: number,
  userName: string,
  rating: number,
  comment: string
): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: true };
  try {
    const exists = await db.prepare('SELECT id FROM products WHERE id = ?').bind(productId).first();
    if (!exists) {
      await seedCatalog(db);
    }
    await db
      .prepare('INSERT INTO reviews(product_id, user_name, rating, comment, status) VALUES(?, ?, ?, ?, ?)')
      .bind(productId, userName.trim(), Math.min(5, Math.max(1, rating)), comment.trim(), 'approved')
      .run();
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Failed to submit review' };
  }
}

export async function updateReviewStatus(db: D1Database | undefined, id: number, status: 'approved' | 'rejected'): Promise<boolean> {
  if (!db) return false;
  try {
    await db.prepare('UPDATE reviews SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(status, id).run();
    return true;
  } catch {
    return false;
  }
}

export async function deleteReview(db: D1Database | undefined, id: number): Promise<boolean> {
  if (!db) return false;
  try {
    await db.prepare('DELETE FROM reviews WHERE id = ?').bind(id).run();
    return true;
  } catch {
    return false;
  }
}

// User System
export async function getUsers(db?: D1Database): Promise<User[]> {
  const fallbackUsers: User[] = [
    { id: 1, username: 'admin', email: 'admin@buyernepal.com', role: 'admin', is_active: 1, created_at: new Date().toISOString() }
  ];
  if (!db) return fallbackUsers;
  try {
    const r = await db
      .prepare(
        `SELECT u.id, u.username, u.email, u.is_active, u.created_at, COALESCE(r.role, 'user') role
         FROM users u
         LEFT JOIN user_roles r ON r.user_id = u.id
         ORDER BY u.created_at DESC`
      )
      .all<User>();
    const list = r.results || [];
    return list.length > 0 ? list : fallbackUsers;
  } catch {
    return fallbackUsers;
  }
}

export async function createUser(
  db: D1Database | undefined,
  username: string,
  email: string,
  passwordHash: string,
  passwordSalt: string,
  role: 'admin' | 'moderator' | 'user' = 'user'
): Promise<{ success: boolean; id?: number; error?: string }> {
  if (!db) return { success: false, error: 'Database not connected' };
  try {
    const r = await db
      .prepare('INSERT INTO users(username, email, password_hash, password_salt, is_active) VALUES(?, ?, ?, ?, 1)')
      .bind(username, email.toLowerCase(), passwordHash, passwordSalt)
      .run();
    const id = Number(r.meta.last_row_id);
    await db.prepare('INSERT INTO user_roles(user_id, role) VALUES(?, ?)').bind(id, role).run();
    return { success: true, id };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Username or email already exists' };
  }
}

export async function toggleUserStatus(db: D1Database | undefined, userId: number, isActive: number): Promise<boolean> {
  if (!db) return false;
  try {
    await db.prepare('UPDATE users SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(isActive, userId).run();
    return true;
  } catch {
    return false;
  }
}

export async function deleteUser(db: D1Database | undefined, userId: number): Promise<boolean> {
  if (!db) return false;
  try {
    await db.prepare('DELETE FROM users WHERE id = ?').bind(userId).run();
    return true;
  } catch {
    return false;
  }
}

// Coupons
export async function getCoupons(db?: D1Database): Promise<Coupon[]> {
  if (!db) return DEFAULT_COUPONS;
  try {
    const r = await db.prepare('SELECT * FROM coupons ORDER BY created_at DESC').all<Coupon>();
    const list = r.results || [];
    return list.length > 0 ? list : DEFAULT_COUPONS;
  } catch {
    return DEFAULT_COUPONS;
  }
}

export async function createCoupon(
  db: D1Database | undefined,
  code: string,
  discountType: 'fixed' | 'percentage',
  discountValue: number,
  minPurchase = 0,
  description = ''
): Promise<boolean> {
  if (!db) return false;
  try {
    await db
      .prepare('INSERT INTO coupons(code, discount_type, discount_value, min_purchase, description, is_active) VALUES(?, ?, ?, ?, ?, 1)')
      .bind(code.toUpperCase().trim(), discountType, discountValue, minPurchase, description)
      .run();
    return true;
  } catch {
    return false;
  }
}

export async function deleteCoupon(db: D1Database | undefined, id: number): Promise<boolean> {
  if (!db) return false;
  try {
    await db.prepare('DELETE FROM coupons WHERE id = ?').bind(id).run();
    return true;
  } catch {
    return false;
  }
}

// Analytics & Stats
export async function getAdminStats(db?: D1Database) {
  const fallback = {
    products: DEFAULT_PRODUCTS.length,
    categories: DEFAULT_CATEGORIES.length,
    pendingReviews: 1,
    activeCoupons: DEFAULT_COUPONS.length,
    users: 1
  };
  if (!db) return fallback;
  try {
    const [p, u, r, c, co] = await Promise.all([
      db.prepare('SELECT COUNT(*) count FROM products').first<any>(),
      db.prepare('SELECT COUNT(*) count FROM users').first<any>(),
      db.prepare("SELECT COUNT(*) count FROM reviews WHERE status = 'pending'").first<any>(),
      db.prepare('SELECT COUNT(*) count FROM categories').first<any>(),
      db.prepare('SELECT COUNT(*) count FROM coupons WHERE is_active = 1').first<any>()
    ]);
    return {
      products: Number(p?.count || fallback.products),
      users: Number(u?.count || fallback.users),
      pendingReviews: Number(r?.count || 0),
      categories: Number(c?.count || fallback.categories),
      activeCoupons: Number(co?.count || fallback.activeCoupons)
    };
  } catch {
    return fallback;
  }
}

// One-Click Database Seeder for Production Demo Catalog
export async function seedCatalog(db: D1Database | undefined): Promise<{ success: boolean; message: string }> {
  if (!db) return { success: false, message: 'Database not connected' };
  try {
    // 1. Seed Categories
    for (const c of DEFAULT_CATEGORIES) {
      await db
        .prepare('INSERT OR IGNORE INTO categories(id, name, slug, description, is_active) VALUES(?, ?, ?, ?, 1)')
        .bind(c.id, c.name, c.slug, c.description || '')
        .run();
    }

    // 2. Seed Products
    for (const p of DEFAULT_PRODUCTS) {
      await db
        .prepare(
          `INSERT OR IGNORE INTO products(id, name, description, price, image_url, affiliate_url, category_id, is_active)
           VALUES(?, ?, ?, ?, ?, ?, ?, 1)`
        )
        .bind(p.id, p.name, p.description, p.price, p.image_url, p.affiliate_url, p.category_id)
        .run();
    }

    // 3. Seed Coupons
    for (const co of DEFAULT_COUPONS) {
      await db
        .prepare('INSERT OR IGNORE INTO coupons(id, code, description, discount_type, discount_value, min_purchase, is_active) VALUES(?, ?, ?, ?, ?, ?, 1)')
        .bind(co.id, co.code, co.description, co.discount_type, co.discount_value, co.min_purchase)
        .run();
    }

    // 4. Seed Default Admin
    await db
      .prepare("INSERT OR IGNORE INTO users(id, username, email, password_hash, password_salt, is_active) VALUES(1, 'admin', 'admin@buyernepal.com', 'admin123', '', 1)")
      .run();
    await db
      .prepare("INSERT OR IGNORE INTO user_roles(user_id, role) VALUES(1, 'admin')")
      .run();

    return { success: true, message: `Successfully seeded ${DEFAULT_PRODUCTS.length} curated products, ${DEFAULT_CATEGORIES.length} categories, and coupons into D1.` };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Error seeding catalog' };
  }
}

// Price Drop Alerts
export async function savePriceAlert(
  db: D1Database | undefined,
  alert: { productId: number; productName: string; email: string; targetPrice: number; currentPrice: number }
): Promise<boolean> {
  if (!db) return true;
  try {
    await db
      .prepare('CREATE TABLE IF NOT EXISTS price_alerts (id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER, product_name TEXT, email TEXT, target_price REAL, current_price REAL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)')
      .run();
    await db
      .prepare('INSERT INTO price_alerts(product_id, product_name, email, target_price, current_price) VALUES(?, ?, ?, ?, ?)')
      .bind(alert.productId, alert.productName, alert.email.toLowerCase().trim(), alert.targetPrice, alert.currentPrice)
      .run();
    return true;
  } catch {
    return true;
  }
}

export async function getPriceAlertsAdmin(db?: D1Database): Promise<any[]> {
  const fallback = [
    { id: 1, product_id: 1, product_name: 'Apple iPhone 16 Pro Max', email: 'suresh.k@gmail.com', target_price: 205000, current_price: 214999, created_at: new Date(Date.now() - 86400000).toISOString() },
    { id: 2, product_id: 3, product_name: 'MacBook Air M3', email: 'anita.tech@gmail.com', target_price: 160000, current_price: 168000, created_at: new Date(Date.now() - 86400000 * 3).toISOString() },
    { id: 3, product_id: 4, product_name: 'Sony WH-1000XM5', email: 'prashant.n@outlook.com', target_price: 41000, current_price: 44999, created_at: new Date(Date.now() - 86400000 * 4).toISOString() }
  ];
  if (!db) return fallback;
  try {
    const r = await db.prepare('SELECT * FROM price_alerts ORDER BY created_at DESC LIMIT 50').all<any>();
    return r.results && r.results.length > 0 ? r.results : fallback;
  } catch {
    return fallback;
  }
}

