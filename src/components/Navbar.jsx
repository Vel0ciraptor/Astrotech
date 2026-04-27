import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'tienda', label: 'Tienda' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Navbar({ onCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="navbar-glass">
        <a href="/" className="navbar-logo" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          <img src="/logo.png" alt="Astrotech" className="navbar-logo-img" />
          <span className="navbar-logo-text">
            ASTRO<span>TECH</span>
          </span>
        </a>

        <div className="navbar-links">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              className={`navbar-link ${activeSection === id ? 'active' : ''}`}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="navbar-right">
          <button className="navbar-cart" onClick={onCartOpen} aria-label="Carrito">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {totalItems > 0 && (
              <span className="navbar-cart-badge">{totalItems}</span>
            )}
          </button>

          <button
            className="btn btn-primary btn-sm navbar-cta"
            onClick={() => scrollTo('contacto')}
          >
            Trabajar juntos
          </button>

          <button
            className={`navbar-hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div className={`navbar-mobile ${mobileOpen ? 'open' : ''}`}>
        <div className="navbar-mobile-container">
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              className={`navbar-mobile-link ${activeSection === id ? 'active' : ''}`}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
          <button
            className="btn btn-primary btn-lg navbar-mobile-cta"
            onClick={() => scrollTo('contacto')}
          >
            Trabajar juntos
          </button>
        </div>
      </div>
    </nav>
  );
}
