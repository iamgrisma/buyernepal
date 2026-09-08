import { FC } from 'hono/jsx';
import { Vehicle, SiteSettings } from '../types';
import { Layout } from './layout';
import { formatLakhs } from './vehicles';

export const VehiclesCompareView: FC<{
  allVehicles: Vehicle[];
  selectedVehicles: Vehicle[];
  settings: SiteSettings;
}> = ({ allVehicles, selectedVehicles, settings }) => {
  return (
    <Layout
      title="Compare Electric Cars & Vehicles in Nepal 2026 | BuyerNepal"
      description="Head-to-head technical comparison of electric cars and vehicles in Nepal. Compare battery range, price in Lakhs, ground clearance, auto loan EMI, and distributor warranty."
      settings={settings}
      activeSlug="vehicles"
    >
      <div className="store-shell" style={{ padding: '24px 0 60px' }}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumbs" style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', color: 'var(--muted)', marginBottom: '18px' }}>
          <a href="/" style={{ color: 'var(--muted)' }}>Home</a>
          <span>/</span>
          <a href="/vehicles" style={{ color: 'var(--muted)' }}>Vehicles &amp; EV</a>
          <span>/</span>
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Head-to-Head Comparison</span>
        </nav>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            SIDE-BY-SIDE EVALUATION
          </span>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--ink)', margin: '4px 0 10px', letterSpacing: '-0.6px' }}>
            Compare Nepal Vehicles &amp; Electric Cars
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--muted)', margin: 0 }}>
            Compare up to 4 vehicles side by side. Evaluate verified Nepal prices, battery pack size, real-world WLTP range, and 190mm ground clearance.
          </p>
        </div>

        {/* Vehicle Picker Toolbar */}
        <div
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--line)',
            borderRadius: '14px',
            padding: '20px',
            marginBottom: '28px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px', color: 'var(--ink)' }}>
            Select Vehicles to Compare (Currently comparing {selectedVehicles.length} of 4):
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {allVehicles.map((v) => {
              const isSelected = selectedVehicles.some((s) => s.id === v.id);
              return (
                <a
                  key={v.id}
                  href={
                    isSelected
                      ? `/vehicles/compare?ids=${selectedVehicles.filter((s) => s.id !== v.id).map((s) => s.id).join(',')}`
                      : `/vehicles/compare?ids=${[...selectedVehicles.map((s) => s.id), v.id].slice(0, 4).join(',')}`
                  }
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    background: isSelected ? 'var(--accent)' : 'var(--bg)',
                    color: isSelected ? '#ffffff' : 'var(--ink)',
                    border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--line)'}`
                  }}
                >
                  <span>{isSelected ? '✓' : '+'}</span>
                  <span>{v.name}</span>
                  <small style={{ opacity: 0.85 }}>({formatLakhs(v.price_npr)})</small>
                </a>
              );
            })}
          </div>
        </div>

        {/* Side by Side Comparison Table */}
        {selectedVehicles.length > 0 ? (
          <div
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--line)',
              borderRadius: '16px',
              overflowX: 'auto',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: '700px' }}>
              <thead>
                <tr style={{ background: 'var(--bg)', borderBottom: '2px solid var(--line)' }}>
                  <th style={{ padding: '16px', textAlign: 'left', width: '220px', color: 'var(--muted)', fontWeight: 700 }}>
                    Vehicle Attribute
                  </th>
                  {selectedVehicles.map((v) => (
                    <th key={v.id} style={{ padding: '16px', textAlign: 'center', verticalAlign: 'top', minWidth: '220px' }}>
                      <img
                        src={v.image_url}
                        alt={v.name}
                        style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px' }}
                      />
                      <strong style={{ display: 'block', fontSize: '15px', color: 'var(--ink)', lineHeight: 1.3 }}>
                        {v.name}
                      </strong>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--accent)', marginTop: '4px' }}>
                        {formatLakhs(v.price_npr)}
                      </div>
                      <a
                        href={`/vehicles/${v.slug}`}
                        className="primary-action"
                        style={{ display: 'inline-flex', fontSize: '11px', padding: '6px 12px', marginTop: '8px' }}
                      >
                        Full Details →
                      </a>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Fuel & Body Type */}
                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--muted)' }}>Powertrain &amp; Body</td>
                  {selectedVehicles.map((v) => (
                    <td key={v.id} style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700 }}>
                      {v.fuel_type.toUpperCase()} • {v.vehicle_type.toUpperCase()}
                    </td>
                  ))}
                </tr>

                {/* Ground Clearance */}
                <tr style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--ink)' }}>🏔️ Ground Clearance</td>
                  {selectedVehicles.map((v) => (
                    <td key={v.id} style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 800, color: v.ground_clearance_mm >= 185 ? '#059669' : 'var(--ink)' }}>
                      {v.ground_clearance_mm} mm {v.ground_clearance_mm >= 185 ? '✓ (High)' : ''}
                    </td>
                  ))}
                </tr>

                {/* Range / Mileage */}
                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--muted)' }}>🔋 Range / Mileage</td>
                  {selectedVehicles.map((v) => (
                    <td key={v.id} style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700 }}>
                      {v.fuel_type === 'ev' ? `${v.range_km} km (WLTP)` : `${v.fuel_economy_kmpl} kmpl`}
                    </td>
                  ))}
                </tr>

                {/* Battery / Engine Capacity */}
                <tr style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--muted)' }}>Battery / Engine Capacity</td>
                  {selectedVehicles.map((v) => (
                    <td key={v.id} style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700 }}>
                      {v.fuel_type === 'ev' ? `${v.battery_capacity_kwh} kWh` : `${v.engine_displacement_cc} cc`}
                    </td>
                  ))}
                </tr>

                {/* Motor / Power */}
                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--muted)' }}>⚡ Motor / Peak Power</td>
                  {selectedVehicles.map((v) => (
                    <td key={v.id} style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700 }}>
                      {v.motor_power_kw ? `${v.motor_power_kw} kW (${Math.round(v.motor_power_kw * 1.341)} hp)` : (v.transmission || 'Manual')}
                    </td>
                  ))}
                </tr>

                {/* Fast Charging */}
                <tr style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--muted)' }}>DC Fast Charging</td>
                  {selectedVehicles.map((v) => (
                    <td key={v.id} style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px' }}>
                      {v.charging_time_dc_fast || 'Standard Fuel / N/A'}
                    </td>
                  ))}
                </tr>

                {/* NRB Auto Loan Down Payment */}
                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--ink)' }}>🏦 NRB Min Down Payment</td>
                  {selectedVehicles.map((v) => {
                    const isEv = v.fuel_type === 'ev';
                    const down = isEv ? Math.round(v.price_npr * 0.2) : Math.round(v.price_npr * 0.5);
                    return (
                      <td key={v.id} style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 800, color: 'var(--ink)' }}>
                        {isEv ? '20% Down: ' : '50% Down: '}{formatLakhs(down)}
                      </td>
                    );
                  })}
                </tr>

                {/* Est Monthly EMI */}
                <tr style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--ink)' }}>💳 Est. Monthly EMI (7 Yrs)</td>
                  {selectedVehicles.map((v) => (
                    <td key={v.id} style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 800, color: 'var(--accent)', fontSize: '14px' }}>
                      {v.auto_loan_est_monthly_emi ? `Rs. ${v.auto_loan_est_monthly_emi.toLocaleString('en-IN')}/mo` : 'N/A'}
                    </td>
                  ))}
                </tr>

                {/* Showroom Warranty */}
                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--muted)' }}>🛡️ Battery / Vehicle Warranty</td>
                  {selectedVehicles.map((v) => (
                    <td key={v.id} style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px' }}>
                      {v.warranty_battery || v.warranty_vehicle || 'Official Nepal Warranty'}
                    </td>
                  ))}
                </tr>

                {/* Official Distributor in Nepal */}
                <tr style={{ borderBottom: '1px solid var(--line)', background: 'var(--bg)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--muted)' }}>🏢 Nepal Distributor</td>
                  {selectedVehicles.map((v) => (
                    <td key={v.id} style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 700, fontSize: '12px' }}>
                      {v.distributor_nepal}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--line)' }}>
            <p style={{ fontSize: '15px', color: 'var(--muted)' }}>Please select at least 1 vehicle above to view the comparison table.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};
