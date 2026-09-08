import { FC } from 'hono/jsx';
import { SiteSettings } from '../../../types';

export const SettingsTab: FC<{
  settings: SiteSettings;
}> = ({ settings }) => {
  return (
    <div className="admin-card">
      <div style={{ marginBottom: '20px', borderBottom: '1px solid var(--line)', paddingBottom: '14px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
          ⚙️ Global Site Settings &amp; Localization
        </h2>
        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
          Core store identity, contact channels, and emergency announcement configuration
        </span>
      </div>

      <form method="post" action="/admin/settings">
        <input type="hidden" name="_return_tab" value="settings" />
        <input type="hidden" name="_checkbox_fields" value="announcement_active,flash_sale_enabled,emi_enabled,currency_converter_enabled,delivery_estimator_enabled,comparison_enabled" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div className="form-group">
            <label>Site Brand Title</label>
            <input name="site_title" type="text" defaultValue={settings.site_title || 'BuyerNepal'} required />
          </div>

          <div className="form-group">
            <label>Support Email Address</label>
            <input name="contact_email" type="email" defaultValue={settings.contact_email || 'contact@buyernepal.com'} />
          </div>

          <div className="form-group">
            <label>WhatsApp Support Number</label>
            <input name="whatsapp_number" type="text" defaultValue={settings.whatsapp_number || '+977-9801234567'} placeholder="+977-9801234567" />
          </div>

          <div className="form-group">
            <label>Landline / Phone</label>
            <input name="contact_phone" type="text" defaultValue={settings.contact_phone || '+977-1-4521098'} />
          </div>

          <div className="form-group">
            <label>Facebook Page URL</label>
            <input name="social_facebook" type="url" defaultValue={settings.social_facebook || ''} placeholder="https://facebook.com/buyernepal" />
          </div>

          <div className="form-group">
            <label>Instagram Profile URL</label>
            <input name="social_instagram" type="url" defaultValue={settings.social_instagram || ''} placeholder="https://instagram.com/buyernepal" />
          </div>
        </div>

        <div className="form-group" style={{ marginTop: '10px' }}>
          <label>Global SEO Meta Description</label>
          <textarea name="site_description" rows={2} defaultValue={settings.site_description || ''}></textarea>
        </div>

        {/* Global Announcement Strip */}
        <div style={{ padding: '16px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--line)', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <input
              type="checkbox"
              id="setAnnounceActive"
              name="announcement_active"
              value="1"
              defaultChecked={settings.announcement_active !== '0'}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label htmlFor="setAnnounceActive" style={{ margin: 0, cursor: 'pointer', fontWeight: 700, fontSize: '13.5px', color: 'var(--ink)' }}>
              Enable Top Announcement Banner
            </label>
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label>Banner Microcopy</label>
            <input
              name="announcement_text"
              type="text"
              defaultValue={settings.announcement_text || '🇳🇵 Nepal\'s Independent Shopping Intelligence • Real-Time Multi-Store Price Comparison & Tech Reviews'}
            />
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <button type="submit" className="primary-action" style={{ padding: '10px 24px', fontSize: '13.5px' }}>
            Save Global Settings
          </button>
        </div>
      </form>
    </div>
  );
};
