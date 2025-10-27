// app/admin/dashboard/page.tsx
'use client';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Loader2, DollarSign, MousePointerClick, Package } from 'lucide-react';

// Fetch dashboard summary
function useAnalyticsSummary() {
  return useQuery({
    queryKey: ['adminAnalyticsSummary'],
    queryFn: async () => {
      // This hits your GET /api/admin/analytics/summary endpoint
      // You need to build this endpoint in your Hono API
      const { data } = await api.get('/api/admin/analytics/summary');
      return data;
    },
  });
}

export default function AdminDashboard() {
  const { data, isLoading, isError } = useAnalyticsSummary();

  if (isLoading) {
    return <Loader2 className="h-8 w-8 animate-spin" />;
  }

  if (isError) {
    return (
      <p className="text-red-600">
        Error loading analytics. Did you build the summary endpoint?
      </p>
    );
  }

  // Mock data if endpoint isn't built yet
  const summary = data || {
    totalClicks: 0,
    topProducts: [],
    topLinks: [],
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          title="Total Clicks"
          value={summary.totalClicks}
          icon={<MousePointerClick className="h-6 w-6 text-blue-600" />}
        />
        <StatCard
          title="Total Products"
          value={summary.topProducts.length} // Just an example
          icon={<Package className="h-6 w-6 text-green-600" />}
        />
        <StatCard
          title="Est. Revenue"
          value="Rs. 0" // You don't have this data yet
          icon={<DollarSign className="h-6 w-6 text-yellow-600" />}
        />
      </div>

      {/* Top Lists */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="text-lg font-semibold">Top Products</h2>
          <ul className="mt-4 space-y-2">
            {summary.topProducts.map((product: any) => (
              <li key={product.id} className="flex justify-between">
                <span>{product.title}</span>
                <span className="font-medium">{product.click_count} clicks</span>
              </li>
            ))}
            {summary.topProducts.length === 0 && (
              <p className="text-gray-500">No data yet.</p>
            )}
          </ul>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="text-lg font-semibold">Top Links</h2>
          <ul className="mt-4 space-y-2">
            {summary.topLinks.map((link: any) => (
              <li key={link.id} className="flex justify-between">
                <code>/refer/{link.slug}</code>
                <span className="font-medium">{link.click_count} clicks</span>
              </li>
            ))}
            {summary.topLinks.length === 0 && (
              <p className="text-gray-500">No data yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="rounded-full bg-gray-100 p-3">{icon}</div>
      </div>
    </div>
  );
}
