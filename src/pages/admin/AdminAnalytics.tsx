import { useEffect, useState } from 'react';
import { toast } from '../../components/ui/Toaster';

interface AnalyticsData {
  total_clicks: number;
  clicks_today: number;
  clicks_week: number;
  clicks_month: number;
  top_products: Array<{
    product_id: number;
    product_name: string;
    clicks: number;
  }>;
  clicks_by_day: Array<{
    date: string;
    clicks: number;
  }>;
}

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7');

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  const loadAnalytics = async () => {
    try {
      const res = await fetch(`/api/admin/analytics?days=${dateRange}`, { credentials: 'include' });
      const result = await res.json();
      setData(result);
    } catch (error) {
      toast('Failed to load analytics', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const maxClicks = Math.max(...(data?.clicks_by_day?.map((d) => d.clicks) || [1]));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Track your site performance</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="input w-40"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <p className="text-sm text-muted-foreground mb-1">Total Clicks</p>
          <p className="text-3xl font-bold text-foreground">{data?.total_clicks || 0}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-muted-foreground mb-1">Today</p>
          <p className="text-3xl font-bold text-primary">{data?.clicks_today || 0}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-muted-foreground mb-1">This Week</p>
          <p className="text-3xl font-bold text-foreground">{data?.clicks_week || 0}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-muted-foreground mb-1">This Month</p>
          <p className="text-3xl font-bold text-foreground">{data?.clicks_month || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clicks Chart */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Clicks Over Time</h3>
          {data?.clicks_by_day && data.clicks_by_day.length > 0 ? (
            <div className="space-y-2">
              {data.clicks_by_day.map((day) => (
                <div key={day.date} className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-20">
                    {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all"
                      style={{ width: `${(day.clicks / maxClicks) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground w-12 text-right">
                    {day.clicks}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No data available</p>
          )}
        </div>

        {/* Top Products */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Products</h3>
          {data?.top_products && data.top_products.length > 0 ? (
            <div className="space-y-3">
              {data.top_products.map((product, index) => (
                <div
                  key={product.product_id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <span className="text-lg font-bold text-primary w-8">#{index + 1}</span>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{product.product_name}</p>
                    <p className="text-sm text-muted-foreground">{product.clicks} clicks</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}
