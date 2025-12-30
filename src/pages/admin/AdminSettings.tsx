import { useEffect, useState } from 'react';
import { toast } from '../../components/ui/Toaster';

interface Settings {
  [key: string]: string;
}

const settingsConfig = [
  { key: 'site_title', label: 'Site Title', type: 'text', placeholder: 'BuyerNepal' },
  { key: 'site_description', label: 'Site Description', type: 'textarea', placeholder: 'Your site description' },
  { key: 'site_logo', label: 'Logo URL', type: 'url', placeholder: 'https://...' },
  { key: 'site_favicon', label: 'Favicon URL', type: 'url', placeholder: 'https://...' },
  { key: 'contact_email', label: 'Contact Email', type: 'email', placeholder: 'contact@example.com' },
  { key: 'social_facebook', label: 'Facebook URL', type: 'url', placeholder: 'https://facebook.com/...' },
  { key: 'social_twitter', label: 'Twitter URL', type: 'url', placeholder: 'https://twitter.com/...' },
  { key: 'social_instagram', label: 'Instagram URL', type: 'url', placeholder: 'https://instagram.com/...' },
  { key: 'homepage_html', label: 'Custom Homepage HTML', type: 'code', placeholder: '<div>Custom content</div>' },
  { key: 'footer_html', label: 'Custom Footer HTML', type: 'code', placeholder: '<p>Footer content</p>' },
  { key: 'meta_keywords', label: 'Meta Keywords', type: 'text', placeholder: 'keyword1, keyword2' },
  { key: 'google_analytics_id', label: 'Google Analytics ID', type: 'text', placeholder: 'G-XXXXXXXXXX' },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings', { credentials: 'include' });
      const data: any = await res.json();
      const settingsMap: Settings = {};
      (data.settings || []).forEach((s: { key: string; value: string }) => {
        settingsMap[s.key] = s.value;
      });
      setSettings(settingsMap);
    } catch (error) {
      toast('Failed to load settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ settings }),
      });
      if (!res.ok) throw new Error('Failed to save');
      toast('Settings saved!', 'success');
    } catch (error) {
      toast('Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Configure your site settings</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn btn-primary">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">General Settings</h2>
          <div className="grid gap-4">
            {settingsConfig.slice(0, 5).map((config) => (
              <div key={config.key}>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {config.label}
                </label>
                {config.type === 'textarea' ? (
                  <textarea
                    value={settings[config.key] || ''}
                    onChange={(e) => handleChange(config.key, e.target.value)}
                    className="input min-h-[80px]"
                    placeholder={config.placeholder}
                  />
                ) : (
                  <input
                    type={config.type}
                    value={settings[config.key] || ''}
                    onChange={(e) => handleChange(config.key, e.target.value)}
                    className="input"
                    placeholder={config.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Social Links</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {settingsConfig.slice(5, 8).map((config) => (
              <div key={config.key}>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {config.label}
                </label>
                <input
                  type={config.type}
                  value={settings[config.key] || ''}
                  onChange={(e) => handleChange(config.key, e.target.value)}
                  className="input"
                  placeholder={config.placeholder}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Custom Content */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Custom Content</h2>
          <div className="grid gap-4">
            {settingsConfig.slice(8, 10).map((config) => (
              <div key={config.key}>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {config.label}
                </label>
                <textarea
                  value={settings[config.key] || ''}
                  onChange={(e) => handleChange(config.key, e.target.value)}
                  className="input font-mono text-sm min-h-[120px]"
                  placeholder={config.placeholder}
                />
              </div>
            ))}
          </div>
        </div>

        {/* SEO & Analytics */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">SEO & Analytics</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {settingsConfig.slice(10).map((config) => (
              <div key={config.key}>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {config.label}
                </label>
                <input
                  type={config.type}
                  value={settings[config.key] || ''}
                  onChange={(e) => handleChange(config.key, e.target.value)}
                  className="input"
                  placeholder={config.placeholder}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
