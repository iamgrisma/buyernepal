import { FC } from 'hono/jsx';
import { Vehicle, VehicleInquiry, VehicleCuratedCollection } from '../../../types';
import { formatLakhs } from '../../vehicles';

export const VehiclesTab: FC<{
  vehicles: Vehicle[];
  inquiries: VehicleInquiry[];
  collections: VehicleCuratedCollection[];
}> = ({ vehicles, inquiries, collections }) => {
  const evCount = vehicles.filter((v) => v.fuel_type === 'ev').length;
  const avgRange = Math.round(
    vehicles.filter((v) => v.range_km).reduce((acc, v) => acc + (v.range_km || 0), 0) /
      (vehicles.filter((v) => v.range_km).length || 1)
  );
  const pendingInquiries = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div>
      {/* Top Metric Strip for Nepal Vehicle Fleet */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="admin-stat-card" style={{ padding: '18px 20px', background: 'var(--card-bg)', border: '1px solid var(--line)', borderRadius: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase' }}>Total Vehicles Catalog</span>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--ink)', margin: '4px 0' }}>{vehicles.length}</div>
          <span style={{ fontSize: '12px', color: '#059669', fontWeight: 700 }}>Active in Nepal Storefront</span>
        </div>

        <div className="admin-stat-card" style={{ padding: '18px 20px', background: 'var(--card-bg)', border: '1px solid var(--line)', borderRadius: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase' }}>Electric Vehicles (EV)</span>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#059669', margin: '4px 0' }}>{evCount}</div>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>20% Downpayment Eligible</span>
        </div>

        <div className="admin-stat-card" style={{ padding: '18px 20px', background: 'var(--card-bg)', border: '1px solid var(--line)', borderRadius: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase' }}>Average EV Range</span>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#38bdf8', margin: '4px 0' }}>{avgRange} km</div>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>WLTP Highway Rating</span>
        </div>

        <div className="admin-stat-card" style={{ padding: '18px 20px', background: 'var(--card-bg)', border: '1px solid var(--line)', borderRadius: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase' }}>Test Drive Leads</span>
          <div style={{ fontSize: '26px', fontWeight: 800, color: pendingInquiries > 0 ? '#f59e0b' : 'var(--ink)', margin: '4px 0' }}>
            {inquiries.length}
          </div>
          <span style={{ fontSize: '12px', color: pendingInquiries > 0 ? '#f59e0b' : '#059669', fontWeight: 700 }}>
            {pendingInquiries} New Inquiries
          </span>
        </div>
      </div>

      {/* Main Vehicle Fleet Table Card */}
      <div className="admin-card" style={{ marginBottom: '28px' }}>
        <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
              🚗 Nepal Vehicle Fleet &amp; Price Matrix
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted)' }}>
              Manage EV specifications, battery capacities, ground clearance, Nepal distributors, and auto loan calculations.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onclick="document.getElementById('modalAddVehicle').classList.add('open')"
              className="primary-action"
              style={{ padding: '8px 16px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              + Add New Vehicle / EV
            </button>
            <a
              href="/vehicles"
              target="_blank"
              rel="noopener"
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '13px' }}
            >
              Live Vehicles Portal ↗
            </a>
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Image</th>
                <th>Model &amp; Brand</th>
                <th>Fuel &amp; Body</th>
                <th>Nepal Price</th>
                <th>EV Range / Specs</th>
                <th>Ground Clearance</th>
                <th>Distributor (Nepal)</th>
                <th>Auto Loan EMI</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => {
                const isEv = v.fuel_type === 'ev';
                return (
                  <tr key={v.id}>
                    <td>
                      <img
                        src={v.image_url}
                        alt={v.name}
                        style={{ width: '54px', height: '40px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--line)' }}
                      />
                    </td>
                    <td>
                      <strong style={{ display: 'block', fontSize: '14px', color: 'var(--ink)' }}>
                        {v.name}
                      </strong>
                      <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                        {v.brand} • {v.badge || 'Standard'}
                      </span>
                    </td>
                    <td>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 700,
                          background: isEv ? 'rgba(5, 150, 105, 0.1)' : 'var(--line-subtle)',
                          color: isEv ? '#059669' : 'var(--ink)'
                        }}
                      >
                        {isEv ? '⚡ EV' : v.fuel_type.toUpperCase()}
                      </span>
                      <small style={{ display: 'block', color: 'var(--muted)', fontSize: '11px', marginTop: '2px' }}>
                        {v.vehicle_type.toUpperCase()}
                      </small>
                    </td>
                    <td>
                      <strong style={{ fontSize: '14px', color: 'var(--ink)', display: 'block' }}>
                        {formatLakhs(v.price_npr)}
                      </strong>
                      <small style={{ color: 'var(--muted)', fontSize: '10px' }}>
                        NPR {v.price_npr.toLocaleString('en-IN')}
                      </small>
                    </td>
                    <td>
                      {isEv ? (
                        <div>
                          <strong style={{ fontSize: '13px', color: '#0284c7' }}>{v.range_km} km</strong>
                          <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>
                            {v.battery_capacity_kwh} kWh ({v.motor_power_kw} kW)
                          </span>
                        </div>
                      ) : (
                        <div>
                          <strong>{v.engine_displacement_cc} cc</strong>
                          <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block' }}>
                            {v.fuel_economy_kmpl} kmpl
                          </span>
                        </div>
                      )}
                    </td>
                    <td>
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: '13px',
                          color: v.ground_clearance_mm >= 185 ? '#059669' : 'var(--ink)'
                        }}
                      >
                        {v.ground_clearance_mm} mm {v.ground_clearance_mm >= 185 ? '✓' : ''}
                      </span>
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--ink)' }}>
                      {v.distributor_nepal}
                    </td>
                    <td style={{ fontSize: '12px' }}>
                      <strong style={{ color: 'var(--accent)' }}>
                        Rs. {v.auto_loan_est_monthly_emi?.toLocaleString('en-IN') || 'N/A'}
                      </strong>
                      <small style={{ display: 'block', color: 'var(--muted)', fontSize: '10px' }}>
                        {isEv ? '20% Down' : '50% Down'}
                      </small>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <a
                          href={`/vehicles/${v.slug}`}
                          target="_blank"
                          rel="noopener"
                          className="btn-icon"
                          title="View Live Page"
                          style={{ textDecoration: 'none' }}
                        >
                          ↗
                        </a>
                        <form method="post" action="/admin/vehicles/delete" style={{ display: 'inline' }} onsubmit="return confirm('Delete this vehicle from catalog?')">
                          <input type="hidden" name="id" value={v.id} />
                          <button
                            type="submit"
                            className="btn-icon"
                            style={{ color: '#dc2626', background: 'transparent', border: 'none', cursor: 'pointer' }}
                            title="Delete Vehicle"
                          >
                            🗑️
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Curated Niche Demands Hub */}
      <div className="admin-card" style={{ marginBottom: '28px' }}>
        <div className="admin-card-header">
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
            🎯 Curated Niche Demand Pages
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted)' }}>
            High-converting vehicle landing pages tailored to specific Nepali search queries (Cheapest EVs, High Ground Clearance, Long Range).
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', padding: '20px' }}>
          {collections.map((c) => (
            <div
              key={c.id}
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--line)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{c.icon}</div>
              <strong style={{ fontSize: '14px', color: 'var(--ink)', marginBottom: '4px' }}>
                {c.title}
              </strong>
              <p style={{ fontSize: '12px', color: 'var(--muted)', margin: '0 0 12px', flex: 1, lineHeight: 1.4 }}>
                {c.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--line)', paddingTop: '10px' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted)', fontFamily: 'monospace' }}>
                  /vehicles?collection={c.slug}
                </span>
                <a
                  href={`/vehicles?collection=${c.slug}`}
                  target="_blank"
                  rel="noopener"
                  style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)', textDecoration: 'none' }}
                >
                  View Page ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Test Drive & Quotation Leads */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
                📋 Customer Test Drive &amp; Price Quote Leads
              </h2>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--muted)' }}>
                Direct buyer inquiries received from the vehicle specification sheets.
              </p>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, background: 'rgba(5, 150, 105, 0.1)', color: '#059669', padding: '4px 10px', borderRadius: '12px' }}>
              {inquiries.length} Total Leads
            </span>
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Phone (Nepal)</th>
                <th>City</th>
                <th>Interested Vehicle</th>
                <th>Inquiry Type</th>
                <th>Preferred Time / Notes</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq.id}>
                  <td>
                    <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>{inq.customer_name}</strong>
                    {inq.customer_email && <small style={{ display: 'block', color: 'var(--muted)' }}>{inq.customer_email}</small>}
                  </td>
                  <td>
                    <a href={`tel:${inq.customer_phone}`} style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}>
                      📞 {inq.customer_phone}
                    </a>
                  </td>
                  <td>
                    <span style={{ fontSize: '12px', color: 'var(--ink)' }}>{inq.city}</span>
                  </td>
                  <td>
                    <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>{inq.vehicle_name}</strong>
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontSize: '11px',
                        fontWeight: 700,
                        background: inq.inquiry_type === 'test_drive' ? '#e0f2fe' : '#fef3c7',
                        color: inq.inquiry_type === 'test_drive' ? '#0369a1' : '#b45309'
                      }}
                    >
                      {inq.inquiry_type === 'test_drive' ? '🏎️ Test Drive' : inq.inquiry_type === 'bank_loan_assist' ? '🏦 Bank Loan' : '💰 Price Quote'}
                    </span>
                  </td>
                  <td style={{ fontSize: '12px', color: 'var(--muted)', maxWidth: '240px' }}>
                    {inq.message || inq.preferred_date || 'No extra notes'}
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 800,
                        background: inq.status === 'new' ? '#fef3c7' : inq.status === 'test_drive_scheduled' ? '#dcfce7' : '#f1f5f9',
                        color: inq.status === 'new' ? '#b45309' : inq.status === 'test_drive_scheduled' ? '#15803d' : 'var(--ink)',
                        textTransform: 'uppercase'
                      }}
                    >
                      {inq.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <form method="post" action="/admin/vehicles/inquiry-status" style={{ display: 'inline' }}>
                      <input type="hidden" name="id" value={inq.id} />
                      <select
                        name="status"
                        value={inq.status}
                        onchange="this.form.submit()"
                        style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--line)', fontSize: '11px', fontWeight: 600 }}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="test_drive_scheduled">Test Drive Scheduled</option>
                        <option value="closed">Closed / Sold</option>
                      </select>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      <div id="modalAddVehicle" className="modal-backdrop">
        <div className="modal-card" style={{ maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto' }}>
          <div className="modal-header">
            <h3>+ Add New Vehicle / EV to Nepal Catalog</h3>
            <button
              type="button"
              className="modal-close"
              onclick="document.getElementById('modalAddVehicle').classList.remove('open')"
            >
              ✕
            </button>
          </div>
          <form method="post" action="/admin/vehicles/create" className="modal-form" style={{ padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Vehicle Name &amp; Trim *</label>
                <input type="text" name="name" placeholder="e.g. BYD Seal AWD Performance" required />
              </div>

              <div className="form-group">
                <label>Brand *</label>
                <input type="text" name="brand" placeholder="e.g. BYD, Tata, MG, Deepal" required />
              </div>

              <div className="form-group">
                <label>Fuel Type *</label>
                <select name="fuel_type" required>
                  <option value="ev">⚡ Electric (EV)</option>
                  <option value="petrol">⛽ Petrol</option>
                  <option value="diesel">🛢️ Diesel</option>
                  <option value="hybrid">🔋 Hybrid</option>
                </select>
              </div>

              <div className="form-group">
                <label>Vehicle Body Type *</label>
                <select name="vehicle_type" required>
                  <option value="suv">SUV</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="sedan">Sedan</option>
                  <option value="scooter">Electric Scooter</option>
                  <option value="bike">Motorcycle</option>
                  <option value="pickup">Pickup Truck</option>
                </select>
              </div>

              <div className="form-group">
                <label>Nepal Showroom Price (NPR) *</label>
                <input type="number" name="price_npr" placeholder="e.g. 5690000 (56.90 Lakhs)" required />
              </div>

              <div className="form-group">
                <label>Battery Capacity (kWh - for EV)</label>
                <input type="number" step="0.1" name="battery_capacity_kwh" placeholder="e.g. 60.5" />
              </div>

              <div className="form-group">
                <label>Certified Range (km - WLTP/NEDC)</label>
                <input type="number" name="range_km" placeholder="e.g. 420" />
              </div>

              <div className="form-group">
                <label>Ground Clearance (mm) *</label>
                <input type="number" name="ground_clearance_mm" placeholder="e.g. 175 or 190" defaultValue="175" required />
              </div>

              <div className="form-group">
                <label>Motor Power (kW)</label>
                <input type="number" name="motor_power_kw" placeholder="e.g. 150" />
              </div>

              <div className="form-group">
                <label>Official Distributor in Nepal *</label>
                <input type="text" name="distributor_nepal" placeholder="e.g. Cimex Inc. / Sipradi Trading" required />
              </div>

              <div className="form-group">
                <label>Showroom Warranty</label>
                <input type="text" name="warranty_battery" placeholder="e.g. 8 Years / 160,000 km" />
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Image URL *</label>
                <input type="url" name="image_url" placeholder="https://images.unsplash.com/..." required />
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Editorial Advice &amp; Nepal Road Verdict</label>
                <textarea name="verdict_nepal" rows={3} placeholder="Why should a buyer in Nepal pick this vehicle? Ground clearance and charging review..." />
              </div>
            </div>

            <div className="modal-actions" style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                className="btn-secondary"
                onclick="document.getElementById('modalAddVehicle').classList.remove('open')"
              >
                Cancel
              </button>
              <button type="submit" className="primary-action">
                Save Vehicle to Catalog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
