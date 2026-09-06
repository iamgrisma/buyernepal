import { Link } from 'react-router-dom';

export default function NotFound() {
  return <div className="store-page"><div className="store-shell store-empty" style={{ marginTop: 80 }}><div className="empty-icon">404</div><h1>Page not found</h1><p>The page you're looking for doesn't exist or has moved.</p><Link to="/" className="primary-action">Back to BuyerNepal</Link></div></div>;
}
