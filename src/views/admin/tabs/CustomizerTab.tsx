import { FC } from 'hono/jsx';
import { SiteSettings } from '../../../types';

export const CustomizerTab: FC<{
  settings: SiteSettings;
}> = ({ settings }) => {
  return (
    <div className="admin-card" style={{ padding: '24px 32px' }}>
      <div style={{ marginBottom: '24px', borderBottom: '1px solid var(--line)', paddingBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent)', letterSpacing: '1px', textTransform: 'uppercase' }}>
              REHub WordPress-Grade Customizer Engine
            </span>
            <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '2px 0 0', color: 'var(--ink)' }}>
              🎨 Theme Options &amp; Layout Builder
            </h2>
          </div>
          <a href="/" target="_blank" className="btn-secondary" style={{ fontSize: '12px' }}>
            Preview Storefront ↗
          </a>
        </div>
        <p style={{ margin: '8px 0 0', fontSize: '13px', color: 'var(--muted)', lineHeight: 1.5 }}>
          Control global typography, accent palettes, interactive homepage sections, navigation menus, trust microcopy, and REHub conversion modules without editing code.
        </p>
      </div>

      <form method="post" action="/admin/settings">
        <input type="hidden" name="_return_tab" value="customizer" />
        <input
          type="hidden"
          name="_checkbox_fields"
          value="hero_enabled,header_badges_enabled,trust_strip_enabled,coupons_section_enabled,categories_section_enabled,filter_bar_enabled,catalog_section_enabled,delivery_guide_section_enabled,blog_section_enabled,faq_section_enabled,editorial_banner_enabled,trending_section_enabled,brands_strip_enabled,newsletter_section_enabled,top_charts_enabled,menu_show_deals,menu_show_compare,menu_show_charts,menu_show_blog,menu_show_coupons,menu_show_stores,menu_show_brands,sticky_header_enabled,product_scores_enabled,product_emi_calculator_enabled,product_price_history_enabled,product_reviews_enabled,whatsapp_chat_enabled"
        />

        {/* 1. VISUAL THEME, PALETTE & TYPOGRAPHY */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', borderBottom: '1px solid var(--line)', paddingBottom: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🎨</span> Section 1: Visual Theme, Palette &amp; Typography
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {/* Accent Color */}
            <div className="form-group">
              <label>Primary Brand Accent Color</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="color"
                  id="accentPicker"
                  defaultValue={settings.theme_accent_color || '#dc2626'}
                  onchange="document.getElementById('accentText').value = this.value"
                  style={{ width: '42px', height: '38px', padding: '2px', borderRadius: '6px', border: '1px solid var(--line)', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  id="accentText"
                  name="theme_accent_color"
                  defaultValue={settings.theme_accent_color || '#dc2626'}
                  oninput="document.getElementById('accentPicker').value = this.value"
                  style={{ fontFamily: 'monospace', fontWeight: 700 }}
                />
              </div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                {[
                  { name: 'Red (Default)', hex: '#dc2626' },
                  { name: 'Nepal Crimson', hex: '#b91c1c' },
                  { name: 'Blue', hex: '#2563eb' },
                  { name: 'Emerald', hex: '#059669' },
                  { name: 'Purple', hex: '#7c3aed' },
                  { name: 'Amber', hex: '#d97706' }
                ].map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onclick={`document.getElementById('accentPicker').value='${c.hex}'; document.getElementById('accentText').value='${c.hex}';`}
                    style={{ width: '22px', height: '22px', borderRadius: '50%', background: c.hex, border: '2px solid #ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', cursor: 'pointer' }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Typography Font */}
            <div className="form-group">
              <label>Primary Typography Family</label>
              <select name="theme_font" defaultValue={settings.theme_font || 'Plus Jakarta Sans'}>
                <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern Editorial)</option>
                <option value="Inter">Inter (Clean Neutral UI)</option>
                <option value="System">System Native (-apple-system, BlinkMacSystemFont)</option>
              </select>
            </div>

            {/* Container Max Width */}
            <div className="form-group">
              <label>Layout Shell Max-Width</label>
              <select name="theme_container_width" defaultValue={settings.theme_container_width || '1240px'}>
                <option value="1180px">1180px (Standard)</option>
                <option value="1240px">1240px (Spacious Nepal Grid)</option>
                <option value="1320px">1320px (Ultra-Wide REHub Canvas)</option>
                <option value="100%">100% (Fluid Edge-to-Edge)</option>
              </select>
            </div>

            {/* Border Radius */}
            <div className="form-group">
              <label>Corner Border Radius</label>
              <select name="theme_border_radius" defaultValue={settings.theme_border_radius || '14px'}>
                <option value="8px">8px (Crisp Sharp)</option>
                <option value="12px">12px (Smooth Balanced)</option>
                <option value="14px">14px (REHub Modern)</option>
                <option value="18px">18px (Playful Rounded)</option>
              </select>
            </div>

            {/* Product Card Style */}
            <div className="form-group">
              <label>Product Card Visual Archetype</label>
              <select name="card_style" defaultValue={settings.card_style || 'modern'}>
                <option value="modern">Modern Floating Card (Soft Shadow)</option>
                <option value="bordered">High-Contrast Bordered (Clean 2px)</option>
                <option value="compact">Compact High-Density (Retail Shelf)</option>
              </select>
            </div>

            {/* Catalog Default View */}
            <div className="form-group">
              <label>Default Storefront View Mode</label>
              <select name="catalog_default_view" defaultValue={settings.catalog_default_view || 'grid'}>
                <option value="grid">Responsive Grid (Cards)</option>
                <option value="list">Editorial Comparison List</option>
                <option value="table">Specifications Matrix Table</option>
              </select>
            </div>

            {/* Dark Mode Default */}
            <div className="form-group">
              <label>Default Appearance Mode</label>
              <select name="dark_mode_default" defaultValue={settings.dark_mode_default || 'auto'}>
                <option value="auto">Auto (Match Visitor OS Preference)</option>
                <option value="light">Light Mode by Default</option>
                <option value="dark">Dark Mode by Default</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. HOMEPAGE SECTION SWITCHER */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', borderBottom: '1px solid var(--line)', paddingBottom: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🏗️</span> Section 2: Homepage Layout &amp; Section Switcher
          </h3>
          <p style={{ fontSize: '12.5px', color: 'var(--muted)', marginTop: '-8px', marginBottom: '14px' }}>
            Toggle homepage blocks on or off to tailor BuyerNepal for deals, tech journalism, or retail directories.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
            {[
              { id: 'hero_enabled', label: '1. Executive Hero & Search Banner' },
              { id: 'trust_strip_enabled', label: '2. 4-Card Trust & Guarantee Strip' },
              { id: 'flash_sale_enabled', label: '3. Flash Deals & Countdown Timer' },
              { id: 'coupons_section_enabled', label: '4. Active Promo Vouchers Strip' },
              { id: 'top_charts_enabled', label: '5. Top 10 Buying Charts Matrix' },
              { id: 'categories_section_enabled', label: '6. Shopping Departments Grid' },
              { id: 'filter_bar_enabled', label: '7. Multi-Category Filter Bar' },
              { id: 'catalog_section_enabled', label: '8. Curated Products Grid/List/Table' },
              { id: 'blog_section_enabled', label: '9. Tech Guides & Editorial Blog Strip' },
              { id: 'brands_strip_enabled', label: '10. Authorized Brands Directory Bar' },
              { id: 'delivery_guide_section_enabled', label: '11. Nepal Provinces Delivery Estimator' },
              { id: 'editorial_banner_enabled', label: '12. Editorial Statement Banner' },
              { id: 'faq_section_enabled', label: '13. Frequently Asked Questions (FAQ)' },
              { id: 'newsletter_section_enabled', label: '14. Newsletter & Price Alerts Box' }
            ].map((sec) => (
              <label
                key={sec.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 12px',
                  background: 'var(--bg)',
                  border: '1px solid var(--line)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--ink)'
                }}
              >
                <input
                  type="checkbox"
                  name={sec.id}
                  value="1"
                  defaultChecked={(settings as any)[sec.id] !== '0'}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span>{sec.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 3. NAVIGATION MENU MANAGER */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', borderBottom: '1px solid var(--line)', paddingBottom: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🧭</span> Section 3: Navigation Menu Manager
          </h3>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="sticky_header_enabled"
                value="1"
                defaultChecked={settings.sticky_header_enabled !== '0'}
                style={{ width: '16px', height: '16px' }}
              />
              📌 Sticky Navigation Bar on Scroll
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="header_badges_enabled"
                value="1"
                defaultChecked={settings.header_badges_enabled !== '0'}
                style={{ width: '16px', height: '16px' }}
              />
              ✨ Header Micro-Highlights Bar
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '16px' }}>
            {[
              { id: 'menu_show_deals', label: '🔥 Deals & Offers' },
              { id: 'menu_show_compare', label: '⚖️ Product Compare' },
              { id: 'menu_show_charts', label: '🏆 Top 10 Charts' },
              { id: 'menu_show_blog', label: '📰 Tech Guides' },
              { id: 'menu_show_coupons', label: '🎟️ Coupons' },
              { id: 'menu_show_stores', label: '🏪 Verified Stores' },
              { id: 'menu_show_brands', label: '🏷️ Brand Hubs' }
            ].map((m) => (
              <label
                key={m.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  background: 'var(--bg)',
                  border: '1px solid var(--line)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: 'var(--ink)'
                }}
              >
                <input
                  type="checkbox"
                  name={m.id}
                  value="1"
                  defaultChecked={(settings as any)[m.id] !== '0'}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span>{m.label}</span>
              </label>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'var(--bg)', padding: '14px', borderRadius: '8px', border: '1px solid var(--line)' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Custom Menu Link 1 (Label)</label>
              <input name="custom_nav_1_label" type="text" defaultValue={settings.custom_nav_1_label || ''} placeholder="e.g. Dashain Offers" />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Custom Menu Link 1 (URL)</label>
              <input name="custom_nav_1_url" type="text" defaultValue={settings.custom_nav_1_url || ''} placeholder="/category/smartphones or https://..." />
            </div>
          </div>
        </div>

        {/* 4. HERO MICROCOPY & NEPAL METRICS */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', borderBottom: '1px solid var(--line)', paddingBottom: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>⚡</span> Section 4: Hero Microcopy &amp; Nepal Metrics
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div className="form-group">
              <label>Hero Eyebrow Kicker</label>
              <input name="hero_eyebrow" type="text" defaultValue={settings.hero_eyebrow || '🇳🇵 NEPAL\'S PREMIER SHOPPING INTELLIGENCE'} />
            </div>
            <div className="form-group">
              <label>Headline Line 1</label>
              <input name="hero_headline_line1" type="text" defaultValue={settings.hero_headline_line1 || 'Shop smarter.'} />
            </div>
            <div className="form-group">
              <label>Headline Line 2</label>
              <input name="hero_headline_line2" type="text" defaultValue={settings.hero_headline_line2 || 'Never overpay in Nepal.'} />
            </div>
          </div>

          <div className="form-group">
            <label>Hero Subtitle Text</label>
            <textarea name="hero_subtitle" rows={2} defaultValue={settings.hero_subtitle || ''}></textarea>
          </div>

          <div className="form-group">
            <label>Search Bar Trending Tags (Comma separated)</label>
            <input name="hero_tags" type="text" defaultValue={settings.hero_tags || ''} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '10px' }}>
            <div className="form-group">
              <label>Trust Pill 1</label>
              <input name="hero_point_1" type="text" defaultValue={settings.hero_point_1 || '✓ Verified NPR Pricing'} />
            </div>
            <div className="form-group">
              <label>Trust Pill 2</label>
              <input name="hero_point_2" type="text" defaultValue={settings.hero_point_2 || '✓ Official Nepal Warranties'} />
            </div>
            <div className="form-group">
              <label>Trust Pill 3</label>
              <input name="hero_point_3" type="text" defaultValue={settings.hero_point_3 || '✓ 0% Bank Credit Card EMI'} />
            </div>
            <div className="form-group">
              <label>Trust Pill 4</label>
              <input name="hero_point_4" type="text" defaultValue={settings.hero_point_4 || '✓ Direct Seller Links'} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', background: 'var(--bg)', padding: '14px', borderRadius: '8px', border: '1px solid var(--line)', marginTop: '8px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700 }}>Stat 1</label>
              <input name="hero_stat1_num" type="text" defaultValue={settings.hero_stat1_num || '500+'} style={{ marginBottom: '4px' }} />
              <input name="hero_stat1_lbl" type="text" defaultValue={settings.hero_stat1_lbl || 'Curated Products'} />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700 }}>Stat 2</label>
              <input name="hero_stat2_num" type="text" defaultValue={settings.hero_stat2_num || '15+'} style={{ marginBottom: '4px' }} />
              <input name="hero_stat2_lbl" type="text" defaultValue={settings.hero_stat2_lbl || 'Nepal Stores'} />
            </div>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700 }}>Stat 3</label>
              <input name="hero_stat3_num" type="text" defaultValue={settings.hero_stat3_num || '100%'} style={{ marginBottom: '4px' }} />
              <input name="hero_stat3_lbl" type="text" defaultValue={settings.hero_stat3_lbl || 'Unbiased Testing'} />
            </div>
          </div>
        </div>

        {/* 5. 4-CARD TRUST & GUARANTEE STRIP */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', borderBottom: '1px solid var(--line)', paddingBottom: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🛡️</span> Section 5: 4-Card Trust &amp; Guarantee Strip
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
            {[1, 2, 3, 4].map((num) => (
              <div key={num} style={{ background: 'var(--bg)', padding: '14px', borderRadius: '8px', border: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    name={`trust_item${num}_icon`}
                    type="text"
                    defaultValue={(settings as any)[`trust_item${num}_icon`] || '🇳🇵'}
                    style={{ width: '42px', textAlign: 'center', fontSize: '16px' }}
                  />
                  <input
                    name={`trust_item${num}_title`}
                    type="text"
                    defaultValue={(settings as any)[`trust_item${num}_title`] || `Trust Point ${num}`}
                    style={{ fontWeight: 700 }}
                  />
                </div>
                <textarea
                  name={`trust_item${num}_desc`}
                  rows={2}
                  defaultValue={(settings as any)[`trust_item${num}_desc`] || ''}
                  style={{ fontSize: '12px' }}
                ></textarea>
              </div>
            ))}
          </div>
        </div>

        {/* 6. REHUB SINGLE PRODUCT PAGE CONTROLS */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', borderBottom: '1px solid var(--line)', paddingBottom: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔬</span> Section 6: REHub Single Product Page &amp; Conversion Modules
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '16px' }}>
            {[
              { id: 'product_scores_enabled', label: '📊 Lab Benchmark Radar Scorecard (0-10 Rating)' },
              { id: 'product_emi_calculator_enabled', label: '💳 0% Nepal Bank EMI Calculator Widget' },
              { id: 'product_price_history_enabled', label: '📈 6-Month Nepal Price History Interactive Chart' },
              { id: 'product_reviews_enabled', label: '⭐ Community Reviews & Helpful Voting Engine' },
              { id: 'comparison_enabled', label: '⚖️ Floating Multi-Product Comparison Dock' },
              { id: 'whatsapp_chat_enabled', label: '💬 Floating WhatsApp Nepal Buyer Concierge' }
            ].map((ctrl) => (
              <label
                key={ctrl.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 12px',
                  background: 'var(--bg)',
                  border: '1px solid var(--line)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: 'var(--ink)'
                }}
              >
                <input
                  type="checkbox"
                  name={ctrl.id}
                  value="1"
                  defaultChecked={(settings as any)[ctrl.id] !== '0'}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span>{ctrl.label}</span>
              </label>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', background: 'var(--bg)', padding: '14px', borderRadius: '8px', border: '1px solid var(--line)' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Affiliate Redirect URL Cloak Prefix</label>
              <input name="affiliate_cloaking_prefix" type="text" defaultValue={settings.affiliate_cloaking_prefix || '/go/'} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Google Analytics 4 Measurement ID</label>
              <input name="google_analytics_id" type="text" defaultValue={settings.google_analytics_id || ''} placeholder="G-XXXXXXXXXX" />
            </div>
          </div>
        </div>

        {/* 7. FOOTER, DISCLOSURES & CUSTOM CSS */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--ink)', borderBottom: '1px solid var(--line)', paddingBottom: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📝</span> Section 7: Footer, Disclosures &amp; Custom CSS
          </h3>

          <div className="form-group">
            <label>Footer About Text</label>
            <textarea name="footer_about_text" rows={2} defaultValue={settings.footer_about_text || ''}></textarea>
          </div>

          <div className="form-group">
            <label>FTC &amp; Affiliate Commission Disclosure</label>
            <textarea name="footer_disclosure_text" rows={3} defaultValue={settings.footer_disclosure_text || ''}></textarea>
          </div>

          <div className="form-group">
            <label>Copyright Notice</label>
            <input name="copyright_text" type="text" defaultValue={settings.copyright_text || ''} />
          </div>

          <div className="form-group">
            <label>Custom CSS Override (Injected directly into &lt;head&gt;)</label>
            <textarea
              name="custom_css"
              rows={4}
              defaultValue={settings.custom_css || ''}
              placeholder="/* Add custom styling rules here e.g. .store-header { background: #000; } */"
              style={{ fontFamily: 'monospace', fontSize: '12.5px' }}
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div style={{ position: 'sticky', bottom: '20px', background: 'var(--card-bg)', padding: '16px 20px', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)', border: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 50 }}>
          <div>
            <strong style={{ fontSize: '14px', color: 'var(--ink)' }}>Ready to deploy visual changes?</strong>
            <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'block' }}>Changes take effect across the storefront instantly.</span>
          </div>
          <button type="submit" className="primary-action" style={{ padding: '10px 24px', fontSize: '14px', background: 'var(--accent)' }}>
            💾 Save &amp; Publish REHub Theme Options
          </button>
        </div>
      </form>
    </div>
  );
};
