import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Category { id: number; name: string; slug: string; }
interface Props { title?: string; logo?: string; categories: Category[]; }

export default function StoreHeader({ title = 'BuyerNepal', logo, categories }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="store-topbar"><div className="store-shell store-topbar-inner"><span>🇳🇵 Nepal's shopping discovery platform</span><span className="store-topbar-note">Compare • Discover • Shop smarter</span></div></div>
      <header className="store-header">
        <div className="store-shell store-header-inner">
          <Link to="/" className="store-brand" aria-label={`${title} home`}>
            {logo ? <img src={logo} alt="" className="store-logo" /> : <span className="store-logo-mark">B</span>}
            <span><strong>{title}</strong><small>SHOP SMARTER</small></span>
          </Link>
          <nav className="store-nav" aria-label="Primary navigation">
            <Link to="/" className="store-nav-active">Home</Link>
            {categories.slice(0, 5).map((category) => <Link key={category.id} to={`/category/${category.slug}`}>{category.name}</Link>)}
          </nav>
          <div className="store-header-actions">
            <Link to="/admin/login" className="store-admin-link">Admin</Link>
            <button className="store-menu" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Open menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
        {open && <nav className="store-mobile-nav store-shell" aria-label="Mobile navigation">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          {categories.map((category) => <Link key={category.id} to={`/category/${category.slug}`} onClick={() => setOpen(false)}>{category.name}</Link>)}
          <Link to="/admin/login" onClick={() => setOpen(false)}>Admin</Link>
        </nav>}
      </header>
    </>
  );
}
