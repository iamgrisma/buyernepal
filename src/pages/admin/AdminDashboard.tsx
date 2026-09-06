import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Stats {
  products: number;
  categories: number;
  users: number;
  pendingReviews: number;
  activeCoupons: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/analytics/stats', { credentials: 'include' })
      .then((r) => r.ok ? (r.json() as Promise<{ stats: Stats }>) : Promise.reject(new Error('Failed to load stats')))
      .then((data: { stats: Stats }) => setStats(data.stats))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Products', value: stats?.products || 0, link: '/admin/products', color: 'bg-primary/10 text-primary' },
    { label: 'Categories', value: stats?.categories || 0, link: '/admin/categories', color: 'bg-success/10 text-success' },
    { label: 'Users', value: stats?.users || 0, link: '/admin/users', color: 'bg-warning/10 text-warning' },
    { label: 'Pending Reviews', value: stats?.pendingReviews || 0, link: '/admin/reviews', color: 'bg-accent/10 text-accent-foreground' },
    { label: 'Active Coupons', value: stats?.activeCoupons || 0, link: '/admin/coupons', color: 'bg-secondary text-secondary-foreground' },
  ];

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" /></div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link key={stat.label} to={stat.link} className="card p-6 hover:shadow-lg transition-shadow">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stat.color} mb-4`}><span className="text-xl font-bold">{stat.value}</span></div>
            <h3 className="text-lg font-semibold text-foreground">{stat.label}</h3>
            <p className="text-sm text-muted-foreground">View all →</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link to="/admin/products" className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"><span className="font-medium">Add New Product</span><p className="text-sm text-muted-foreground">Create a new product listing</p></Link>
            <Link to="/admin/categories" className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"><span className="font-medium">Manage Categories</span><p className="text-sm text-muted-foreground">Organize your product categories</p></Link>
            <Link to="/admin/settings" className="block p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"><span className="font-medium">Site Settings</span><p className="text-sm text-muted-foreground">Configure your site settings</p></Link>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-success/10"><span className="text-foreground">Database</span><span className="badge badge-success">Connected</span></div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-success/10"><span className="text-foreground">API</span><span className="badge badge-success">Operational</span></div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted"><span className="text-foreground">Version</span><span className="text-muted-foreground">1.0.0</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
