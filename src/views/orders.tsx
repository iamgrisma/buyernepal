import { FC } from 'hono/jsx';
import { Category, Order, SiteSettings } from '../types';
import { Layout } from './layout';
import { Header, Footer, MobileBottomBar } from './components';

export const TrackOrderPage: FC<{
  order?: Order | null;
  searchedQuery?: string;
  settings: SiteSettings;
  categories: Category[];
}> = ({ order, searchedQuery = '', settings, categories }) => {
  const steps = [
    { key: 'placed', label: 'Order Received', desc: 'Verified by BuyerNepal System', icon: '📝' },
    { key: 'processing', label: 'Processing & Verification', desc: 'Stock allocated in warehouse', icon: '📦' },
    { key: 'shipped', label: 'Shipped via Express', desc: 'In transit with delivery partner', icon: '🚚' },
    { key: 'delivered', label: 'Delivered', desc: 'Handed to customer', icon: '✅' }
  ];

  const statusOrder = ['placed', 'processing', 'shipped', 'delivered'];
  const currentStatusIndex = order ? statusOrder.indexOf(order.order_status) : -1;

  return (
    <Layout
      title="Track Your Order in Nepal | BuyerNepal Express Delivery"
      description="Track live order status, physical delivery across Nepal 77 districts, or access your instant digital download codes."
      url="https://buyernepal.com/track-order"
    >
      <div className="store-page track-order-page">
        <Header settings={settings} categories={categories} activeSlug="orders" />

        <main className="store-shell">
          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            <a href="/">Home</a>
            <span>/</span>
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Order Tracking</span>
          </div>

          {/* Header */}
          <div className="track-hero-box">
            <span style={{ fontSize: '36px', display: 'block', marginBottom: '8px' }}>📦</span>
            <h1 style={{ fontSize: '26px', fontWeight: 900 }}>Live Order Tracking & Delivery Status</h1>
            <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '6px', maxWidth: '520px', margin: '6px auto 20px' }}>
              Enter your BuyerNepal Order Number (e.g. <code>BN-2026-XXXXXX</code>) to view the current dispatch timeline or digital download keys.
            </p>

            <form method="get" action="/track-order" className="track-search-form">
              <input
                type="text"
                name="q"
                defaultValue={searchedQuery}
                placeholder="Enter Order Number or Phone (e.g. BN-2026-102938)"
                required
                className="track-input"
              />
              <button type="submit" className="primary-action" style={{ padding: '12px 24px' }}>
                Track Order 🔍
              </button>
            </form>
          </div>

          {/* Results Area */}
          {searchedQuery && !order && (
            <div className="order-not-found-card" style={{ marginTop: '36px' }}>
              <span style={{ fontSize: '40px' }}>🔍</span>
              <h3>Order Not Found</h3>
              <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '6px' }}>
                We could not find an order matching <strong>"{searchedQuery}"</strong>. Please check your confirmation SMS/Email or contact our customer desk.
              </p>
              <a href="https://wa.me/9779800000000" target="_blank" rel="noopener noreferrer" className="filter-pill" style={{ marginTop: '16px', display: 'inline-flex' }}>
                💬 Chat with BuyerNepal Support on WhatsApp
              </a>
            </div>
          )}

          {order && (
            <div className="order-result-card" style={{ marginTop: '36px' }}>
              <div className="order-result-header">
                <div>
                  <span className="order-number-badge">{order.order_number}</span>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, marginTop: '8px' }}>{order.product_name}</h2>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>
                    Placed on: {new Date(order.created_at || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: 'var(--accent)' }}>
                    Rs. {order.total_amount.toLocaleString()}
                  </div>
                  <span className={`order-status-pill status-${order.order_status}`}>
                    ● {order.order_status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Digital Goods Box if digital */}
              {order.delivery_type === 'digital' && (
                <div className="digital-access-box" style={{ marginTop: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '24px' }}>⚡</span>
                    <div>
                      <strong>Instant Digital Download &amp; License Key</strong>
                      <div style={{ fontSize: '12px', color: 'var(--muted)' }}>This product includes instant electronic access.</div>
                    </div>
                  </div>
                  <div className="digital-key-display">
                    <code>{order.digital_download_code || 'BN-KEY-ACTIVATED-2026'}</code>
                  </div>
                </div>
              )}

              {/* Status Stepper */}
              <div className="order-timeline-stepper" style={{ marginTop: '28px' }}>
                {steps.map((step, idx) => {
                  const isDone = currentStatusIndex >= idx;
                  const isCurrent = currentStatusIndex === idx;

                  return (
                    <div key={step.key} className={`timeline-step ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
                      <div className="step-circle">{step.icon}</div>
                      <div className="step-info">
                        <strong>{step.label}</strong>
                        <small>{step.desc}</small>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Customer & Delivery Summary */}
              <div className="order-meta-grid" style={{ marginTop: '28px' }}>
                <div className="order-meta-box">
                  <h4>👤 Customer Info</h4>
                  <p><strong>Name:</strong> {order.customer_name}</p>
                  <p><strong>Phone:</strong> {order.customer_phone}</p>
                  <p><strong>Email:</strong> {order.customer_email}</p>
                </div>
                <div className="order-meta-box">
                  <h4>📍 Delivery Details</h4>
                  <p><strong>Location:</strong> {order.city}, {order.district}</p>
                  <p><strong>Address:</strong> {order.shipping_address || 'Express Pickup'}</p>
                  <p><strong>Method:</strong> {order.delivery_type === 'digital' ? 'Instant Digital Access' : 'Express Courier'}</p>
                </div>
                <div className="order-meta-box">
                  <h4>💳 Payment Summary</h4>
                  <p><strong>Payment Mode:</strong> {order.payment_method.toUpperCase()}</p>
                  <p><strong>Payment Status:</strong> <span style={{ textTransform: 'capitalize' }}>{order.payment_status}</span></p>
                  <p><strong>Amount:</strong> Rs. {order.total_amount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </main>

        <Footer settings={settings} />
        <MobileBottomBar />
      </div>
    </Layout>
  );
};

export const OrderSuccessPage: FC<{
  orderNumber: string;
  productName: string;
  totalAmount: number;
  paymentMethod: string;
  isDigital: boolean;
  digitalCode?: string;
  settings: SiteSettings;
  categories: Category[];
}> = ({ orderNumber, productName, totalAmount, paymentMethod, isDigital, digitalCode, settings, categories }) => {
  return (
    <Layout
      title="Order Confirmed! | BuyerNepal"
      description="Thank you for purchasing on BuyerNepal. Your order is registered and in dispatch."
      url="https://buyernepal.com"
    >
      <div className="store-page order-success-page">
        <Header settings={settings} categories={categories} />

        <main className="store-shell" style={{ textAlign: 'center' }}>
          <div className="order-success-card">
            <span style={{ fontSize: '56px', display: 'block', marginBottom: '12px' }}>🎉</span>
            <h1 style={{ fontSize: '26px', fontWeight: 900 }}>Thank You! Your Order is Confirmed</h1>
            <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '8px' }}>
              We have received your order for <strong>{productName}</strong>. Our team will verify and prepare your dispatch immediately.
            </p>

            <div className="order-confirm-box" style={{ margin: '24px auto', maxWidth: '460px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--muted)', fontSize: '13px' }}>Order Tracking Number:</span>
                <strong style={{ color: 'var(--accent)', fontSize: '15px' }}>{orderNumber}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'var(--muted)', fontSize: '13px' }}>Total Amount:</span>
                <strong style={{ fontSize: '15px' }}>Rs. {totalAmount.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--muted)', fontSize: '13px' }}>Payment Mode:</span>
                <strong style={{ textTransform: 'uppercase', fontSize: '13px' }}>{paymentMethod}</strong>
              </div>
            </div>

            {isDigital && (
              <div className="digital-access-box" style={{ maxWidth: '460px', margin: '0 auto 24px', textAlign: 'left' }}>
                <strong>⚡ Instant Digital License Key:</strong>
                <div className="digital-key-display" style={{ marginTop: '8px' }}>
                  <code>{digitalCode || 'BN-KEY-CONFIRMED-2026'}</code>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
              <a href={`/track-order?q=${orderNumber}`} className="primary-action">
                Track Live Order 🚚
              </a>
              <a href="/" className="filter-pill" style={{ padding: '12px 20px' }}>
                Continue Browsing Catalog
              </a>
            </div>
          </div>
        </main>

        <Footer settings={settings} />
        <MobileBottomBar />
      </div>
    </Layout>
  );
};
