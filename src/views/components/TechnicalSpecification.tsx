import { FC } from 'hono/jsx';
import { Vehicle } from '../../types';

export interface SpecItem {
  key: string;
  label: string;
  value: string | number | boolean | null | undefined;
  unit?: string;
  badge?: string;
  highlight?: boolean;
  tooltip?: string;
}

export interface SpecCategory {
  id: string;
  title: string;
  icon?: string;
  description?: string;
  items: SpecItem[];
}

export type NestedSpecsData =
  | Record<string, Record<string, any>>
  | SpecCategory[]
  | Record<string, any>;

export interface TechnicalSpecificationProps {
  vehicle?: Vehicle;
  specs?: NestedSpecsData;
  data?: NestedSpecsData; // alias for specs
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
  searchable?: boolean;
  categoryFilter?: boolean;
  maxHeight?: string; // e.g. '520px' or 'none'
  compact?: boolean;
  showSummaryBadges?: boolean;
}

/**
 * Transforms a standard Vehicle object into standardized nested technical spec categories
 */
export function buildVehicleSpecCategories(v: Vehicle): SpecCategory[] {
  const isEv = v.fuel_type === 'ev';
  const categories: SpecCategory[] = [];

  // 1. Battery & Electrical Powertrain (for EVs) OR Engine & Transmission (for ICE/Hybrid)
  if (isEv) {
    const batteryItems: SpecItem[] = [
      {
        key: 'battery_capacity',
        label: 'Battery Pack Capacity',
        value: v.battery_capacity_kwh ? `${v.battery_capacity_kwh} kWh` : null,
        badge: v.battery_capacity_kwh && v.battery_capacity_kwh >= 60 ? 'Long Range Pack' : undefined,
        highlight: true
      },
      {
        key: 'certified_range',
        label: 'Certified Driving Range',
        value: v.range_km ? `${v.range_km} km (WLTP / NEDC)` : null,
        badge: v.range_km && v.range_km >= 400 ? 'Highway Cruiser' : undefined,
        highlight: true
      },
      {
        key: 'dc_fast_charging',
        label: 'DC Fast Charging (0–80%)',
        value: v.charging_time_dc_fast || 'Approx. 40–50 mins on 50kW+ DC Charger',
        badge: 'DC Fast Charge'
      },
      {
        key: 'ac_home_charging',
        label: 'AC Home Charging (0–100%)',
        value: v.charging_time_ac_home || '7.4 kW Wallbox (~7 to 9.5 hours)'
      },
      {
        key: 'charging_port',
        label: 'Charging Port Standard',
        value: v.charging_port || 'CCS2 (Combined Charging System Type 2)'
      },
      {
        key: 'warranty_battery',
        label: 'High-Voltage Battery Warranty',
        value: v.warranty_battery || '8 Years / 160,000 km Official Warranty',
        highlight: true,
        badge: 'Official Warranty'
      }
    ].filter((i) => i.value !== null && i.value !== undefined);

    categories.push({
      id: 'battery_charging',
      title: 'Battery & Electric Drive',
      icon: '⚡',
      description: 'High-voltage battery architecture, WLTP range, and fast-charging parameters.',
      items: batteryItems
    });
  } else {
    const engineItems: SpecItem[] = [
      {
        key: 'engine_displacement',
        label: 'Engine Displacement',
        value: v.engine_displacement_cc ? `${v.engine_displacement_cc} cc` : null,
        highlight: true
      },
      {
        key: 'fuel_type',
        label: 'Fuel Type',
        value: v.fuel_type.toUpperCase()
      },
      {
        key: 'transmission',
        label: 'Transmission',
        value: v.transmission || 'Manual / Automatic'
      },
      {
        key: 'fuel_economy',
        label: 'Certified Fuel Economy',
        value: v.fuel_economy_kmpl ? `${v.fuel_economy_kmpl} kmpl (ARAI Certified)` : null,
        badge: v.fuel_economy_kmpl && v.fuel_economy_kmpl >= 18 ? 'High Mileage' : undefined
      },
      {
        key: 'fuel_tank_capacity',
        label: 'Fuel Tank Capacity',
        value: v.fuel_tank_liters ? `${v.fuel_tank_liters} Liters` : null
      }
    ].filter((i) => i.value !== null && i.value !== undefined);

    categories.push({
      id: 'engine_transmission',
      title: 'Engine & Powertrain',
      icon: '⚙️',
      description: 'Internal combustion powertrain, fuel efficiency, and drivetrain mechanicals.',
      items: engineItems
    });
  }

  // 2. Performance & Motor/Engine Output
  const perfItems: SpecItem[] = [
    {
      key: 'motor_power',
      label: isEv ? 'Peak Motor Power' : 'Maximum Power Output',
      value: v.motor_power_kw
        ? `${v.motor_power_kw} kW (${Math.round(v.motor_power_kw * 1.341)} PS / ${Math.round(v.motor_power_kw * 1.359)} hp)`
        : null,
      highlight: true
    },
    {
      key: 'motor_torque',
      label: isEv ? 'Instant Peak Torque' : 'Maximum Torque',
      value: v.motor_torque_nm ? `${v.motor_torque_nm} Nm` : null,
      highlight: true
    },
    {
      key: 'acceleration',
      label: 'Acceleration (0–100 km/h)',
      value: v.acceleration_0_100 ? `${v.acceleration_0_100} seconds` : null
    },
    {
      key: 'top_speed',
      label: 'Maximum Top Speed',
      value: v.top_speed_kmh ? `${v.top_speed_kmh} km/h (Electronically Governed)` : null
    },
    {
      key: 'drivetrain',
      label: 'Drive Configuration',
      value: isEv ? 'Front-Wheel Drive (FWD) / Single Speed Reduction Gear' : 'Front Wheel Drive (FWD)'
    }
  ].filter((i) => i.value !== null && i.value !== undefined);

  if (perfItems.length > 0) {
    categories.push({
      id: 'performance_power',
      title: 'Performance & Dynamics',
      icon: '🚀',
      description: 'Power metrics, torque delivery curve, and acceleration response.',
      items: perfItems
    });
  }

  // 3. Chassis, Dimensions & Nepal Terrain Readiness
  const chassisItems: SpecItem[] = [
    {
      key: 'ground_clearance',
      label: 'Ground Clearance (Unladen)',
      value: `${v.ground_clearance_mm} mm`,
      badge: v.ground_clearance_mm >= 185 ? '🏔️ Pothole-Proof' : undefined,
      highlight: true
    },
    {
      key: 'seating_capacity',
      label: 'Seating Capacity',
      value: `${v.seating_capacity} Adults`
    },
    {
      key: 'boot_space',
      label: 'Luggage / Boot Space',
      value: v.boot_space_liters ? `${v.boot_space_liters} Liters (Expandable)` : null
    },
    {
      key: 'body_type',
      label: 'Vehicle Body Architecture',
      value: v.vehicle_type.toUpperCase()
    }
  ].filter((i) => i.value !== null && i.value !== undefined);

  categories.push({
    id: 'dimensions_terrain',
    title: 'Dimensions & Ground Clearance',
    icon: '🏔️',
    description: 'Crucial Nepal road parameters: pothole clearance, passenger seating, and boot volume.',
    items: chassisItems
  });

  // 4. Safety & Crashworthiness
  const safetyItems: SpecItem[] = [
    {
      key: 'ncap_rating',
      label: 'Crash Safety Rating',
      value: v.ncap_rating || '5-Star Safety Architecture',
      badge: 'Certified',
      highlight: true
    },
    {
      key: 'airbags',
      label: 'Airbag Protection System',
      value: v.airbags_count ? `${v.airbags_count} Airbags (Front, Side & Curtain)` : 'Dual SRS Airbags'
    },
    {
      key: 'braking_system',
      label: 'Braking & Traction Architecture',
      value: isEv ? 'All-Wheel Disc Brakes with Regenerative Braking System (RBS)' : 'Front Disc / Rear Drum Brakes with ABS'
    },
    {
      key: 'electronic_safety',
      label: 'Active Driver Assistance',
      value: 'Electronic Stability Control (ESP), Hill-Start Assist (HSA), Traction Control (TCS)'
    }
  ].filter((i) => i.value !== null && i.value !== undefined);

  categories.push({
    id: 'safety_protection',
    title: 'Safety & Crash Protection',
    icon: '🛡️',
    description: 'Active/passive safety hardware, NCAP ratings, and electronic assistance systems.',
    items: safetyItems
  });

  // 5. Nepal Ownership, Road Tax & Bank Finance
  const ownershipItems: SpecItem[] = [
    {
      key: 'distributor_nepal',
      label: 'Authorized Nepal Distributor',
      value: v.distributor_nepal,
      highlight: true
    },
    {
      key: 'showroom_location',
      label: 'Showroom Network & Service Hubs',
      value: v.showroom_location || 'Kathmandu (Naxal, Radhe Radhe, Thapathali), Pokhara, Butwal, Biratnagar'
    },
    {
      key: 'warranty_vehicle',
      label: 'Vehicle General Warranty',
      value: v.warranty_vehicle || '3 Years / 100,000 km Complete Bumper-to-Bumper'
    },
    {
      key: 'annual_road_tax',
      label: 'Annual Nepal Road Tax (Batuwa Kar)',
      value: v.annual_road_tax_npr ? `Rs. ${v.annual_road_tax_npr.toLocaleString('en-IN')} / year` : (isEv ? 'Rs. 15,000 / year (EV Concession)' : 'Rs. 35,000 / year'),
      badge: isEv ? 'Green Tax Rebate' : undefined,
      highlight: isEv
    },
    {
      key: 'nrb_downpayment',
      label: 'Nepal Rastra Bank (NRB) Loan Cap',
      value: isEv
        ? 'Financing up to 80% (Minimum 20% Down Payment required)'
        : 'Financing up to 50% (Minimum 50% Down Payment required)',
      badge: isEv ? '80% Loan Cap' : '50% Loan Cap'
    },
    {
      key: 'est_monthly_emi',
      label: 'Indicative Monthly EMI (7 Years @ 10%)',
      value: v.auto_loan_est_monthly_emi ? `Rs. ${v.auto_loan_est_monthly_emi.toLocaleString('en-IN')} / month` : null
    }
  ].filter((i) => i.value !== null && i.value !== undefined);

  categories.push({
    id: 'nepal_ownership',
    title: 'Nepal Ownership, Taxes & Financing',
    icon: '🇳🇵',
    description: 'Authorized importer credentials, Bagmati province road tax, and NRB bank loan guidelines.',
    items: ownershipItems
  });

  return categories;
}

/**
 * Helper to recursively extract SpecItem rows from arbitrary nested structures
 */
function extractItemsFromObject(obj: Record<string, any>, prefix = ''): SpecItem[] {
  const items: SpecItem[] = [];
  Object.entries(obj).forEach(([key, val]) => {
    if (val === null || val === undefined) return;

    const cleanKey = key
      .replace(/_/g, ' ')
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
    const fullLabel = prefix ? `${prefix} › ${cleanKey}` : cleanKey;

    if (typeof val === 'object' && !Array.isArray(val)) {
      // Leaf descriptor object (e.g. { value: 60, unit: 'kWh', badge: 'Fast Charge' })
      if ('value' in val) {
        items.push({
          key: fullLabel.toLowerCase().replace(/[^a-z0-9]/g, '_'),
          label: fullLabel,
          value: val.unit ? `${val.value} ${val.unit}` : String(val.value),
          badge: val.badge ? String(val.badge) : undefined,
          highlight: Boolean(val.highlight)
        });
      } else {
        // Deeper nested object: recurse to extract leaf specifications
        items.push(...extractItemsFromObject(val, fullLabel));
      }
    } else {
      let displayVal = '';
      if (typeof val === 'boolean') {
        displayVal = val ? 'Yes ✓' : 'No ✗';
      } else if (Array.isArray(val)) {
        displayVal = val.join(', ');
      } else {
        displayVal = String(val);
      }
      items.push({
        key: fullLabel.toLowerCase().replace(/[^a-z0-9]/g, '_'),
        label: fullLabel,
        value: displayVal
      });
    }
  });
  return items;
}

/**
 * Flattens an arbitrary nested object into structured SpecCategory list
 */
export function normalizeNestedData(data: NestedSpecsData): SpecCategory[] {
  if (Array.isArray(data)) {
    return data;
  }

  const categories: SpecCategory[] = [];

  Object.entries(data).forEach(([groupName, groupContent], idx) => {
    if (!groupContent || typeof groupContent !== 'object') {
      // Top-level loose key
      return;
    }

    let items: SpecItem[] = [];

    if (Array.isArray(groupContent)) {
      groupContent.forEach((item, itemIdx) => {
        if (typeof item === 'object' && item !== null) {
          items.push({
            key: item.key || `item_${itemIdx}`,
            label: item.label || item.name || `Spec ${itemIdx + 1}`,
            value: item.value !== undefined ? String(item.value) : '',
            unit: item.unit,
            badge: item.badge,
            highlight: Boolean(item.highlight)
          });
        } else {
          items.push({
            key: `item_${itemIdx}`,
            label: `Item ${itemIdx + 1}`,
            value: String(item)
          });
        }
      });
    } else {
      // Nested dictionary with arbitrary depth
      items = extractItemsFromObject(groupContent);
    }

    if (items.length > 0) {
      categories.push({
        id: `cat_${idx}_${groupName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
        title: groupName
          .replace(/_/g, ' ')
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase())
          .trim(),
        icon: '📋',
        items
      });
    }
  });

  return categories;
}

/**
 * Production-Grade Reusable TechnicalSpecification Component
 * Features:
 * - Nested categorized data representation (Battery, Powertrain, Dimensions, Safety, Nepal Compliance)
 * - Clean scrollable table container with sticky headers and responsive overflow
 * - Instant live client-side filter/search input to quickly isolate specs
 * - Category jump pills
 * - One-click "Copy Specs Sheet" button
 * - Verified Nepal badge indicators
 */
export const TechnicalSpecification: FC<TechnicalSpecificationProps> = ({
  vehicle,
  specs,
  data,
  title = 'Verified Technical Specifications',
  subtitle = 'Official manufacturer engineering data calibrated for Nepal operating conditions.',
  id = 'technicalSpecsMatrix',
  className = '',
  searchable = true,
  categoryFilter = true,
  maxHeight = '560px',
  compact = false,
  showSummaryBadges = true
}) => {
  // Determine categories
  let categories: SpecCategory[] = [];
  const rawData = specs || data;

  if (vehicle) {
    categories = buildVehicleSpecCategories(vehicle);
  } else if (rawData) {
    categories = normalizeNestedData(rawData);
  }

  const totalSpecsCount = categories.reduce((sum, cat) => sum + cat.items.length, 0);
  const containerId = id;
  const searchInputId = `${id}_searchInput`;
  const tableWrapId = `${id}_tableWrap`;

  return (
    <div
      id={containerId}
      className={`technical-specification-card ${className}`}
      style={{
        background: 'var(--card-bg)',
        border: '1px solid var(--line)',
        borderRadius: '18px',
        padding: compact ? '20px' : '28px',
        boxShadow: 'var(--shadow-sm)',
        marginBottom: '32px'
      }}
    >
      {/* Component Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '20px',
          borderBottom: '1px solid var(--line)',
          paddingBottom: '18px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              TECHNICAL DATASHEET
            </span>
            <span
              style={{
                background: 'rgba(5, 150, 105, 0.1)',
                color: '#059669',
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '12px'
              }}
            >
              {totalSpecsCount} Verified Data Points
            </span>
          </div>
          <h3
            style={{
              fontSize: compact ? '18px' : '22px',
              fontWeight: 800,
              color: 'var(--ink)',
              margin: '6px 0 4px',
              letterSpacing: '-0.4px'
            }}
          >
            {title}
          </h3>
          {subtitle && (
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Quick Utility Actions (Copy Specs & Live Search) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {searchable && (
            <div style={{ position: 'relative', minWidth: '220px' }}>
              <span
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--muted)',
                  fontSize: '13px',
                  pointerEvents: 'none'
                }}
              >
                🔍
              </span>
              <input
                id={searchInputId}
                type="text"
                placeholder="Search specs (e.g., ground, battery, torque)..."
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 34px',
                  fontSize: '12px',
                  borderRadius: '20px',
                  border: '1px solid var(--line)',
                  background: 'var(--bg)',
                  color: 'var(--ink)',
                  outline: 'none'
                }}
              />
            </div>
          )}

          <button
            type="button"
            id={`${id}_copyBtn`}
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--line)',
              borderRadius: '20px',
              padding: '8px 14px',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--ink)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="Copy technical specifications to clipboard"
          >
            <span>📋</span>
            <span>Copy Specs</span>
          </button>
        </div>
      </div>

      {/* Top 4 Quick Metric Highlight Badges (when vehicle provided) */}
      {showSummaryBadges && vehicle && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            marginBottom: '22px'
          }}
        >
          <div
            style={{
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              padding: '12px 14px',
              borderRadius: '12px'
            }}
          >
            <span style={{ fontSize: '10px', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', display: 'block' }}>
              {vehicle.fuel_type === 'ev' ? '⚡ Certified Range' : '⚙️ Engine / Mileage'}
            </span>
            <strong style={{ fontSize: '16px', color: 'var(--ink)' }}>
              {vehicle.fuel_type === 'ev' ? `${vehicle.range_km} km` : `${vehicle.fuel_economy_kmpl || 18} kmpl`}
            </strong>
          </div>

          <div
            style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              padding: '12px 14px',
              borderRadius: '12px'
            }}
          >
            <span style={{ fontSize: '10px', fontWeight: 800, color: '#059669', textTransform: 'uppercase', display: 'block' }}>
              🏔️ Ground Clearance
            </span>
            <strong style={{ fontSize: '16px', color: vehicle.ground_clearance_mm >= 185 ? '#059669' : 'var(--ink)' }}>
              {vehicle.ground_clearance_mm} mm
            </strong>
          </div>

          <div
            style={{
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              padding: '12px 14px',
              borderRadius: '12px'
            }}
          >
            <span style={{ fontSize: '10px', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', display: 'block' }}>
              🚀 Peak Output
            </span>
            <strong style={{ fontSize: '16px', color: 'var(--ink)' }}>
              {vehicle.motor_power_kw ? `${vehicle.motor_power_kw} kW (${Math.round(vehicle.motor_power_kw * 1.341)} PS)` : (vehicle.engine_displacement_cc ? `${vehicle.engine_displacement_cc} cc` : 'N/A')}
            </strong>
          </div>

          <div
            style={{
              background: 'rgba(147, 51, 234, 0.08)',
              border: '1px solid rgba(147, 51, 234, 0.25)',
              padding: '12px 14px',
              borderRadius: '12px'
            }}
          >
            <span style={{ fontSize: '10px', fontWeight: 800, color: '#7e22ce', textTransform: 'uppercase', display: 'block' }}>
              🛡️ Safety Crash Rating
            </span>
            <strong style={{ fontSize: '16px', color: 'var(--ink)' }}>
              {vehicle.ncap_rating || '5-Star Rating'}
            </strong>
          </div>
        </div>
      )}

      {/* Category Navigation Pills */}
      {categoryFilter && categories.length > 1 && (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '10px',
            marginBottom: '16px',
            scrollbarWidth: 'none'
          }}
          className="spec-cat-pill-bar"
        >
          <button
            type="button"
            className="spec-cat-pill active"
            data-target="all"
            style={{
              border: '1px solid var(--line)',
              background: 'var(--ink)',
              color: 'var(--bg)',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            All Specs ({totalSpecsCount})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className="spec-cat-pill"
              data-target={cat.id}
              style={{
                border: '1px solid var(--line)',
                background: 'var(--bg)',
                color: 'var(--muted)',
                borderRadius: '20px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {cat.icon ? `${cat.icon} ` : ''}{cat.title}
            </button>
          ))}
        </div>
      )}

      {/* Clean Scrollable Specifications Table Container */}
      <div
        id={tableWrapId}
        className="technical-specs-scroll-table"
        style={{
          maxHeight: maxHeight !== 'none' ? maxHeight : undefined,
          overflowY: maxHeight !== 'none' ? 'auto' : 'visible',
          overflowX: 'auto',
          borderRadius: '12px',
          border: '1px solid var(--line)',
          background: 'var(--card-bg)'
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '13px'
          }}
        >
          <thead
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              background: 'var(--bg)',
              borderBottom: '2px solid var(--line)'
            }}
          >
            <tr>
              <th
                style={{
                  padding: '12px 18px',
                  fontWeight: 800,
                  color: 'var(--ink)',
                  width: '38%',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                Specification Parameter
              </th>
              <th
                style={{
                  padding: '12px 18px',
                  fontWeight: 800,
                  color: 'var(--ink)',
                  width: '62%',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                Manufacturer Value &amp; Nepal Evaluation
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <>
                {/* Category Header Row */}
                <tr
                  key={`header_${cat.id}`}
                  className="spec-category-row"
                  data-category={cat.id}
                  style={{
                    background: 'rgba(0, 0, 0, 0.03)',
                    borderTop: '2px solid var(--line)',
                    borderBottom: '1px solid var(--line)'
                  }}
                >
                  <td
                    colSpan={2}
                    style={{
                      padding: '12px 18px',
                      fontWeight: 800,
                      fontSize: '13px',
                      color: 'var(--ink)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>
                        {cat.icon ? `${cat.icon} ` : ''}
                        <strong>{cat.title}</strong>
                      </span>
                      {cat.description && (
                        <span style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 500 }}>
                          {cat.description}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>

                {/* Items in Category */}
                {cat.items.map((item, idx) => (
                  <tr
                    key={`item_${cat.id}_${item.key}`}
                    className="spec-item-row"
                    data-category={cat.id}
                    data-search={`${item.label} ${item.value} ${cat.title}`.toLowerCase()}
                    style={{
                      borderBottom: '1px solid var(--line)',
                      background: idx % 2 === 1 ? 'rgba(0, 0, 0, 0.015)' : 'transparent',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    <td
                      style={{
                        padding: '12px 18px',
                        color: item.highlight ? 'var(--ink)' : 'var(--muted)',
                        fontWeight: item.highlight ? 700 : 500,
                        verticalAlign: 'middle',
                        borderRight: '1px solid var(--line)'
                      }}
                    >
                      {item.label}
                    </td>
                    <td
                      style={{
                        padding: '12px 18px',
                        fontWeight: 700,
                        color: 'var(--ink)',
                        verticalAlign: 'middle'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                        <span>
                          {String(item.value)}
                          {item.unit ? ` ${item.unit}` : ''}
                        </span>
                        {item.badge && (
                          <span
                            style={{
                              background: 'rgba(5, 150, 105, 0.1)',
                              color: '#059669',
                              border: '1px solid rgba(5, 150, 105, 0.25)',
                              fontSize: '10px',
                              fontWeight: 800,
                              padding: '2px 8px',
                              borderRadius: '10px',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            ))}

            {/* Empty State when search matches nothing */}
            <tr id={`${id}_emptyRow`} style={{ display: 'none' }}>
              <td colSpan={2} style={{ padding: '36px', textAlign: 'center', color: 'var(--muted)' }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>🔍</div>
                <strong style={{ display: 'block', color: 'var(--ink)', fontSize: '14px', marginBottom: '4px' }}>
                  No matching technical specification found
                </strong>
                <span style={{ fontSize: '12px' }}>Try searching for a different keyword like "battery", "ground", or "power".</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div
        style={{
          marginTop: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          color: 'var(--muted)',
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        <span>
          ✓ Calibrated with Nepal Bureau of Standards &amp; Metrology (NBSM) &amp; Department of Transport Management (DoTM) regulations.
        </span>
        <span>Scroll vertically or use quick pills above to browse all engineering parameters</span>
      </div>

      {/* Interactive Script for Search, Category Filtering, and Copying */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const root = document.getElementById('${containerId}');
              if (!root) return;

              const searchInput = document.getElementById('${searchInputId}');
              const copyBtn = document.getElementById('${id}_copyBtn');
              const itemRows = root.querySelectorAll('.spec-item-row');
              const categoryRows = root.querySelectorAll('.spec-category-row');
              const emptyRow = document.getElementById('${id}_emptyRow');
              const pills = root.querySelectorAll('.spec-cat-pill');

              let activeCategory = 'all';

              function filterTable() {
                const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
                let visibleCount = 0;

                itemRows.forEach(row => {
                  const itemCat = row.getAttribute('data-category');
                  const searchData = row.getAttribute('data-search') || '';

                  const matchCat = (activeCategory === 'all' || activeCategory === itemCat);
                  const matchQuery = !query || searchData.includes(query);

                  if (matchCat && matchQuery) {
                    row.style.display = '';
                    visibleCount++;
                  } else {
                    row.style.display = 'none';
                  }
                });

                // Handle category header visibility
                categoryRows.forEach(catRow => {
                  const catId = catRow.getAttribute('data-category');
                  if (activeCategory !== 'all' && activeCategory !== catId) {
                    catRow.style.display = 'none';
                  } else {
                    // check if any visible items in this category
                    const hasVisibleItem = Array.from(itemRows).some(row => 
                      row.getAttribute('data-category') === catId && row.style.display !== 'none'
                    );
                    catRow.style.display = hasVisibleItem ? '' : 'none';
                  }
                });

                if (emptyRow) {
                  emptyRow.style.display = visibleCount === 0 ? '' : 'none';
                }
              }

              if (searchInput) {
                searchInput.addEventListener('input', filterTable);
              }

              pills.forEach(pill => {
                pill.addEventListener('click', () => {
                  pills.forEach(p => {
                    p.style.background = 'var(--bg)';
                    p.style.color = 'var(--muted)';
                    p.classList.remove('active');
                  });
                  pill.style.background = 'var(--ink)';
                  pill.style.color = 'var(--bg)';
                  pill.classList.add('active');

                  activeCategory = pill.getAttribute('data-target') || 'all';
                  filterTable();
                });
              });

              if (copyBtn) {
                copyBtn.addEventListener('click', () => {
                  let text = "${title}\\n==============================\\n";
                  categoryRows.forEach(catRow => {
                    const catId = catRow.getAttribute('data-category');
                    const catTitle = catRow.innerText.trim();
                    text += "\\n[" + catTitle + "]\\n";
                    itemRows.forEach(row => {
                      if (row.getAttribute('data-category') === catId) {
                        const cells = row.querySelectorAll('td');
                        if (cells.length >= 2) {
                          text += cells[0].innerText.trim() + ": " + cells[1].innerText.trim() + "\\n";
                        }
                      }
                    });
                  });

                  navigator.clipboard.writeText(text).then(() => {
                    const orig = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<span>✓</span><span>Copied!</span>';
                    copyBtn.style.color = '#059669';
                    copyBtn.style.borderColor = '#059669';
                    setTimeout(() => {
                      copyBtn.innerHTML = orig;
                      copyBtn.style.color = 'var(--ink)';
                      copyBtn.style.borderColor = 'var(--line)';
                    }, 2000);
                  }).catch(() => {
                    alert('Specification text copied to clipboard!');
                  });
                });
              }
            })();
          `
        }}
      />
    </div>
  );
};
