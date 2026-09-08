import { FC } from 'hono/jsx';
import { Vehicle, VehicleCuratedCollection, SiteSettings } from '../types';
import { Layout } from './layout';

export const formatLakhs = (val: number): string => {
  if (!val || isNaN(val)) return 'Rs. 0';
  if (val >= 10000000) {
    const crore = (val / 10000000).toFixed(2);
    return `Rs. ${crore} Crore`;
  }
  if (val >= 100000) {
    const lakhs = (val / 100000).toFixed(2);
    return `Rs. ${lakhs} Lakhs`;
  }
  return `NPR ${val.toLocaleString('en-IN')}`;
};

export const VehiclesDirectoryView: FC<{
  vehicles: Vehicle[];
  collections: VehicleCuratedCollection[];
  settings: SiteSettings;
  activeFuel?: string;
  activeType?: string;
  activeSort?: string;
  activeCollection?: string;
  searchQuery?: string;
}> = ({
  vehicles,
  collections,
  settings,
  activeFuel = '',
  activeType = '',
  activeSort = 'score_overall_desc',
  activeCollection = '',
  searchQuery = ''
}) => {
  // Filter vehicles
  let filtered = [...vehicles];

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q) ||
        v.distributor_nepal.toLowerCase().includes(q) ||
        (v.verdict_nepal && v.verdict_nepal.toLowerCase().includes(q))
    );
  }

  if (activeFuel) {
    filtered = filtered.filter((v) => v.fuel_type === activeFuel);
  }

  if (activeType) {
    filtered = filtered.filter((v) => v.vehicle_type === activeType);
  }

  // Active collection filters
  if (activeCollection) {
    const coll = collections.find((c) => c.slug === activeCollection || c.id === activeCollection);
    if (coll) {
      if (coll.filter_fuel) filtered = filtered.filter((v) => v.fuel_type === coll.filter_fuel);
      if (coll.filter_type) filtered = filtered.filter((v) => v.vehicle_type === coll.filter_type);
      if (coll.max_price) filtered = filtered.filter((v) => v.price_npr <= coll.max_price!);
      if (coll.min_price) filtered = filtered.filter((v) => v.price_npr >= coll.min_price!);
      if (coll.min_range) filtered = filtered.filter((v) => (v.range_km || 0) >= coll.min_range!);
      if (coll.min_ground_clearance) filtered = filtered.filter((v) => v.ground_clearance_mm >= coll.min_ground_clearance!);
    }
  }

  // Sort vehicles
  filtered.sort((a, b) => {
    if (activeSort === 'price_asc') return a.price_npr - b.price_npr;
    if (activeSort === 'price_desc') return b.price_npr - a.price_npr;
    if (activeSort === 'range_desc') return (b.range_km || 0) - (a.range_km || 0);
    if (activeSort === 'ground_clearance_desc') return b.ground_clearance_mm - a.ground_clearance_mm;
    if (activeSort === 'rating_desc') return (b.rating || 0) - (a.rating || 0);
    return (b.score_overall || 0) - (a.score_overall || 0);
  });

  const evCount = vehicles.filter((v) => v.fuel_type === 'ev').length;
  const avgRange = Math.round(
    vehicles.filter((v) => v.range_km).reduce((acc, v) => acc + (v.range_km || 0), 0) /
      (vehicles.filter((v) => v.range_km).length || 1)
  );

  return (
    <Layout
      title="Nepal Vehicle & EV Prices 2026 — Electric Cars, SUVs & Scooters | BuyerNepal"
      description="Compare latest verified electric car prices in Nepal (BYD, Tata, MG, Deepal), specs, WLTP range, ground clearance and NRB 20% downpayment auto loan EMI."
      settings={settings}
      activeSlug="vehicles"
    >
      <div className="store-shell" style={{ padding: '24px 0 60px' }}>
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumbs" style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', color: 'var(--muted)', marginBottom: '18px' }}>
          <a href="/" style={{ color: 'var(--muted)' }}>Home</a>
          <span>/</span>
          <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Vehicles &amp; EV Portal</span>
        </nav>

        {/* Hero Section */}
        <div
          style={{
            background: 'linear-gradient(135deg, #091e3a 0%, #102a45 50%, #0d3b66 100%)',
            color: '#ffffff',
            borderRadius: '20px',
            padding: '36px 32px',
            marginBottom: '28px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 12px 30px rgba(9, 30, 58, 0.15)'
          }}
        >
          <div style={{ maxWidth: '780px', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.12)', padding: '4px 12px', borderRadius: '30px', fontSize: '11px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>
              <span>🇳🇵 NEPAL AUTOMOTIVE &amp; EV INTELLIGENCE</span>
              <span>•</span>
              <span style={{ color: '#4ade80' }}>UPDATED FOR 2026</span>
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2, letterSpacing: '-0.8px' }}>
              Nepal Electric Vehicles &amp; Car Price Guide
            </h1>
            <p style={{ fontSize: '15px', color: '#cbd5e1', margin: '0 0 20px', lineHeight: 1.6 }}>
              Comprehensive catalog of electric vehicles, SUVs, and smart two-wheelers in Nepal. Compare verified showroom prices in Lakhs, battery range, 190mm+ ground clearance, and NRB-compliant auto loan EMIs.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', padding: '10px 18px', borderRadius: '12px' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#38bdf8' }}>{evCount} Models</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Curated in Nepal</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', padding: '10px 18px', borderRadius: '12px' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#4ade80' }}>{avgRange} km</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Average EV Range</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)', padding: '10px 18px', borderRadius: '12px' }}>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#facc15' }}>20% Down</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>NRB Auto Loan Rule for EVs</div>
              </div>
              <a
                href="/vehicles/compare"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#ffffff',
                  color: '#091e3a',
                  padding: '12px 22px',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '13px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
                }}
              >
                <span>⚖️ Side-by-Side EV Compare</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Niche Curated Collections Bar */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🎯 Curated Nepal Demand Collections</span>
              <span style={{ fontSize: '11px', fontWeight: 700, background: 'var(--line)', padding: '2px 8px', borderRadius: '10px', color: 'var(--muted)' }}>Quick Filters</span>
            </h2>
            {activeCollection && (
              <a href="/vehicles" style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)', textDecoration: 'none' }}>
                Clear Collection Filter ✕
              </a>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '12px' }}>
            {collections.map((coll) => {
              const isSelected = activeCollection === coll.slug;
              return (
                <a
                  key={coll.id}
                  href={`/vehicles?collection=${coll.slug}`}
                  style={{
                    display: 'block',
                    background: isSelected ? 'var(--accent)' : 'var(--card-bg)',
                    color: isSelected ? '#ffffff' : 'var(--ink)',
                    border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--line)'}`,
                    borderRadius: '12px',
                    padding: '14px',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 12px rgba(225, 29, 72, 0.25)' : 'none'
                  }}
                >
                  <div style={{ fontSize: '22px', marginBottom: '6px' }}>{coll.icon}</div>
                  <strong style={{ display: 'block', fontSize: '13px', lineHeight: 1.3, marginBottom: '4px' }}>
                    {coll.title}
                  </strong>
                  <span style={{ fontSize: '11px', color: isSelected ? 'rgba(255,255,255,0.85)' : 'var(--muted)', display: 'block', lineHeight: 1.4 }}>
                    {coll.subtitle}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Interactive Filter & Sorting Bar */}
        <div
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--line)',
            borderRadius: '14px',
            padding: '18px 20px',
            marginBottom: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Search form */}
          <form
            method="get"
            action="/vehicles"
            style={{ display: 'flex', gap: '8px', flex: '1 1 280px', maxWidth: '400px' }}
          >
            {activeFuel && <input type="hidden" name="fuel" value={activeFuel} />}
            {activeType && <input type="hidden" name="type" value={activeType} />}
            {activeSort && <input type="hidden" name="sort" value={activeSort} />}
            {activeCollection && <input type="hidden" name="collection" value={activeCollection} />}
            <input
              type="search"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search BYD, Tata, Nexon, Ather, ground clearance..."
              style={{
                flex: 1,
                padding: '9px 14px',
                borderRadius: '8px',
                border: '1px solid var(--line)',
                background: 'var(--bg)',
                color: 'var(--ink)',
                fontSize: '13px'
              }}
            />
            <button
              type="submit"
              className="primary-action"
              style={{ padding: '9px 16px', fontSize: '13px' }}
            >
              Filter
            </button>
          </form>

          {/* Quick Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)' }}>Fuel:</span>
            <a
              href={`/vehicles?sort=${activeSort}${activeType ? `&type=${activeType}` : ''}`}
              className={`filter-pill ${!activeFuel ? 'active' : ''}`}
              style={{
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 700,
                textDecoration: 'none',
                background: !activeFuel ? 'var(--ink)' : 'var(--line-subtle)',
                color: !activeFuel ? '#ffffff' : 'var(--ink)'
              }}
            >
              All Fuels
            </a>
            <a
              href={`/vehicles?fuel=ev&sort=${activeSort}${activeType ? `&type=${activeType}` : ''}`}
              style={{
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 700,
                textDecoration: 'none',
                background: activeFuel === 'ev' ? '#059669' : 'var(--line-subtle)',
                color: activeFuel === 'ev' ? '#ffffff' : 'var(--ink)'
              }}
            >
              ⚡ Electric (EV)
            </a>
            <a
              href={`/vehicles?fuel=petrol&sort=${activeSort}${activeType ? `&type=${activeType}` : ''}`}
              style={{
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 700,
                textDecoration: 'none',
                background: activeFuel === 'petrol' ? 'var(--ink)' : 'var(--line-subtle)',
                color: activeFuel === 'petrol' ? '#ffffff' : 'var(--ink)'
              }}
            >
              ⛽ Petrol
            </a>
          </div>

          {/* Sorting Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)' }}>Sort by:</span>
            <form method="get" action="/vehicles" style={{ margin: 0 }}>
              {activeFuel && <input type="hidden" name="fuel" value={activeFuel} />}
              {activeType && <input type="hidden" name="type" value={activeType} />}
              {activeCollection && <input type="hidden" name="collection" value={activeCollection} />}
              {searchQuery && <input type="hidden" name="q" value={searchQuery} />}
              <select
                name="sort"
                value={activeSort}
                onchange="this.form.submit()"
                style={{
                  padding: '7px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--line)',
                  background: 'var(--card-bg)',
                  color: 'var(--ink)',
                  fontSize: '13px',
                  fontWeight: 600
                }}
              >
                <option value="score_overall_desc">🏆 Best Overall Score</option>
                <option value="price_asc">💰 Price: Low to High (Cheapest)</option>
                <option value="price_desc">💎 Price: High to Low (Luxury)</option>
                <option value="range_desc">🔋 Battery Range (Highest km)</option>
                <option value="ground_clearance_desc">🏔️ Highest Ground Clearance</option>
                <option value="rating_desc">⭐ Top Customer Rating</option>
              </select>
            </form>
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)' }}>
            Showing <strong>{filtered.length}</strong> vehicles in Nepal
            {activeFuel ? ` (${activeFuel.toUpperCase()})` : ''}
            {activeCollection ? ` in ${activeCollection}` : ''}
          </p>
          <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
            NRB Policy: <strong>20% EV Downpayment</strong> vs <strong>50% Fuel Downpayment</strong>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
          {filtered.map((v) => {
            const isEv = v.fuel_type === 'ev';
            const emiStr = v.auto_loan_est_monthly_emi ? `Rs. ${v.auto_loan_est_monthly_emi.toLocaleString('en-IN')}/mo` : 'Available';
            const downStr = v.auto_loan_min_downpayment_npr ? formatLakhs(v.auto_loan_min_downpayment_npr) : '';

            return (
              <article
                key={v.id}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--line)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {/* Vehicle Image with Badges */}
                <div style={{ position: 'relative', height: '210px', background: '#0f172a', overflow: 'hidden' }}>
                  <img
                    src={v.image_url}
                    alt={v.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {v.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(6px)',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '4px 10px',
                        borderRadius: '20px',
                        border: '1px solid rgba(255,255,255,0.2)'
                      }}
                    >
                      {v.badge}
                    </span>
                  )}
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: isEv ? '#059669' : '#334155',
                      color: '#ffffff',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '4px 8px',
                      borderRadius: '6px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {isEv ? '⚡ EV' : v.fuel_type.toUpperCase()}
                  </span>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '12px',
                      background: 'rgba(0,0,0,0.7)',
                      color: '#facc15',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}
                  >
                    ⭐ {v.rating} ({v.score_overall}/10 Score)
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                    {v.brand} • {v.vehicle_type.toUpperCase()}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 10px', color: 'var(--ink)', letterSpacing: '-0.3px', lineHeight: 1.3 }}>
                    <a href={`/vehicles/${v.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {v.name}
                    </a>
                  </h3>

                  {/* Price Tag in Nepal Lakhs */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
                    <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.5px' }}>
                      {formatLakhs(v.price_npr)}
                    </span>
                    {v.original_price_npr && (
                      <span style={{ fontSize: '13px', color: 'var(--muted)', textDecoration: 'line-through' }}>
                        {formatLakhs(v.original_price_npr)}
                      </span>
                    )}
                  </div>

                  {/* Spec Highlight Matrix */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '8px',
                      background: 'var(--bg)',
                      padding: '12px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      marginBottom: '14px',
                      border: '1px solid var(--line)'
                    }}
                  >
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}>
                        {isEv ? '🔋 Battery & Range' : '⛽ Engine & Mileage'}
                      </span>
                      <strong style={{ color: 'var(--ink)' }}>
                        {isEv ? `${v.range_km} km (${v.battery_capacity_kwh} kWh)` : `${v.engine_displacement_cc} cc (${v.fuel_economy_kmpl} kmpl)`}
                      </strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}>
                        🏔️ Ground Clearance
                      </span>
                      <strong style={{ color: v.ground_clearance_mm >= 185 ? '#059669' : 'var(--ink)' }}>
                        {v.ground_clearance_mm} mm {v.ground_clearance_mm >= 185 ? '✓' : ''}
                      </strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}>
                        ⚡ Motor / Power
                      </span>
                      <strong style={{ color: 'var(--ink)' }}>
                        {v.motor_power_kw ? `${v.motor_power_kw} kW (${Math.round(v.motor_power_kw * 1.341)} hp)` : (v.transmission || 'Manual')}
                      </strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--muted)', display: 'block', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}>
                        🛡️ Showroom Warranty
                      </span>
                      <strong style={{ color: 'var(--ink)', fontSize: '11px' }}>
                        {v.warranty_battery || v.warranty_vehicle || 'Official Warranty'}
                      </strong>
                    </div>
                  </div>

                  {/* NRB Auto Loan EMI Callout */}
                  <div
                    style={{
                      background: 'rgba(56, 189, 248, 0.08)',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      fontSize: '11px',
                      color: 'var(--ink)',
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>
                      <strong>Est. EMI:</strong> {emiStr}
                    </span>
                    <span style={{ color: 'var(--muted)' }}>
                      {isEv ? '20% Down: ' : '50% Down: '}<strong>{downStr}</strong>
                    </span>
                  </div>

                  {/* Distributor in Nepal */}
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '16px' }}>
                    🏢 <strong>Official Distributor:</strong> {v.distributor_nepal}
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 'auto' }}>
                    <a
                      href={`/vehicles/${v.slug}`}
                      className="primary-action"
                      style={{ justifyContent: 'center', fontSize: '12px', padding: '9px 12px' }}
                    >
                      View Specs &amp; EMI →
                    </a>
                    <a
                      href={`/vehicles/compare?v1=${v.id}`}
                      className="btn-secondary"
                      style={{ justifyContent: 'center', fontSize: '12px', padding: '9px 12px' }}
                    >
                      ⚖️ Compare
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Nepal EV Market Buying Guide & NRB FAQ */}
        <section
          style={{
            marginTop: '56px',
            background: 'var(--card-bg)',
            border: '1px solid var(--line)',
            borderRadius: '16px',
            padding: '36px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ maxWidth: '800px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              EXPERT BUYING INTELLIGENCE
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '6px 0 16px', color: 'var(--ink)' }}>
              Electric Vehicle Buying Guide for Nepal (2026)
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '24px' }}>
              <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 8px', color: 'var(--ink)' }}>
                  🏦 NRB 20% vs 50% Auto Loan Rule
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                  Nepal Rastra Bank mandates that commercial banks can finance up to <strong>80% of the vehicle value for EVs</strong> (requiring only 20% down payment), whereas internal combustion petrol/diesel vehicles require <strong>50% cash down payment</strong>.
                </p>
              </div>

              <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 8px', color: 'var(--ink)' }}>
                  🏔️ Ground Clearance is Critical
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                  For driving in Kathmandu ring road or highway trips like Narayanghat-Mugling, look for minimum <strong>175mm clearance</strong>. Vehicles like the Tata Nexon EV (190mm) and Suzuki Jimny (210mm) provide complete peace of mind on unpaved roads.
                </p>
              </div>

              <div style={{ background: 'var(--bg)', padding: '16px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 8px', color: 'var(--ink)' }}>
                  ⚡ Running Cost: Rs 1.2 vs Rs 14
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
                  Charging an EV at home in Nepal costs approximately <strong>Rs. 1.20 to Rs. 1.50 per kilometer</strong> based on NEA domestic electricity tariffs (~Rs 10/unit), compared to petrol running costs of <strong>Rs. 13 to Rs. 16 per km</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};
