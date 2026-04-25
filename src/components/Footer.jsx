import './Footer.css';

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo.png" alt="Astrotech" />
              <span className="footer-logo-text">ASTRO<span>TECH</span></span>
            </div>
            <p className="footer-tagline">
              Sistemas digitales rápidos, automatizados y escalables.
              Digital Systems · Automation · AI.
            </p>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Links</h4>
            <div className="footer-links">
              <button className="footer-link" onClick={() => scrollTo('inicio')}>Inicio</button>
              <button className="footer-link" onClick={() => scrollTo('servicios')}>Servicios</button>
              <button className="footer-link" onClick={() => scrollTo('proyectos')}>Proyectos</button>
              <button className="footer-link" onClick={() => scrollTo('tienda')}>Tienda</button>
              <button className="footer-link" onClick={() => scrollTo('contacto')}>Contacto</button>
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Servicios</h4>
            <div className="footer-links">
              <span className="footer-link">Automatización</span>
              <span className="footer-link">Webs Rápidas</span>
              <span className="footer-link">Agentes IA</span>
              <span className="footer-link">Consultoría</span>
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Contacto</h4>
            <div className="footer-links">
              <a href="https://wa.me/59176382164" target="_blank" rel="noopener noreferrer" className="footer-link">
                WhatsApp
              </a>
              <a href="mailto:contacto@astrotech.dev" className="footer-link">
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} Astrotech. Todos los derechos reservados.
          </p>
          <div className="footer-socials">
            <a href="https://wa.me/59176382164" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.702-1.233A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.239 0-4.332-.726-6.033-1.96l-.424-.318-3.118.818.833-3.04-.349-.556A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
