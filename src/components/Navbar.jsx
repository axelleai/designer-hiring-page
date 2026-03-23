import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const scrollTo = (id) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      window.location.href = '/#' + id;
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="navbar">
        <div className="container navbar-inner">
          <Link to="/" className="navbar-logo">
            <svg viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#EC4899" />
              <path d="M8 16C8 11.582 11.582 8 16 8C20.418 8 24 11.582 24 16" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <circle cx="16" cy="20" r="4" fill="white" />
            </svg>
            DesignHire
          </Link>

          <ul className="navbar-links">
            <li><a href="#designers" onClick={(e) => { e.preventDefault(); scrollTo('designers'); }}>Designers</a></li>
            <li><a href="#featured" onClick={(e) => { e.preventDefault(); scrollTo('featured'); }}>Featured</a></li>
            <li><a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollTo('testimonials'); }}>Testimonials</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a></li>
          </ul>

          <div className="navbar-cta">
            <button className="btn btn-secondary" onClick={() => scrollTo('designers')}>Browse</button>
            <button className="btn btn-primary" onClick={() => scrollTo('contact')}>Post a Job</button>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMobileOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-menu-overlay">
          <button className="close-btn" onClick={() => setMobileOpen(false)}>
            <X size={28} />
          </button>
          <nav>
            <a href="#designers" onClick={(e) => { e.preventDefault(); scrollTo('designers'); }}>Designers</a>
            <a href="#featured" onClick={(e) => { e.preventDefault(); scrollTo('featured'); }}>Featured</a>
            <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollTo('testimonials'); }}>Testimonials</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>Contact</a>
          </nav>
          <div className="mobile-cta">
            <button className="btn btn-primary btn-lg" onClick={() => scrollTo('contact')}>Post a Job</button>
          </div>
        </div>
      )}
    </>
  );
}
