import { FC } from 'hono/jsx';

export const AdminStatCard: FC<{
  label: string;
  value: string | number;
  trend: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  strokeColor: string;
  sparklinePoints?: string;
}> = ({
  label,
  value,
  trend,
  icon,
  iconBg,
  iconColor,
  strokeColor,
  sparklinePoints = 'M2 18 L15 14 L28 16 L42 8 L58 4'
}) => {
  return (
    <div className="admin-stat-card">
      <div className="admin-stat-top">
        <span className="admin-stat-label">{label}</span>
        <span className="admin-stat-icon-wrap" style={{ background: iconBg, color: iconColor }}>
          {icon}
        </span>
      </div>
      <strong className="admin-stat-value">{value}</strong>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="admin-stat-trend">{trend}</span>
        <svg width="60" height="24" viewBox="0 0 60 24" fill="none">
          <path d={sparklinePoints} stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};
