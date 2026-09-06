import { useEffect, useState } from 'react';

interface Day { date: string; events: number; }
interface AnalyticsResponse { analytics: Day[]; }

export default function AdminAnalytics() {
  const [days, setDays] = useState<Day[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7');

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/analytics?days=${dateRange}`, { credentials: 'include' })
      .then((r) => r.ok ? (r.json() as Promise<AnalyticsResponse>) : Promise.reject(new Error('Failed to load analytics')))
      .then((result: AnalyticsResponse) => setDays(result.analytics || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [dateRange]);

  const total = days.reduce((sum, day) => sum + Number(day.events || 0), 0);
  const max = Math.max(...days.map((day) => Number(day.events || 0)), 1);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-3xl font-bold text-foreground">Analytics</h1><p className="text-muted-foreground">Track site activity</p></div>
        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="input w-40">
          <option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6"><p className="text-sm text-muted-foreground mb-1">Events in range</p><p className="text-3xl font-bold text-foreground">{total}</p></div>
        <div className="card p-6"><p className="text-sm text-muted-foreground mb-1">Days with activity</p><p className="text-3xl font-bold text-primary">{days.length}</p></div>
        <div className="card p-6"><p className="text-sm text-muted-foreground mb-1">Average per active day</p><p className="text-3xl font-bold text-foreground">{days.length ? (total / days.length).toFixed(1) : '0'}</p></div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Activity by Day</h3>
        {days.length ? <div className="space-y-3">{days.map((day) => <div key={day.date} className="flex items-center gap-3"><span className="text-sm text-muted-foreground w-24">{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span><div className="flex-1 bg-muted rounded-full h-6 overflow-hidden"><div className="bg-primary h-full rounded-full" style={{ width: `${(Number(day.events) / max) * 100}%` }} /></div><span className="text-sm font-medium text-foreground w-12 text-right">{day.events}</span></div>)}</div> : <p className="text-center text-muted-foreground py-8">No analytics data yet.</p>}
      </div>
    </div>
  );
}
