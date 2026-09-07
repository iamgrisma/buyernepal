-- Migration 0005: Populate Initial Editorial Articles, Product Scores, Variants, and Store Offers

-- 1. Insert Articles
INSERT OR IGNORE INTO articles (id, title, slug, excerpt, content, cover_image, author_name, category, tags, read_time_minutes, is_featured, is_published, views_count, published_at)
VALUES
(
  1,
  'Best Mobile Phones Under Rs. 30,000 in Nepal (2026 Updated)',
  'best-mobile-phones-under-30000-nepal',
  'A rigorous evaluation of budget smartphones available in Nepal offering AMOLED displays, 50MP OIS cameras, 5000mAh batteries, and official brand warranty.',
  'Finding the ideal smartphone under Rs. 30,000 in Nepal is tricky with fluctuating retail prices. In 2026, budget buyers no longer need to compromise on core user experience: 120Hz refresh rates, bright AMOLED panels, 50MP Sony sensors with Optical Image Stabilization (OIS), and 45W+ fast charging have become standard in this competitive price tier.

### What Should You Expect Under Rs. 30,000 in Nepal?
1. **Display Quality:** Full HD+ AMOLED displays with at least 120Hz refresh rate and Gorilla Glass protection. Peak brightness should comfortably exceed 1,200 nits to handle direct sunlight during bright Kathmandu afternoons.
2. **Processing Power:** MediaTek Dimensity 7050 / 7200 or Snapdragon 6 Gen 1 / 7s Gen 2 chipsets. These provide reliable 60fps daily multitasking, social media feeds, and moderate gaming in PUBG Mobile / Free Fire.
3. **Official Brand Warranty:** Make sure you purchase from authorized Nepali distributors offering genuine VAT invoices for authentic manufacturer warranty coverage.

### Top Recommendation: Xiaomi Redmi Note 13 / 14 Series
The Redmi Note lineup continues to offer unmatched value for money in Nepal. With a razor-thin bezel AMOLED panel and a dependable 5,000 mAh cell, it dominates the sub-30k bracket.

### Best for Clean Software: Samsung Galaxy M-Series / A-Series
If you despise bloatware and prioritize long-term security patches, Samsung''s official Nepal units guarantee up to 4 years of OS upgrades with Knox security.

### Verdict
Before buying, compare offline rates in New Road with verified Daraz Mall authorized brand outlets. Always verify the VAT bill to ensure hassle-free warranty claim at authorized service centers.',
  'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=1200&auto=format&fit=crop&q=80',
  'BuyerNepal Editorial Team',
  'Buying Guides',
  'smartphones, buying-guide, budget-phones, nepal-tech',
  6,
  1,
  1,
  1420,
  '2026-09-01 10:00:00'
),
(
  2,
  'Apple iPhone 16 Pro Max Full Review: Worth the Nepali Price Tag?',
  'apple-iphone-16-pro-max-nepal-review',
  'Detailed testing on A18 Pro silicon, Camera Control tactile sensor, Kathmandu battery life, and whether official GenNext Nepal pricing justifies the upgrade.',
  'The Apple iPhone 16 Pro Max has landed in Nepal via authorized distributor GenNext. With its grade-5 titanium architecture, larger 6.9-inch display, tactile Camera Control button, and the 3nm A18 Pro chipset, it claims the flagship crown.

### Design & Build: Subtle Titanium Refinements
The aerospace-grade titanium frame with contoured borders feels remarkably lighter in the hand than older stainless steel iterations. The display bezels have shrunk to microscopic levels, making the 6.9-inch panel feel immersive without excessive bulk.

### Camera Innovations: 4K 120fps & Camera Control
The dedicated Camera Control button on the lower right flank brings DSLR-like tactile half-press focus and swipe gesture zoom. For creators in Nepal shooting 4K 120fps ProRes log footage, the dynamic range in challenging lighting conditions (such as high-altitude Pokhara or Everest viewpoints) is astonishing.

### Battery Life Champion
In our real-world Kathmandu network testing (alternating between NTC 5G, Ncell 4G, and fiber Wi-Fi), the 16 Pro Max delivered an astonishing 10.5 hours of screen-on time, easily lasting two full workdays.

### The Nepal Price Verdict: Should You Buy?
Priced at Rs. 214,999 for the 256GB base variant, it is unquestionably a premium investment. However, with official GenNext 1-year warranty, 1-year breakage insurance, and genuine VAT bill, it ensures complete peace of mind and authorized service center support.',
  'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1200&auto=format&fit=crop&q=80',
  'Bikash Adhikari (Senior Tech Editor)',
  'Smartphone Reviews',
  'apple, iphone-16-pro-max, flagship, review, gennext',
  8,
  1,
  1,
  2890,
  '2026-09-03 14:30:00'
),
(
  3,
  'Best Tech Deals in Nepal: How to Find Real Discounts & Avoid Fake Sales',
  'best-tech-deals-nepal-shopping-guide',
  'Proven tips for shopping smarter in Nepal: price history tracking, bank discount days, festival sale strategies, and verified dealer warranties.',
  'Finding genuine discounts on gadgets and tech in Nepal can often be confusing. Between inflated original prices and temporary sales campaigns, knowing when a deal is truly worth it is an essential skill.

### 1. Track Price History Before Buying
Never trust a "50% OFF" banner blindly. Retailers sometimes raise prices just days before a major sale to make discounts look larger. Always check historical prices and compare current rates against multiple stores like Daraz Mall, Oliz Store, and local New Road retailers.

### 2. Leverage Bank Card & Wallet Discount Days
Most commercial banks in Nepal (Nabil, Global IME, NIC Asia, Himalayan Bank) and digital wallets (eSewa, Khalti) have dedicated partner discount days offering 10% to 15% instant discounts or cashback. 

### 3. Check for 0% EMI Schemes
If you are purchasing a flagship laptop or smartphone, many authorized distributors offer 0% interest EMI options on commercial bank credit cards. This lets you break down the purchase into 6, 12, or 18 easy monthly installments without extra markup.

### 4. Insist on Genuine VAT Invoices
Always ask the retailer for an official VAT/PAN invoice. This is your primary proof of purchase required by official brand service centers for honoring warranty coverage in Nepal.',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
  'BuyerNepal Shopping Desk',
  'Buying Guides',
  'deals, discounts, shopping-tips, nepal, vouchers',
  5,
  0,
  1,
  5120,
  '2026-08-28 09:15:00'
),
(
  4,
  'Best Laptops for Engineering & IT Students in Nepal (2026)',
  'best-laptops-engineering-it-students-nepal',
  'Top workstation and ultrabook recommendations in Nepal for coding, AutoCAD, machine learning, and university assignments with verified warranty.',
  'Choosing a laptop for Computer Engineering, BCA, BSc CSIT, or Mechanical Engineering in Nepal demands a careful balance of CPU performance, RAM expandability, battery life for campus lectures, and robust local warranty support.

### Essential Specifications Checklist
- **CPU:** Minimum AMD Ryzen 5 7000/8000 series or Intel Core i5 13th/14th Gen or Apple M-series.
- **RAM:** 16GB is the baseline in 2026. For Docker containers, virtual machines, and IDE compilation, 8GB will cause severe stuttering.
- **Storage:** 512GB NVMe SSD minimum, preferably with a secondary M.2 expansion slot.
- **Display:** Matte anti-glare IPS display with at least 300 nits brightness.

### Top Pick for Portability & Battery: Apple MacBook Air M3
For CSIT, BCA, and software engineering students, the MacBook Air M3 provides an unbeatable 16+ hours of battery life, allowing you to attend college without carrying a bulky charging brick.

### Top Pick for 3D Modeling & Gaming: Lenovo LOQ / ASUS TUF Gaming
If your curriculum involves SolidWorks, AutoCAD 3D, Blender, or heavy GPU workloads, the Lenovo LOQ equipped with RTX 4050/4060 graphics is the price-to-performance champion in Kathmandu.',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&auto=format&fit=crop&q=80',
  'Prajwol Gautam (Computing Analyst)',
  'Laptop Guides',
  'laptops, engineering, students, macbook, lenovo, nepal',
  7,
  0,
  1,
  3100,
  '2026-08-20 11:00:00'
);

-- 2. Insert Product Scores
INSERT OR REPLACE INTO product_scores (product_id, display_score, performance_score, camera_score, battery_score, value_score, overall_score, verdict)
VALUES
(1, 9.8, 9.9, 9.7, 9.5, 8.3, 9.4, 'The definitive flagship smartphone in Nepal for creators, gamers, and executives demanding peak performance.'),
(2, 9.7, 9.8, 9.8, 9.2, 8.4, 9.4, 'The absolute peak of Android smartphones in Nepal with unparalleled zoom cameras and Galaxy AI productivity.'),
(3, 9.6, 9.6, 9.5, 9.1, 8.8, 9.3, 'Cleanest Android software with unbeatable HDR computational photography and 7 years of OS updates.'),
(4, 9.5, 9.4, 8.8, 9.4, 9.2, 9.3, 'A sleek everyday ultraportable delivering all-day battery life and incredible build quality.'),
(5, 9.6, 9.6, 9.0, 9.3, 8.7, 9.2, 'Incredible M3 Pro silicon horsepower in a durable, road-ready chassis built for creative professionals.');

-- 3. Insert Product Variants
INSERT OR IGNORE INTO product_variants (product_id, variant_name, price, original_price, sku, is_in_stock)
VALUES
(1, '256GB - Desert Titanium', 214999, 224999, 'IP16PM-256-DES', 1),
(1, '512GB - Natural Titanium', 248999, 259999, 'IP16PM-512-NAT', 1),
(1, '1TB - Black Titanium', 282999, 294999, 'IP16PM-1TB-BLK', 1),
(2, '12GB / 256GB - Titanium Gray', 184999, 199999, 'S24U-256-GRY', 1),
(2, '12GB / 512GB - Titanium Black', 199999, 214999, 'S24U-512-BLK', 1),
(2, '12GB / 1TB - Titanium Violet', 229999, 244999, 'S24U-1TB-VIO', 1),
(4, 'M3 / 8GB / 256GB - Space Gray', 154999, 169999, 'MBA-M3-8-256', 1),
(4, 'M3 / 16GB / 512GB - Midnight Blue', 184999, 199999, 'MBA-M3-16-512', 1),
(4, 'M3 / 24GB / 512GB - Starlight', 219999, 234999, 'MBA-M3-24-512', 1);

-- 4. Insert Store Offers
INSERT OR IGNORE INTO store_offers (product_id, store_name, price, store_url, badge, in_stock, delivery_time, warranty_info)
VALUES
(1, 'Oliz Store Nepal', 214999, 'https://www.olizstore.com', 'Authorized Apple Reseller', 1, '24-48 Hours Inside Valley', 'Official GenNext 1-Yr Warranty + Breakage Insurance'),
(1, 'EvoStore Official', 214999, 'https://www.evostore.com.np', 'Apple Authorized Premium Reseller', 1, 'Same Day Kathmandu Valley', '1 Year Official Apple Warranty with VAT Bill'),
(1, 'Daraz Mall (Apple Flagship)', 212499, 'https://www.daraz.com.np', 'Daraz Mall Verified', 1, '2-3 Days Nepalwide Delivery', '100% Authentic with 14 Days Return Guarantee'),
(1, 'New Road Authorized Outlet', 209500, 'https://buyernepal.com', 'Physical Store Pickup', 1, 'Instant Handover in New Road', 'Official VAT Bill with 1 Year Authorized Warranty'),
(2, 'Samsung Plaza Nepal', 184999, 'https://www.samsung.com/np', 'Official Samsung Brand Shop', 1, '24 Hours Inside Kathmandu', 'Official IMS 1 Year Warranty + 1 Year Screen Protection'),
(2, 'Daraz Mall (Samsung Official)', 182500, 'https://www.daraz.com.np', 'Daraz Mall Official', 1, '2-4 Days Nepalwide Delivery', '100% Genuine with Bank Voucher Discounts'),
(2, 'Oliz Store Kathmandu', 184999, 'https://www.olizstore.com', 'Authorized Partner', 1, '24-48 Hours Delivery', '1 Year Full Nepal Official Warranty');
