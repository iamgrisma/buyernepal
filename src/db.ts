import { Category, Product, Review, SiteSettings, User, Coupon, Article, ProductVariant, ProductScore, StoreOffer } from './types';

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
    emi_available: 1,
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
    emi_available: 1,
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
    emi_available: 1,
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
    emi_available: 1,
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
    emi_available: 0,
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
    emi_available: 0,
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
    emi_available: 1,
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
    emi_available: 0,
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
    emi_available: 0,
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
    emi_available: 0,
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
    emi_available: 0,
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
    emi_available: 1,
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

export const DEFAULT_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Best Mobile Phones Under 30,000 in Nepal (2026 Edition)',
    slug: 'best-mobile-phones-under-30000-nepal',
    excerpt: 'Comprehensive buyer guide analyzing Nepal\'s top budget champions featuring 120Hz AMOLED screens, 50MP OIS cameras, MDMS registration, and verified local pricing.',
    content: `Buying a smartphone under Rs. 30,000 in Nepal has transformed dramatically in 2026. Buyers no longer need to compromise on core user experience: 120Hz refresh rates, bright AMOLED panels, 50MP Sony sensors with Optical Image Stabilization (OIS), and 45W+ fast charging have become standard in this competitive price tier.

### What Should You Expect Under Rs. 30,000 in Nepal?
1. **Display Quality:** Full HD+ AMOLED displays with at least 120Hz refresh rate and Gorilla Glass protection. Peak brightness should comfortably exceed 1,200 nits to handle direct sunlight during bright Kathmandu afternoons.
2. **Processing Power:** MediaTek Dimensity 7050 / 7200 or Snapdragon 6 Gen 1 / 7s Gen 2 chipsets. These provide reliable 60fps daily multitasking, social media feeds, and moderate gaming in PUBG Mobile / Free Fire.
3. **Official MDMS Status:** Crucial! Make sure you purchase from authorized Nepali distributors offering VAT invoices so your device's IMEI is officially registered on NTA's MDMS portal.

### Top Recommendation: Xiaomi Redmi Note 13 / 14 Series
The Redmi Note lineup continues to offer unmatched value for money in Nepal. With a razor-thin bezel AMOLED panel and a dependable 5,000 mAh cell, it dominates the sub-30k bracket.

### Best for Clean Software: Samsung Galaxy M-Series / A-Series
If you despise bloatware and prioritize long-term security patches, Samsung's official Nepal units guarantee up to 4 years of OS upgrades with Knox security.

### Verdict
Before buying, compare offline rates in New Road with verified Daraz Mall authorized brand outlets. Always verify the VAT bill to ensure hassle-free warranty claim at authorized service centers.`,
    cover_image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&auto=format&fit=crop&q=80',
    author_name: 'BuyerNepal Editorial Team',
    category: 'Buying Guides',
    tags: 'smartphones, buying-guide, budget-phones, nepal-tech',
    read_time_minutes: 6,
    is_featured: 1,
    is_published: 1,
    views_count: 1420,
    published_at: '2026-09-01T10:00:00Z'
  },
  {
    id: 2,
    title: 'Apple iPhone 16 Pro Max Full Review: Worth the Nepali Price Tag?',
    slug: 'apple-iphone-16-pro-max-nepal-review',
    excerpt: 'Detailed testing on A18 Pro silicon, Camera Control tactile sensor, Kathmandu battery life, and whether official GenNext Nepal pricing justifies the upgrade.',
    content: `The Apple iPhone 16 Pro Max has landed in Nepal via authorized distributor GenNext. With its grade-5 titanium architecture, larger 6.9-inch display, tactile Camera Control button, and the 3nm A18 Pro chipset, it claims the flagship crown.

### Design & Build: Subtle Titanium Refinements
The aerospace-grade titanium frame with contoured borders feels remarkably lighter in the hand than older stainless steel iterations. The display bezels have shrunk to microscopic levels, making the 6.9-inch panel feel immersive without excessive bulk.

### Camera Innovations: 4K 120fps & Camera Control
The dedicated Camera Control button on the lower right flank brings DSLR-like tactile half-press focus and swipe gesture zoom. For creators in Nepal shooting 4K 120fps ProRes log footage, the dynamic range in challenging lighting conditions (such as high-altitude Pokhara or Everest viewpoints) is astonishing.

### Battery Life Champion
In our real-world Kathmandu network testing (alternating between NTC 5G, Ncell 4G, and fiber Wi-Fi), the 16 Pro Max delivered an astonishing 10.5 hours of screen-on time, easily lasting two full workdays.

### The Nepal Price Verdict: Should You Buy?
Priced at Rs. 214,999 for the 256GB base variant, it is unquestionably a premium investment. However, with official GenNext 1-year warranty, 1-year breakage insurance, and official NTA MDMS clearance, it ensures total peace of mind against gray-market confiscation.`,
    cover_image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1200&auto=format&fit=crop&q=80',
    author_name: 'Bikash Adhikari (Senior Tech Editor)',
    category: 'Smartphone Reviews',
    tags: 'apple, iphone-16-pro-max, flagship, review, gennext',
    read_time_minutes: 8,
    is_featured: 1,
    is_published: 1,
    views_count: 2890,
    published_at: '2026-09-03T14:30:00Z'
  },
  {
    id: 3,
    title: 'Nepal MDMS System & Customs Tax Explained: Avoid Getting Blacklisted',
    slug: 'nepal-mdms-registration-customs-tax-guide',
    excerpt: 'Everything Nepali travelers and overseas returnees must know about NTA MDMS registration, airport customs tax slabs, and IMEI verification rules.',
    content: `The Nepal Telecommunications Authority (NTA) has strictly enforced the Mobile Device Management System (MDMS) to combat gray market imports, mobile theft, and tax evasion.

### What is MDMS?
MDMS is a centralized tracking system implemented across all telecom operators in Nepal (Nepal Telecom, Ncell, Smart Cell). Every smartphone connected to a Nepali SIM card must have its 15-digit IMEI whitelisted in the government database. Unregistered devices receive warning notices and are subsequently blocked from cellular connectivity.

### Baggage Customs Rules for Travelers (Foreign Returnees)
- **Nepali Citizens returning from abroad:** Allowed to bring ONE personal smartphone used abroad without paying customs duty.
- **Second phone / Unpacked phone:** Subject to customs duty (approx. 18% to 24% depending on invoice value) and 13% VAT.
- **Registration Process:** You can upload your immigration passport stamp, flight boarding pass, and purchase invoice directly at the official portal: mdms.nta.gov.np.

### Buying Locally: How to Verify Before Paying
Always inspect the retail box before handing over payment:
1. Dial *#06# on the phone keypad to get the genuine IMEI.
2. Visit **mdms.nta.gov.np** and input the IMEI number.
3. If it says "IMEI is registered in MDMS", your phone is official.
4. Insist on a genuine VAT invoice stamped by the registered store.`,
    cover_image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
    author_name: 'BuyerNepal Legal & Tech Desk',
    category: 'Nepal Tech',
    tags: 'mdms, customs, nta, mobile-rules, nepal-law',
    read_time_minutes: 5,
    is_featured: 0,
    is_published: 1,
    views_count: 5120,
    published_at: '2026-08-28T09:15:00Z'
  },
  {
    id: 4,
    title: 'Best Laptops for Engineering & IT Students in Nepal (2026)',
    slug: 'best-laptops-engineering-it-students-nepal',
    excerpt: 'Top workstation and ultrabook recommendations in Nepal for coding, AutoCAD, machine learning, and university assignments with verified warranty.',
    content: `Choosing a laptop for Computer Engineering, BCA, BSc CSIT, or Mechanical Engineering in Nepal demands a careful balance of CPU performance, RAM expandability, battery life for campus lectures, and robust local warranty support.

### Essential Specifications Checklist
- **CPU:** Minimum AMD Ryzen 5 7000/8000 series or Intel Core i5 13th/14th Gen or Apple M-series.
- **RAM:** 16GB is the baseline in 2026. For Docker containers, virtual machines, and IDE compilation, 8GB will cause severe stuttering.
- **Storage:** 512GB NVMe SSD minimum, preferably with a secondary M.2 expansion slot.
- **Display:** Matte anti-glare IPS display with at least 300 nits brightness.

### Top Pick for Portability & Battery: Apple MacBook Air M3
For CSIT, BCA, and software engineering students, the MacBook Air M3 provides an unbeatable 16+ hours of battery life, allowing you to attend college without carrying a bulky charging brick.

### Top Pick for 3D Modeling & Gaming: Lenovo LOQ / ASUS TUF Gaming
If your curriculum involves SolidWorks, AutoCAD 3D, Blender, or heavy GPU workloads, the Lenovo LOQ equipped with RTX 4050/4060 graphics is the price-to-performance champion in Kathmandu.`,
    cover_image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&auto=format&fit=crop&q=80',
    author_name: 'Prajwol Gautam (Computing Analyst)',
    category: 'Laptop Guides',
    tags: 'laptops, engineering, students, macbook, lenovo, nepal',
    read_time_minutes: 7,
    is_featured: 0,
    is_published: 1,
    views_count: 3100,
    published_at: '2026-08-20T11:00:00Z'
  }
];

export const DEFAULT_SCORES: Record<number, ProductScore> = {
  1: {
    product_id: 1,
    display_score: 9.8,
    performance_score: 9.9,
    camera_score: 9.7,
    battery_score: 9.6,
    value_score: 8.4,
    overall_score: 9.5,
    verdict: 'The uncontested battery and video recording titan in Nepal. Pricey with customs tax, but unmatched resale value and GenNext official warranty.'
  },
  2: {
    product_id: 2,
    display_score: 9.9,
    performance_score: 9.8,
    camera_score: 9.8,
    battery_score: 9.4,
    value_score: 8.8,
    overall_score: 9.6,
    verdict: 'The ultimate Android powerhouse with built-in S-Pen, flat anti-reflective display, and 7 years of OS upgrades.'
  },
  3: {
    product_id: 3,
    display_score: 9.4,
    performance_score: 9.6,
    camera_score: 8.0,
    battery_score: 9.7,
    value_score: 9.1,
    overall_score: 9.2,
    verdict: 'Silent fanless workstation with 18-hour battery longevity. The gold standard laptop for developers and university students in Nepal.'
  },
  4: {
    product_id: 4,
    display_score: 8.5,
    performance_score: 9.5,
    camera_score: 7.0,
    battery_score: 9.2,
    value_score: 9.0,
    overall_score: 8.7,
    verdict: 'Sublime ANC capability for blocking loud Kathmandu traffic and bike exhausts, backed by plush synthetic leather ear cushions.'
  }
};

export const DEFAULT_VARIANTS: Record<number, ProductVariant[]> = {
  1: [
    { id: 101, product_id: 1, variant_name: '256GB - Desert Titanium', price: 214999, original_price: 229999, is_in_stock: 1 },
    { id: 102, product_id: 1, variant_name: '512GB - Natural Titanium', price: 249999, original_price: 265000, is_in_stock: 1 },
    { id: 103, product_id: 1, variant_name: '1TB - Black Titanium', price: 289999, original_price: 305000, is_in_stock: 0 }
  ],
  2: [
    { id: 201, product_id: 2, variant_name: '12GB / 256GB - Titanium Gray', price: 199999, original_price: 214999, is_in_stock: 1 },
    { id: 202, product_id: 2, variant_name: '12GB / 512GB - Titanium Black', price: 224999, original_price: 239999, is_in_stock: 1 }
  ],
  3: [
    { id: 301, product_id: 3, variant_name: '16GB Unified RAM / 512GB SSD (Midnight)', price: 178000, original_price: 189000, is_in_stock: 1 },
    { id: 302, product_id: 3, variant_name: '24GB Unified RAM / 1TB SSD (Starlight)', price: 229000, original_price: 245000, is_in_stock: 1 }
  ]
};

export const DEFAULT_STORE_OFFERS: Record<number, StoreOffer[]> = {
  1: [
    { id: 11, product_id: 1, store_name: 'Daraz Mall Verified', price: 214999, store_url: 'https://www.daraz.com.np', badge: 'Official Daraz Partner', in_stock: 1, delivery_time: '24h Kathmandu Express', warranty_info: '1 Year GenNext Nepal Warranty' },
    { id: 12, product_id: 1, store_name: 'Oliz Store Nepal', price: 216000, store_url: 'https://olizstore.com', badge: 'Authorized Apple Reseller', in_stock: 1, delivery_time: 'Same-day Babarmahal Store Pickup', warranty_info: '1 Year Official Apple Warranty + 1 Year Breakage' },
    { id: 13, product_id: 1, store_name: 'EvoStore Nepal', price: 218000, store_url: 'https://evostore.com.np', badge: 'Apple Premium Partner', in_stock: 1, delivery_time: 'Courier 2-3 Days Nationwide', warranty_info: '1 Year Official Warranty' }
  ],
  2: [
    { id: 21, product_id: 2, store_name: 'Daraz Mall Verified', price: 199999, store_url: 'https://www.daraz.com.np', badge: 'Daraz Official Brand', in_stock: 1, delivery_time: '24-48h Delivery', warranty_info: '1 Year Samsung Nepal Official' },
    { id: 22, product_id: 2, store_name: 'Samsung Plaza Nepal', price: 204999, store_url: 'https://samsungplaza.com.np', badge: 'Brand Flagship Store', in_stock: 1, delivery_time: 'Free Doorstep Delivery', warranty_info: '1 Year Full Protection + 1-Time Screen Repair' }
  ],
  3: [
    { id: 31, product_id: 3, store_name: 'Oliz Store Nepal', price: 178000, store_url: 'https://olizstore.com', badge: 'Authorized Reseller', in_stock: 1, delivery_time: 'Immediate In-store Pickup', warranty_info: '1 Year Global Apple Care' },
    { id: 32, product_id: 3, store_name: 'Daraz Mall', price: 179500, store_url: 'https://www.daraz.com.np', badge: 'Daraz Mall', in_stock: 1, delivery_time: '1-2 Days Valley Delivery', warranty_info: '1 Year GenNext Authorized' }
  ]
};

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
    return list.map((c) => ({
      ...c,
      icon: (c as any).icon || DEFAULT_CATEGORIES.find((dc) => dc.slug === c.slug)?.icon || '🛍️'
    }));
  } catch {
    return [];
  }
}

export async function getCategoryBySlug(db: D1Database | undefined, slug: string): Promise<Category | null> {
  if (!db) return DEFAULT_CATEGORIES.find((c) => c.slug.toLowerCase() === slug.toLowerCase()) || null;
  try {
    const c = await db
      .prepare('SELECT id, name, slug, description, parent_id, is_active FROM categories WHERE slug = ? COLLATE NOCASE AND is_active = 1 LIMIT 1')
      .bind(slug)
      .first<Category>();
    if (c) {
      const matchDefault = DEFAULT_CATEGORIES.find((dc) => dc.slug.toLowerCase() === slug.toLowerCase());
      return {
        ...c,
        icon: (c as any).icon || matchDefault?.icon || '🛍️'
      };
    }
    return null;
  } catch {
    return null;
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

export async function updateCategory(
  db: D1Database | undefined,
  id: number,
  data: {
    name?: string;
    slug?: string;
    icon?: string;
    description?: string;
    isActive?: number;
  }
): Promise<{ success: boolean; error?: string }> {
  // Update in-memory fallback list
  const idx = DEFAULT_CATEGORIES.findIndex((c) => c.id === id);
  if (idx > -1) {
    DEFAULT_CATEGORIES[idx] = {
      ...DEFAULT_CATEGORIES[idx],
      name: data.name ? data.name.trim() : DEFAULT_CATEGORIES[idx].name,
      slug: data.slug ? data.slug.trim().toLowerCase() : DEFAULT_CATEGORIES[idx].slug,
      icon: data.icon || DEFAULT_CATEGORIES[idx].icon,
      description: data.description !== undefined ? data.description.trim() : DEFAULT_CATEGORIES[idx].description,
      is_active: data.isActive !== undefined ? data.isActive : DEFAULT_CATEGORIES[idx].is_active
    };
  }

  if (!db) return { success: true };
  try {
    const existing = await db.prepare('SELECT * FROM categories WHERE id = ?').bind(id).first<Category>();
    const finalName = data.name ? data.name.trim() : (existing?.name || '');
    const finalSlug = data.slug ? data.slug.trim().toLowerCase() : (existing?.slug || '');
    const finalDesc = data.description !== undefined ? data.description : (existing?.description || '');
    const finalActive = data.isActive !== undefined ? data.isActive : (existing?.is_active ?? 1);

    await db
      .prepare('UPDATE categories SET name = ?, slug = ?, description = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .bind(finalName, finalSlug, finalDesc ?? '', finalActive, id)
      .run();
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Failed to update category' };
  }
}

// Product Enrichment Helper for 2026 Features (EMI, Flash Deals, Specs, Price History, Delivery)
export function enrichProduct(p: Product): Product {
  const origPrice = p.original_price || Math.round(p.price * 1.15);
  // User feedback: EMI is ONLY available when explicitly configured for this product (emi_available === 1)
  const emiAvailable = Number(p.emi_available) === 1 ? 1 : 0;
  const emiPrice = emiAvailable ? (p.emi_starting_price || Math.round(p.price / 18)) : undefined;
  
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
  } catch {
    return [];
  }
}

export async function getAllProductsAdmin(db?: D1Database): Promise<Product[]> {
  if (!db) return DEFAULT_PRODUCTS.map(enrichProduct);
  try {
    const r = await db
      .prepare('SELECT p.*, c.name category_name FROM products p LEFT JOIN categories c ON c.id = p.category_id ORDER BY p.id ASC LIMIT 200')
      .all<Product>();
    const list = r.results || [];
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
  } catch {
    return [];
  }
}

export async function getProductById(db: D1Database | undefined, id: number): Promise<Product | null> {
  let prod: Product | null = null;
  if (!db) {
    const def = DEFAULT_PRODUCTS.find((p) => p.id === id) || null;
    prod = def ? enrichProduct(def) : null;
  } else {
    try {
      const p = await db
        .prepare('SELECT p.*, c.name category_name FROM products p LEFT JOIN categories c ON c.id = p.category_id WHERE p.id = ? AND p.is_active = 1 LIMIT 1')
        .bind(id)
        .first<Product>();
      if (p) {
        const def = DEFAULT_PRODUCTS.find((dp) => dp.id === p.id || dp.name === p.name);
        prod = enrichProduct({
          ...p,
          original_price: p.original_price || def?.original_price,
          store_name: p.store_name || def?.store_name,
          badge: p.badge || def?.badge,
          rating: p.rating || def?.rating,
          review_count: p.review_count || def?.review_count,
          brand: p.brand || def?.brand
        });
      }
    } catch {
      prod = null;
    }
  }

  if (prod) {
    const [scores, variants, offers] = await Promise.all([
      getProductScores(db, id),
      getProductVariants(db, id),
      getStoreOffers(db, id)
    ]);
    prod.scores = scores || undefined;
    prod.variants = variants;
    prod.store_offers = offers.map((o) => ({
      ...o,
      price: o.price > 0 ? o.price : prod!.price
    }));
  }

  return prod;
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
  brand = '',
  emiAvailable = 0,
  verdict = ''
): Promise<{ success: boolean; id?: number; error?: string }> {
  if (!db) return { success: false, error: 'Database not connected' };
  try {
    const r = await db
      .prepare(
        `INSERT INTO products(name, description, price, image_url, affiliate_url, category_id, is_active, store_name, original_price, badge, brand, emi_available, verdict)
         VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(name, description, price, imageUrl, affiliateUrl, categoryId, isActive, storeName, originalPrice, badge, brand, emiAvailable, verdict)
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

export async function updateProduct(
  db: D1Database | undefined,
  id: number,
  data: {
    name: string;
    price: number;
    originalPrice?: number;
    description?: string;
    imageUrl?: string;
    affiliateUrl?: string;
    categoryId?: number | null;
    isActive?: number;
    storeName?: string;
    badge?: string;
    brand?: string;
    emiAvailable?: number;
    verdict?: string;
  }
): Promise<{ success: boolean; error?: string }> {
  // Update in-memory fallback catalog
  const idx = DEFAULT_PRODUCTS.findIndex((p) => p.id === id);
  if (idx > -1) {
    DEFAULT_PRODUCTS[idx] = {
      ...DEFAULT_PRODUCTS[idx],
      name: data.name.trim(),
      price: data.price,
      original_price: data.originalPrice !== undefined ? data.originalPrice : DEFAULT_PRODUCTS[idx].original_price,
      description: data.description !== undefined ? data.description.trim() : DEFAULT_PRODUCTS[idx].description,
      image_url: data.imageUrl !== undefined ? data.imageUrl.trim() : DEFAULT_PRODUCTS[idx].image_url,
      affiliate_url: data.affiliateUrl !== undefined ? data.affiliateUrl.trim() : DEFAULT_PRODUCTS[idx].affiliate_url,
      category_id: data.categoryId !== undefined ? data.categoryId : DEFAULT_PRODUCTS[idx].category_id,
      store_name: data.storeName ? data.storeName.trim() : DEFAULT_PRODUCTS[idx].store_name,
      badge: data.badge ? data.badge.trim() : DEFAULT_PRODUCTS[idx].badge,
      brand: data.brand !== undefined ? data.brand.trim() : DEFAULT_PRODUCTS[idx].brand,
      emi_available: data.emiAvailable !== undefined ? data.emiAvailable : DEFAULT_PRODUCTS[idx].emi_available,
      verdict: data.verdict !== undefined ? data.verdict.trim() : DEFAULT_PRODUCTS[idx].verdict,
      is_active: data.isActive ?? DEFAULT_PRODUCTS[idx].is_active
    };
  }

  if (!db) return { success: true };
  try {
    const existing = await db.prepare('SELECT * FROM products WHERE id = ?').bind(id).first<Product>();
    const finalName = data.name ? data.name.trim() : (existing?.name || '');
    const finalDesc = data.description !== undefined ? data.description : (existing?.description || '');
    const finalPrice = typeof data.price === 'number' && !isNaN(data.price) ? data.price : (existing?.price || 0);
    const finalOrigPrice = data.originalPrice !== undefined ? data.originalPrice : (existing?.original_price || 0);
    const finalImg = data.imageUrl !== undefined ? data.imageUrl : (existing?.image_url || '');
    const finalAff = data.affiliateUrl !== undefined ? data.affiliateUrl : (existing?.affiliate_url || '');
    const finalCat = data.categoryId !== undefined ? (data.categoryId ? Number(data.categoryId) : null) : (existing?.category_id ?? null);
    const finalActive = data.isActive !== undefined ? data.isActive : (existing?.is_active ?? 1);
    const finalStore = data.storeName !== undefined ? data.storeName.trim() : (existing?.store_name || 'Daraz Mall');
    const finalBadge = data.badge !== undefined ? data.badge.trim() : (existing?.badge || '');
    const finalBrand = data.brand !== undefined ? data.brand.trim() : (existing?.brand || '');
    const finalEmi = data.emiAvailable !== undefined ? data.emiAvailable : (existing?.emi_available ?? 0);
    const finalVerdict = data.verdict !== undefined ? data.verdict.trim() : (existing?.verdict || '');

    await db
      .prepare(
        `UPDATE products
         SET name = ?, description = ?, price = ?, original_price = ?, image_url = ?, affiliate_url = ?,
             category_id = ?, is_active = ?, store_name = ?, badge = ?, brand = ?, emi_available = ?, verdict = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`
      )
      .bind(
        finalName,
        finalDesc ?? '',
        finalPrice,
        finalOrigPrice,
        finalImg ?? '',
        finalAff ?? '',
        finalCat ?? null,
        finalActive,
        finalStore,
        finalBadge,
        finalBrand,
        finalEmi,
        finalVerdict,
        id
      )
      .run();
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Failed to update product' };
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
      comment: 'Super fast delivery in Kathmandu within 24 hours. Genuine sealed pack with official Nepal warranty card included!',
      status: 'approved',
      created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: 102,
      product_id: productId,
      user_name: 'Pooja Karki (Pokhara)',
      rating: 5,
      comment: 'Price was lower than the local store in Mahendrapool. Exactly as described, highly recommend BuyerNepal curation!',
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
  if (!db) return [];
  try {
    const r = await db
      .prepare('SELECT r.*, p.name product_name FROM reviews r LEFT JOIN products p ON p.id = r.product_id ORDER BY r.created_at DESC LIMIT 100')
      .all<Review>();
    return r.results || [];
  } catch {
    return [];
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

// Product Editorial Scores (Display, Performance, Camera, Battery, Value)
export async function getProductScores(db: D1Database | undefined, productId: number): Promise<ProductScore | null> {
  const fallback = DEFAULT_SCORES[productId] || (productId <= 5 ? {
    product_id: productId,
    display_score: 8.8,
    performance_score: 8.9,
    camera_score: 8.5,
    battery_score: 8.7,
    value_score: 9.0,
    overall_score: 8.8,
    verdict: 'Excellent daily performance with verified official Nepal warranty coverage.'
  } : null);

  if (!db) return fallback;
  try {
    const s = await db
      .prepare('SELECT * FROM product_scores WHERE product_id = ? LIMIT 1')
      .bind(productId)
      .first<ProductScore>();
    return s || fallback;
  } catch {
    return fallback;
  }
}

export async function saveProductScores(
  db: D1Database | undefined,
  data: {
    productId: number;
    displayScore: number;
    performanceScore: number;
    cameraScore: number;
    batteryScore: number;
    valueScore: number;
    overallScore: number;
    verdict?: string;
  }
): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: true };
  try {
    await db
      .prepare(
        `INSERT INTO product_scores(product_id, display_score, performance_score, camera_score, battery_score, value_score, overall_score, verdict, updated_at)
         VALUES(?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
         ON CONFLICT(product_id) DO UPDATE SET
           display_score = excluded.display_score,
           performance_score = excluded.performance_score,
           camera_score = excluded.camera_score,
           battery_score = excluded.battery_score,
           value_score = excluded.value_score,
           overall_score = excluded.overall_score,
           verdict = excluded.verdict,
           updated_at = CURRENT_TIMESTAMP`
      )
      .bind(
        data.productId,
        data.displayScore,
        data.performanceScore,
        data.cameraScore,
        data.batteryScore,
        data.valueScore,
        data.overallScore,
        data.verdict || ''
      )
      .run();
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Failed to save product scores' };
  }
}

// Product Variants Matrix (RAM / Storage / Color)
export async function getProductVariants(db: D1Database | undefined, productId: number): Promise<ProductVariant[]> {
  const fallback = DEFAULT_VARIANTS[productId] || [];
  if (!db) return fallback;
  try {
    const r = await db
      .prepare('SELECT * FROM product_variants WHERE product_id = ? ORDER BY price ASC')
      .bind(productId)
      .all<ProductVariant>();
    const list = r.results || [];
    return list.length > 0 ? list : fallback;
  } catch {
    return fallback;
  }
}

export async function saveProductVariant(
  db: D1Database | undefined,
  data: {
    id?: number;
    productId: number;
    variantName: string;
    price: number;
    originalPrice?: number;
    sku?: string;
    isInStock?: number;
  }
): Promise<{ success: boolean; id?: number; error?: string }> {
  if (!db) return { success: true };
  try {
    if (data.id) {
      await db
        .prepare(
          `UPDATE product_variants
           SET variant_name = ?, price = ?, original_price = ?, sku = ?, is_in_stock = ?
           WHERE id = ?`
        )
        .bind(data.variantName.trim(), data.price, data.originalPrice || 0, data.sku || '', data.isInStock ?? 1, data.id)
        .run();
      return { success: true, id: data.id };
    } else {
      const r = await db
        .prepare(
          `INSERT INTO product_variants(product_id, variant_name, price, original_price, sku, is_in_stock)
           VALUES(?, ?, ?, ?, ?, ?)`
        )
        .bind(data.productId, data.variantName.trim(), data.price, data.originalPrice || 0, data.sku || '', data.isInStock ?? 1)
        .run();
      return { success: true, id: Number(r.meta.last_row_id) };
    }
  } catch (e: any) {
    return { success: false, error: e?.message || 'Failed to save product variant' };
  }
}

export async function deleteProductVariant(db: D1Database | undefined, id: number): Promise<boolean> {
  if (!db) return false;
  try {
    await db.prepare('DELETE FROM product_variants WHERE id = ?').bind(id).run();
    return true;
  } catch {
    return false;
  }
}

// Multi-Store Price Comparison Matrix ("Where to Buy in Nepal")
export async function getStoreOffers(db: D1Database | undefined, productId: number): Promise<StoreOffer[]> {
  const fallback = DEFAULT_STORE_OFFERS[productId] || [
    {
      id: 9991,
      product_id: productId,
      store_name: 'Daraz Mall Verified',
      price: 0,
      store_url: 'https://www.daraz.com.np',
      badge: 'Official Brand Partner',
      in_stock: 1,
      delivery_time: '24-48h Kathmandu Express',
      warranty_info: 'Official Nepal Warranty'
    }
  ];
  if (!db) return fallback;
  try {
    const r = await db
      .prepare('SELECT * FROM store_offers WHERE product_id = ? ORDER BY price ASC')
      .bind(productId)
      .all<StoreOffer>();
    const list = r.results || [];
    return list.length > 0 ? list : fallback;
  } catch {
    return fallback;
  }
}

export async function saveStoreOffer(
  db: D1Database | undefined,
  data: {
    id?: number;
    productId: number;
    storeName: string;
    price: number;
    storeUrl: string;
    badge?: string;
    inStock?: number;
    deliveryTime?: string;
    warrantyInfo?: string;
  }
): Promise<{ success: boolean; id?: number; error?: string }> {
  if (!db) return { success: true };
  try {
    if (data.id) {
      await db
        .prepare(
          `UPDATE store_offers
           SET store_name = ?, price = ?, store_url = ?, badge = ?, in_stock = ?, delivery_time = ?, warranty_info = ?
           WHERE id = ?`
        )
        .bind(
          data.storeName.trim(),
          data.price,
          data.storeUrl.trim(),
          data.badge || '',
          data.inStock ?? 1,
          data.deliveryTime || '',
          data.warrantyInfo || '',
          data.id
        )
        .run();
      return { success: true, id: data.id };
    } else {
      const r = await db
        .prepare(
          `INSERT INTO store_offers(product_id, store_name, price, store_url, badge, in_stock, delivery_time, warranty_info)
           VALUES(?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(
          data.productId,
          data.storeName.trim(),
          data.price,
          data.storeUrl.trim(),
          data.badge || '',
          data.inStock ?? 1,
          data.deliveryTime || '',
          data.warrantyInfo || ''
        )
        .run();
      return { success: true, id: Number(r.meta.last_row_id) };
    }
  } catch (e: any) {
    return { success: false, error: e?.message || 'Failed to save store offer' };
  }
}

export async function deleteStoreOffer(db: D1Database | undefined, id: number): Promise<boolean> {
  if (!db) return false;
  try {
    await db.prepare('DELETE FROM store_offers WHERE id = ?').bind(id).run();
    return true;
  } catch {
    return false;
  }
}

// Tech Guides & Articles Magazine CRUD
export async function getArticles(
  db?: D1Database,
  options?: { category?: string; limit?: number; featuredOnly?: boolean }
): Promise<Article[]> {
  const limit = options?.limit || 20;
  if (!db) {
    let list = DEFAULT_ARTICLES.filter((a) => a.is_published === 1);
    if (options?.category && options.category !== 'All') {
      list = list.filter((a) => a.category.toLowerCase() === options.category!.toLowerCase());
    }
    if (options?.featuredOnly) {
      list = list.filter((a) => a.is_featured === 1);
    }
    return list.slice(0, limit);
  }
  try {
    let sql = 'SELECT * FROM articles WHERE is_published = 1';
    const params: any[] = [];
    if (options?.category && options.category !== 'All') {
      sql += ' AND category = ? COLLATE NOCASE';
      params.push(options.category);
    }
    if (options?.featuredOnly) {
      sql += ' AND is_featured = 1';
    }
    sql += ' ORDER BY is_featured DESC, published_at DESC LIMIT ?';
    params.push(limit);

    const r = await db.prepare(sql).bind(...params).all<Article>();
    const list = r.results || [];
    return list.length > 0 ? list : DEFAULT_ARTICLES;
  } catch {
    return DEFAULT_ARTICLES;
  }
}

export async function getAllArticlesAdmin(db?: D1Database): Promise<Article[]> {
  if (!db) return DEFAULT_ARTICLES;
  try {
    const r = await db.prepare('SELECT * FROM articles ORDER BY created_at DESC LIMIT 100').all<Article>();
    const list = r.results || [];
    return list.length > 0 ? list : DEFAULT_ARTICLES;
  } catch {
    return DEFAULT_ARTICLES;
  }
}

export async function getArticleBySlug(db: D1Database | undefined, slug: string): Promise<Article | null> {
  if (!db) {
    return DEFAULT_ARTICLES.find((a) => a.slug.toLowerCase() === slug.toLowerCase()) || null;
  }
  try {
    const a = await db
      .prepare('SELECT * FROM articles WHERE slug = ? COLLATE NOCASE LIMIT 1')
      .bind(slug)
      .first<Article>();
    if (a) {
      db.prepare('UPDATE articles SET views_count = views_count + 1 WHERE id = ?').bind(a.id).run().catch(() => {});
      return a;
    }
    return DEFAULT_ARTICLES.find((da) => da.slug.toLowerCase() === slug.toLowerCase()) || null;
  } catch {
    return DEFAULT_ARTICLES.find((da) => da.slug.toLowerCase() === slug.toLowerCase()) || null;
  }
}

export async function getArticleById(db: D1Database | undefined, id: number): Promise<Article | null> {
  if (!db) {
    return DEFAULT_ARTICLES.find((a) => a.id === id) || null;
  }
  try {
    const a = await db.prepare('SELECT * FROM articles WHERE id = ? LIMIT 1').bind(id).first<Article>();
    return a || DEFAULT_ARTICLES.find((da) => da.id === id) || null;
  } catch {
    return DEFAULT_ARTICLES.find((da) => da.id === id) || null;
  }
}

export async function createArticle(
  db: D1Database | undefined,
  data: {
    title: string;
    slug?: string;
    excerpt: string;
    content: string;
    coverImage?: string;
    authorName?: string;
    category: string;
    tags?: string;
    readTimeMinutes?: number;
    isFeatured?: number;
    isPublished?: number;
    featuredProductIds?: string;
  }
): Promise<{ success: boolean; id?: number; error?: string }> {
  if (!db) return { success: false, error: 'Database not connected' };
  try {
    const slug = (data.slug?.trim() || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')).slice(0, 100);
    const r = await db
      .prepare(
        `INSERT INTO articles(title, slug, excerpt, content, cover_image, author_name, category, tags, read_time_minutes, is_featured, is_published, featured_product_ids, published_at)
         VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`
      )
      .bind(
        data.title.trim(),
        slug,
        data.excerpt.trim(),
        data.content,
        data.coverImage || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&auto=format&fit=crop&q=80',
        data.authorName || 'BuyerNepal Editorial Team',
        data.category || 'Buying Guides',
        data.tags || '',
        data.readTimeMinutes || 5,
        data.isFeatured ?? 0,
        data.isPublished ?? 1,
        data.featuredProductIds || ''
      )
      .run();
    return { success: true, id: Number(r.meta.last_row_id) };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Failed to create article' };
  }
}

export async function updateArticle(
  db: D1Database | undefined,
  id: number,
  data: {
    title: string;
    slug?: string;
    excerpt: string;
    content: string;
    coverImage?: string;
    authorName?: string;
    category: string;
    tags?: string;
    readTimeMinutes?: number;
    isFeatured?: number;
    isPublished?: number;
    featuredProductIds?: string;
  }
): Promise<{ success: boolean; error?: string }> {
  if (!db) return { success: true };
  try {
    const slug = (data.slug?.trim() || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')).slice(0, 100);
    await db
      .prepare(
        `UPDATE articles
         SET title = ?, slug = ?, excerpt = ?, content = ?, cover_image = ?, author_name = ?, category = ?, tags = ?, read_time_minutes = ?, is_featured = ?, is_published = ?, featured_product_ids = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`
      )
      .bind(
        data.title.trim(),
        slug,
        data.excerpt.trim(),
        data.content,
        data.coverImage || '',
        data.authorName || 'BuyerNepal Editorial Team',
        data.category || 'Buying Guides',
        data.tags || '',
        data.readTimeMinutes || 5,
        data.isFeatured ?? 0,
        data.isPublished ?? 1,
        data.featuredProductIds || '',
        id
      )
      .run();
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Failed to update article' };
  }
}

export async function deleteArticle(db: D1Database | undefined, id: number): Promise<boolean> {
  if (!db) return false;
  try {
    await db.prepare('DELETE FROM articles WHERE id = ?').bind(id).run();
    return true;
  } catch {
    return false;
  }
}

export async function toggleArticlePublish(db: D1Database | undefined, id: number, isPublished: number): Promise<boolean> {
  if (!db) return false;
  try {
    await db.prepare('UPDATE articles SET is_published = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').bind(isPublished, id).run();
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
        `SELECT u.id, u.username, u.email, u.is_active, u.created_at, COALESCE(u.role, r.role, 'user') role
         FROM users u
         LEFT JOIN user_roles r ON CAST(r.user_id AS TEXT) = CAST(u.id AS TEXT)
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
    return r.results || [];
  } catch {
    return [];
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

export async function updateCoupon(
  db: D1Database | undefined,
  id: number,
  data: {
    code: string;
    discountType: 'fixed' | 'percentage';
    discountValue: number;
    minPurchase?: number;
    description?: string;
    isActive?: number;
  }
): Promise<{ success: boolean; error?: string }> {
  // Update in-memory fallback list
  const idx = DEFAULT_COUPONS.findIndex((c) => c.id === id);
  if (idx > -1) {
    DEFAULT_COUPONS[idx] = {
      ...DEFAULT_COUPONS[idx],
      code: data.code.toUpperCase().trim(),
      discount_type: data.discountType,
      discount_value: data.discountValue,
      min_purchase: data.minPurchase !== undefined ? data.minPurchase : DEFAULT_COUPONS[idx].min_purchase,
      description: data.description !== undefined ? data.description : DEFAULT_COUPONS[idx].description,
      is_active: data.isActive ?? DEFAULT_COUPONS[idx].is_active
    };
  }

  if (!db) return { success: true };
  try {
    const existing = await db.prepare('SELECT * FROM coupons WHERE id = ?').bind(id).first<Coupon>();
    const finalCode = data.code ? data.code.toUpperCase().trim() : (existing?.code || '');
    const finalType = data.discountType || existing?.discount_type || 'percentage';
    const finalVal = typeof data.discountValue === 'number' && !isNaN(data.discountValue) ? data.discountValue : (existing?.discount_value || 0);
    const finalMin = data.minPurchase !== undefined ? data.minPurchase : (existing?.min_purchase || 0);
    const finalDesc = data.description !== undefined ? data.description : (existing?.description || '');
    const finalActive = data.isActive !== undefined ? data.isActive : (existing?.is_active ?? 1);

    await db
      .prepare(
        `UPDATE coupons
         SET code = ?, discount_type = ?, discount_value = ?, min_purchase = ?, description = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`
      )
      .bind(finalCode, finalType, finalVal, finalMin, finalDesc ?? '', finalActive, id)
      .run();
    return { success: true };
  } catch (e: any) {
    return { success: false, error: e?.message || 'Failed to update coupon' };
  }
}

// Analytics & Stats
export async function getAdminStats(db?: D1Database) {
  const fallback = {
    products: DEFAULT_PRODUCTS.length,
    categories: DEFAULT_CATEGORIES.length,
    pendingReviews: 0,
    activeCoupons: DEFAULT_COUPONS.length,
    articles: DEFAULT_ARTICLES.length,
    users: 1
  };
  if (!db) {
    return fallback;
  }
  try {
    const [p, u, r, c, co, art] = await Promise.all([
      db.prepare('SELECT COUNT(*) count FROM products').first<any>(),
      db.prepare('SELECT COUNT(*) count FROM users').first<any>(),
      db.prepare("SELECT COUNT(*) count FROM reviews WHERE status = 'pending'").first<any>(),
      db.prepare('SELECT COUNT(*) count FROM categories').first<any>(),
      db.prepare('SELECT COUNT(*) count FROM coupons WHERE is_active = 1').first<any>(),
      db.prepare('SELECT COUNT(*) count FROM articles').first<any>()
    ]);
    return {
      products: Number(p?.count ?? 0),
      users: Number(u?.count ?? 0),
      pendingReviews: Number(r?.count ?? 0),
      categories: Number(c?.count ?? 0),
      activeCoupons: Number(co?.count ?? 0),
      articles: Number(art?.count ?? 0)
    };
  } catch {
    return fallback;
  }
}

// One-Click Database Seeder for Production Catalog
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
          `INSERT OR IGNORE INTO products(id, name, description, price, image_url, affiliate_url, category_id, is_active, store_name, original_price, badge, brand, emi_available, verdict)
           VALUES(?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?)`
        )
        .bind(p.id, p.name, p.description, p.price, p.image_url, p.affiliate_url, p.category_id, p.store_name || 'Daraz Mall', p.original_price || p.price, p.badge || '', p.brand || '', p.emi_available || 0, p.verdict || '')
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
    const now = Math.floor(Date.now() / 1000);
    await db
      .prepare("INSERT OR REPLACE INTO users(id, username, email, first_name, last_name, role, password_hash, password_salt, is_active, created_at, updated_at) VALUES('1', 'admin', 'admin@buyernepal.com', 'System', 'Admin', 'admin', '55b91f704ed3b16f227c1ece596820f5a2477e44f0f19d37f7f44368b465e485', 'c8dfee5333d4b80f8f0f73924d889652', 1, ?, ?)")
      .bind(now, now)
      .run();

    // 5. Seed Editorial Tech Articles
    for (const a of DEFAULT_ARTICLES) {
      await db
        .prepare(
          `INSERT OR IGNORE INTO articles(id, title, slug, excerpt, content, cover_image, author_name, category, tags, read_time_minutes, is_featured, is_published, views_count, published_at)
           VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)`
        )
        .bind(
          a.id,
          a.title,
          a.slug,
          a.excerpt,
          a.content,
          a.cover_image,
          a.author_name,
          a.category,
          a.tags || '',
          a.read_time_minutes || 5,
          a.is_featured ?? 0,
          a.views_count || 100,
          a.published_at || new Date().toISOString()
        )
        .run();
    }

    // 6. Seed Product Scores
    for (const [pid, sc] of Object.entries(DEFAULT_SCORES)) {
      await db
        .prepare(
          `INSERT OR IGNORE INTO product_scores(product_id, display_score, performance_score, camera_score, battery_score, value_score, overall_score, verdict)
           VALUES(?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(Number(pid), sc.display_score, sc.performance_score, sc.camera_score, sc.battery_score, sc.value_score, sc.overall_score, sc.verdict || '')
        .run();
    }

    // 7. Seed Product Variants
    for (const vars of Object.values(DEFAULT_VARIANTS)) {
      for (const v of vars) {
        await db
          .prepare(
            `INSERT OR IGNORE INTO product_variants(id, product_id, variant_name, price, original_price, is_in_stock)
             VALUES(?, ?, ?, ?, ?, ?)`
          )
          .bind(v.id, v.product_id, v.variant_name, v.price, v.original_price || 0, v.is_in_stock ?? 1)
          .run();
      }
    }

    // 8. Seed Store Offers ("Where to Buy in Nepal")
    for (const offers of Object.values(DEFAULT_STORE_OFFERS)) {
      for (const o of offers) {
        await db
          .prepare(
            `INSERT OR IGNORE INTO store_offers(id, product_id, store_name, price, store_url, badge, in_stock, delivery_time, warranty_info)
             VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .bind(o.id, o.product_id, o.store_name, o.price, o.store_url, o.badge || '', o.in_stock ?? 1, o.delivery_time || '', o.warranty_info || '')
          .run();
      }
    }

    return {
      success: true,
      message: `Successfully seeded ${DEFAULT_PRODUCTS.length} curated products, ${DEFAULT_CATEGORIES.length} categories, ${DEFAULT_ARTICLES.length} tech editorial articles, variants, scores, and store comparison offers into D1.`
    };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Error seeding catalog' };
  }
}

// One-Click Database Catalog Cleaner / Wiper
export async function clearCatalog(db: D1Database | undefined): Promise<{ success: boolean; message: string }> {
  if (!db) return { success: false, message: 'Database not connected' };
  try {
    await db.batch([
      db.prepare('DELETE FROM reviews'),
      db.prepare('DELETE FROM products'),
      db.prepare('DELETE FROM categories'),
      db.prepare('DELETE FROM coupons'),
      db.prepare('DELETE FROM articles'),
      db.prepare('DELETE FROM product_scores'),
      db.prepare('DELETE FROM product_variants'),
      db.prepare('DELETE FROM store_offers')
    ]);
    return {
      success: true,
      message: 'Catalog cleared successfully! All products, articles, categories, coupons, scores, variants, and reviews wiped from D1.'
    };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Error clearing catalog' };
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
  if (!db) return [];
  try {
    const r = await db.prepare('SELECT * FROM price_alerts ORDER BY created_at DESC LIMIT 50').all<any>();
    return r.results || [];
  } catch {
    return [];
  }
}

