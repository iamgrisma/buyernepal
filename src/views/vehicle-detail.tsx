import { FC } from 'hono/jsx';
import { Vehicle, SiteSettings } from '../types';
import { Layout } from './layout';
import { formatLakhs } from './vehicles';
import { TechnicalSpecification } from './components/TechnicalSpecification';

export const VehicleDetailView: FC<{
  vehicle: Vehicle;
  similarVehicles: Vehicle[];
  settings: SiteSettings;
  inquirySuccess?: boolean;
}> = ({ vehicle, similarVehicles, settings, inquirySuccess }) => {
  const isEv = vehicle.fuel_type === 'ev';
  const priceNpr = vehicle.price_npr;
  const defaultDownPct = isEv ? 20 : 50;
  const defaultDown = Math.round(priceNpr * (defaultDownPct / 100));
  const defaultLoan = priceNpr - defaultDown;
  const monthlyRate = 0.10 / 12;
  const nMonths = 84;
  const defaultEmi = defaultLoan > 0
    ? Math.round((defaultLoan * monthlyRate * Math.pow(1 + monthlyRate, nMonths)) / (Math.pow(1 + monthlyRate, nMonths) - 1))
    : 0;

  return (
    <Layout
      title={`${vehicle.name} Price in Nepal 2026, Specs, Range & Auto Loan EMI | BuyerNepal`}
      description={`Official Nepal showroom price for ${vehicle.name}: ${formatLakhs(vehicle.price_npr)}. Full technical specs, battery range, ground clearance, pros/cons, and 20% downpayment auto loan calculation.`}
      settings={settings}
      activeSlug="vehicles"
    >
      <div className="store-shell" style={{ padding: '24px 0 60px' }}>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', color: 'var(--muted)', marginBottom: '18px' }}>
          <a href="/" style={{ color: 'var(--muted)' }}>Home</a>
          <span>/</span>
          <a href="/vehicles" style={{ color: 'var(--muted)' }}>Vehicles &amp; EV</a>
          <span>/</span>
          <span style={{ color: 'var(--muted)' }}>{vehicle.brand}</span>
          <span>/</span>
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{vehicle.name}</span>
        </nav>

        {inquirySuccess && (
          <div className="alert-box alert-success" style={{ marginBottom: '24px', padding: '16px 20px', borderRadius: '12px' }}>
            🎉 <strong>Inquiry Received!</strong> Your test drive / price quote request for <strong>{vehicle.name}</strong> has been logged. The official showroom will contact your mobile number shortly.
          </div>
        )}

        {/* Hero Product Matrix */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '36px',
            background: 'var(--card-bg)',
            border: '1px solid var(--line)',
            borderRadius: '20px',
            padding: '32px',
            marginBottom: '36px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {/* Left Column: Image & Badges */}
          <div>
            <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '360px', background: '#0f172a', marginBottom: '16px' }}>
              <img
                src={vehicle.image_url}
                alt={vehicle.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {vehicle.badge && (
                <span
                  style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'rgba(15, 23, 42, 0.9)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 800,
                    padding: '6px 14px',
                    borderRadius: '30px',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  {vehicle.badge}
                </span>
              )}
              <span
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: isEv ? '#059669' : '#334155',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 800,
                  padding: '5px 12px',
                  borderRadius: '8px',
                  textTransform: 'uppercase'
                }}
              >
                {isEv ? '⚡ Electric' : vehicle.fuel_type.toUpperCase()}
              </span>
            </div>

            {/* Quick spec pills below image */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '10px', textAlign: 'center', border: '1px solid var(--line)' }}>
                <span style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>
                  {isEv ? 'Battery Range' : 'Fuel Mileage'}
                </span>
                <strong style={{ fontSize: '15px', color: 'var(--ink)' }}>
                  {isEv ? `${vehicle.range_km} km` : `${vehicle.fuel_economy_kmpl} kmpl`}
                </strong>
              </div>
              <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '10px', textAlign: 'center', border: '1px solid var(--line)' }}>
                <span style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>
                  Ground Clearance
                </span>
                <strong style={{ fontSize: '15px', color: vehicle.ground_clearance_mm >= 185 ? '#059669' : 'var(--ink)' }}>
                  {vehicle.ground_clearance_mm} mm
                </strong>
              </div>
              <div style={{ background: 'var(--bg)', padding: '12px', borderRadius: '10px', textAlign: 'center', border: '1px solid var(--line)' }}>
                <span style={{ fontSize: '10px', color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', display: 'block' }}>
                  Overall Score
                </span>
                <strong style={{ fontSize: '15px', color: 'var(--accent)' }}>
                  {vehicle.score_overall}/10
                </strong>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Overview & Action Hub */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
              {vehicle.brand} • {vehicle.vehicle_type.toUpperCase()} IN NEPAL
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--ink)', margin: '0 0 12px', letterSpacing: '-0.6px', lineHeight: 1.25 }}>
              {vehicle.name}
            </h1>

            {/* Price Box */}
            <div
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--line)',
                borderRadius: '14px',
                padding: '16px 20px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px'
              }}
            >
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', display: 'block' }}>
                  Verified Nepal Showroom Price
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                  <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.8px' }}>
                    {formatLakhs(vehicle.price_npr)}
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--muted)' }}>
                    (NPR {vehicle.price_npr.toLocaleString('en-IN')})
                  </span>
                </div>
              </div>
              {vehicle.original_price_npr && (
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: 'var(--muted)', textDecoration: 'line-through', display: 'block' }}>
                    MSRP: {formatLakhs(vehicle.original_price_npr)}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669', background: 'rgba(5, 150, 105, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                    Save {formatLakhs(vehicle.original_price_npr - vehicle.price_npr)}
                  </span>
                </div>
              )}
            </div>

            {/* Distributor & Warranty Strip */}
            <div style={{ fontSize: '13px', color: 'var(--ink)', marginBottom: '20px', lineHeight: 1.6 }}>
              <div>🏢 <strong>Official Distributor:</strong> {vehicle.distributor_nepal}</div>
              {vehicle.showroom_location && <div>📍 <strong>Showrooms:</strong> {vehicle.showroom_location}</div>}
              {vehicle.warranty_battery && <div>🛡️ <strong>Battery Warranty:</strong> {vehicle.warranty_battery}</div>}
              {vehicle.warranty_vehicle && <div>🔧 <strong>Vehicle Warranty:</strong> {vehicle.warranty_vehicle}</div>}
              {vehicle.annual_road_tax_npr && (
                <div>
                  📋 <strong>Annual Nepal Road Tax:</strong> Rs. {vehicle.annual_road_tax_npr.toLocaleString('en-IN')}/year
                  {isEv ? ' (Bagmati Province EV Concession)' : ''}
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <a
                href="#bookTestDriveSection"
                className="primary-action"
                style={{ flex: '1 1 200px', justifyContent: 'center', padding: '12px 20px', fontSize: '14px' }}
              >
                📅 Request Quote &amp; Test Drive
              </a>
              <a
                href={`/vehicles/compare?v1=${vehicle.id}`}
                className="btn-secondary"
                style={{ padding: '12px 18px', fontSize: '14px' }}
              >
                ⚖️ Compare with Rival EVs
              </a>
            </div>

            {/* REHub Lab Evaluation Scorecard */}
            <div
              style={{
                background: 'linear-gradient(135deg, #091e3a 0%, #1e293b 100%)',
                color: '#ffffff',
                borderRadius: '14px',
                padding: '20px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#38bdf8', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    REHUB AUTOMOTIVE LAB
                  </span>
                  <div style={{ fontSize: '16px', fontWeight: 800 }}>Nepal Road Performance Index</div>
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#4ade80' }}>
                  {vehicle.score_overall}<span style={{ fontSize: '14px', color: '#94a3b8' }}>/10</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <span style={{ color: '#cbd5e1' }}>Battery Range &amp; Highway Capability</span>
                    <span style={{ fontWeight: 700 }}>{vehicle.scores?.range_efficiency || 9.2}/10</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${((vehicle.scores?.range_efficiency || 9.2) / 10) * 100}%`, height: '100%', background: '#38bdf8' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <span style={{ color: '#cbd5e1' }}>Ground Clearance &amp; Pothole Absorption</span>
                    <span style={{ fontWeight: 700 }}>{vehicle.scores?.ground_clearance || (vehicle.ground_clearance_mm >= 185 ? 9.8 : 8.8)}/10</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${(((vehicle.scores?.ground_clearance || 9.0) / 10) * 100)}%`, height: '100%', background: '#4ade80' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                    <span style={{ color: '#cbd5e1' }}>Nepal Value &amp; Resale Liquidity</span>
                    <span style={{ fontWeight: 700 }}>{vehicle.scores?.nepal_value || 9.5}/10</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${((vehicle.scores?.nepal_value || 9.5) / 10) * 100}%`, height: '100%', background: '#facc15' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nepal Rastra Bank Auto Loan Calculator Widget */}
        <section
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--line)',
            borderRadius: '20px',
            padding: '32px',
            marginBottom: '36px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ maxWidth: '780px', marginBottom: '20px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              NEPAL RASTRA BANK (NRB) COMPLIANT
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '4px 0 8px', color: 'var(--ink)' }}>
              Auto Loan &amp; 0% Bank EMI Calculator
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
              Under current NRB monetary guidelines, commercial banks in Nepal can finance up to <strong>80% of EV cost</strong> (minimum 20% down payment required). Adjust sliders below to calculate your exact monthly EMI at prevailing bank interest rates.
            </p>
          </div>

          <div
            id="emiCalculatorWrap"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
              alignItems: 'center',
              background: 'var(--bg)',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid var(--line)'
            }}
          >
            {/* Interactive Inputs */}
            <div>
              <div style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                  <span>Down Payment ({isEv ? 'Min 20% for EV' : 'Min 50% for Fuel'}):</span>
                  <span id="downPaymentText" style={{ color: 'var(--accent)' }}>{defaultDownPct}% (Rs. {defaultDown.toLocaleString('en-IN')})</span>
                </div>
                <input
                  type="range"
                  id="downPaymentSlider"
                  min={isEv ? '20' : '50'}
                  max="80"
                  step="5"
                  value={defaultDownPct}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                  <span>Loan Tenure:</span>
                  <span id="tenureText" style={{ color: 'var(--accent)' }}>7 Years (84 Months)</span>
                </div>
                <input
                  type="range"
                  id="tenureSlider"
                  min="1"
                  max="7"
                  step="1"
                  value="7"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                  <span>Bank Interest Rate (Base + Premium):</span>
                  <span id="interestText" style={{ color: 'var(--accent)' }}>10.0% p.a.</span>
                </div>
                <input
                  type="range"
                  id="interestSlider"
                  min="8.0"
                  max="14.0"
                  step="0.5"
                  value="10.0"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            {/* Calculated Results Card */}
            <div
              style={{
                background: 'var(--card-bg)',
                border: '2px solid var(--line)',
                borderRadius: '14px',
                padding: '24px',
                textAlign: 'center'
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                ESTIMATED MONTHLY INSTALLMENT
              </span>
              <div id="calculatedEmi" style={{ fontSize: '32px', fontWeight: 800, color: 'var(--ink)', margin: '8px 0', letterSpacing: '-0.8px' }}>
                Rs. {defaultEmi.toLocaleString('en-IN')}<span style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: 600 }}>/month</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--muted)', borderTop: '1px solid var(--line)', paddingTop: '12px', marginTop: '12px', display: 'flex', justifyContent: 'space-around' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase' }}>Loan Amount</span>
                  <strong id="loanAmountText" style={{ color: 'var(--ink)' }}>Rs. {defaultLoan.toLocaleString('en-IN')}</strong>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase' }}>Down Payment</span>
                  <strong id="downAmountText" style={{ color: 'var(--ink)' }}>Rs. {defaultDown.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Technical Specifications Table */}
        <TechnicalSpecification
          vehicle={vehicle}
          title={`${vehicle.name} Engineering Specifications`}
          subtitle="Full manufacturer verified technical parameters, high-voltage battery details, and Nepal road readiness."
          maxHeight="580px"
        />

        {/* Editorial Review & Nepal Road Verdict */}
        <section
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--line)',
            borderRadius: '20px',
            padding: '32px',
            marginBottom: '36px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            BUYERNEPAL EDITORIAL VERDICT
          </span>
          <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '4px 0 16px', color: 'var(--ink)' }}>
            Should You Buy the {vehicle.name} in Nepal?
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--ink)', lineHeight: 1.7, marginBottom: '24px' }}>
            {vehicle.verdict_nepal}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {vehicle.pros && vehicle.pros.length > 0 && (
              <div style={{ background: 'rgba(5, 150, 105, 0.06)', border: '1px solid rgba(5, 150, 105, 0.2)', padding: '20px', borderRadius: '14px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#059669', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>✓</span> Key Strengths for Nepal
                </h3>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--ink)', lineHeight: 1.6 }}>
                  {vehicle.pros.map((p, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>{p}</li>
                  ))}
                </ul>
              </div>
            )}

            {vehicle.cons && vehicle.cons.length > 0 && (
              <div style={{ background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '20px', borderRadius: '14px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#dc2626', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>⚠</span> Points to Consider
                </h3>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--ink)', lineHeight: 1.6 }}>
                  {vehicle.cons.map((c, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Test Drive & Showroom Quotation Booking Form */}
        <section
          id="bookTestDriveSection"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: '#ffffff',
            borderRadius: '20px',
            padding: '36px',
            marginBottom: '36px',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center', marginBottom: '28px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '1px' }}>
              OFFICIAL SHOWROOM DIRECT ACCESS
            </span>
            <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '6px 0 10px', color: '#ffffff' }}>
              Book Test Drive or Request Price Quotation
            </h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Connect with <strong>{vehicle.distributor_nepal}</strong>. Receive official quotation, Nabil/Global IME bank loan assistance, or schedule a weekend test drive in Kathmandu, Pokhara, Butwal, or Chitwan.
            </p>
          </div>

          <form
            method="post"
            action="/api/vehicles/inquiry"
            style={{ maxWidth: '600px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}
          >
            <input type="hidden" name="vehicle_id" value={vehicle.id} />
            <input type="hidden" name="vehicle_name" value={vehicle.name} />
            <input type="hidden" name="redirect" value={`/vehicles/${vehicle.slug}?inquiry=success`} />

            <div style={{ gridColumn: 'span 1' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#cbd5e1' }}>
                Full Name *
              </label>
              <input
                type="text"
                name="customer_name"
                required
                placeholder="e.g. Binod Adhikari"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#ffffff', fontSize: '13px' }}
              />
            </div>

            <div style={{ gridColumn: 'span 1' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#cbd5e1' }}>
                Mobile Number (Nepal) *
              </label>
              <input
                type="tel"
                name="customer_phone"
                required
                placeholder="e.g. 9841XXXXXX"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#ffffff', fontSize: '13px' }}
              />
            </div>

            <div style={{ gridColumn: 'span 1' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#cbd5e1' }}>
                City / Location *
              </label>
              <select
                name="city"
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: '#1e293b', color: '#ffffff', fontSize: '13px' }}
              >
                <option value="Kathmandu">Kathmandu / Lalitpur / Bhaktapur</option>
                <option value="Pokhara">Pokhara</option>
                <option value="Butwal">Butwal / Bhairahawa</option>
                <option value="Chitwan">Chitwan / Narayangadh</option>
                <option value="Biratnagar">Biratnagar / Dharan</option>
                <option value="Nepalgunj">Nepalgunj</option>
                <option value="Other">Other City in Nepal</option>
              </select>
            </div>

            <div style={{ gridColumn: 'span 1' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#cbd5e1' }}>
                Request Type *
              </label>
              <select
                name="inquiry_type"
                required
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: '#1e293b', color: '#ffffff', fontSize: '13px' }}
              >
                <option value="test_drive">Schedule Test Drive</option>
                <option value="price_quote">Official Price Quotation</option>
                <option value="bank_loan_assist">20% Downpayment Bank Loan</option>
                <option value="exchange">Exchange Old Car for EV</option>
              </select>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px', color: '#cbd5e1' }}>
                Message or Specific Questions (Optional)
              </label>
              <textarea
                name="message"
                rows={2}
                placeholder="e.g. What is the current delivery waiting period? Can I get home charger installation support?"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.08)', color: '#ffffff', fontSize: '13px' }}
              />
            </div>

            <div style={{ gridColumn: 'span 2', textAlign: 'center', marginTop: '10px' }}>
              <button
                type="submit"
                className="primary-action"
                style={{ width: '100%', justifyContent: 'center', padding: '13px 24px', fontSize: '15px' }}
              >
                Submit Inquiry to Official Showroom →
              </button>
              <small style={{ display: 'block', color: '#94a3b8', marginTop: '8px', fontSize: '11px' }}>
                🔒 Your phone number is strictly used for official showroom quotation assistance.
              </small>
            </div>
          </form>
        </section>

        {/* Similar Vehicles in Nepal */}
        {similarVehicles && similarVehicles.length > 0 && (
          <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--ink)' }}>
                Compare Similar Vehicles in Nepal
              </h2>
              <a href="/vehicles" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)', textDecoration: 'none' }}>
                View All Vehicles →
              </a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {similarVehicles.map((sim) => (
                <a
                  key={sim.id}
                  href={`/vehicles/${sim.slug}`}
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--line)',
                    borderRadius: '14px',
                    padding: '16px',
                    textDecoration: 'none',
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={sim.image_url}
                    alt={sim.name}
                    style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <div>
                    <strong style={{ display: 'block', fontSize: '14px', color: 'var(--ink)', lineHeight: 1.3 }}>
                      {sim.name}
                    </strong>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--accent)' }}>
                      {formatLakhs(sim.price_npr)}
                    </span>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--muted)' }}>
                      {sim.range_km ? `${sim.range_km} km • ` : ''}{sim.ground_clearance_mm}mm Clearance
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Embedded Client Script for Dynamic EMI Slider Updates */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const price = ${priceNpr};
              const isEv = ${isEv ? 'true' : 'false'};
              const downSlider = document.getElementById('downPaymentSlider');
              const tenureSlider = document.getElementById('tenureSlider');
              const interestSlider = document.getElementById('interestSlider');

              function formatNpr(val) {
                return val.toLocaleString('en-IN');
              }

              function updateEmi() {
                if (!downSlider || !tenureSlider || !interestSlider) return;
                const downPct = parseFloat(downSlider.value);
                const tenureYrs = parseInt(tenureSlider.value, 10);
                const interestRate = parseFloat(interestSlider.value);

                const downAmount = Math.round(price * (downPct / 100));
                const loanAmount = price - downAmount;
                const nMonths = tenureYrs * 12;
                const r = (interestRate / 100) / 12;

                let emi = 0;
                if (loanAmount > 0 && r > 0) {
                  emi = Math.round((loanAmount * r * Math.pow(1 + r, nMonths)) / (Math.pow(1 + r, nMonths) - 1));
                }

                document.getElementById('downPaymentText').textContent = downPct + '% (Rs. ' + formatNpr(downAmount) + ')';
                document.getElementById('tenureText').textContent = tenureYrs + ' Years (' + nMonths + ' Months)';
                document.getElementById('interestText').textContent = interestRate.toFixed(1) + '% p.a.';
                document.getElementById('calculatedEmi').innerHTML = 'Rs. ' + formatNpr(emi) + '<span style="font-size: 14px; color: var(--muted); font-weight: 600;">/month</span>';
                document.getElementById('loanAmountText').textContent = 'Rs. ' + formatNpr(loanAmount);
                document.getElementById('downAmountText').textContent = 'Rs. ' + formatNpr(downAmount);
              }

              if (downSlider) downSlider.addEventListener('input', updateEmi);
              if (tenureSlider) tenureSlider.addEventListener('input', updateEmi);
              if (interestSlider) interestSlider.addEventListener('input', updateEmi);
            })();
          `
        }}
      />
    </Layout>
  );
};
