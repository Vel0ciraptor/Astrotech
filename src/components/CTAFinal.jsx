import { useScrollReveal } from '../hooks/useScrollReveal';
import './CTAFinal.css';

export default function CTAFinal() {
  const containerRef = useScrollReveal({ target: '.reveal-item' });

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="cta-final" ref={containerRef}>
      <div className="cta-final-bg">
        <div className="cta-final-glow cta-final-glow-1"></div>
        <div className="cta-final-glow cta-final-glow-2"></div>
      </div>

      <div className="cta-final-shape cta-final-shape-1"></div>
      <div className="cta-final-shape cta-final-shape-2"></div>

      <div className="container">
        <div className="cta-final-content">
          <h2 className="cta-final-title reveal-item">
            Si tu negocio necesita más que una web…{' '}
            <span className="gradient-text">nosotros lo construimos.</span>
          </h2>
          <p className="cta-final-text reveal-item">
            Sistemas digitales completos que venden, automatizan y escalan.
            No es un portafolio — es una máquina digital.
          </p>
          <div className="cta-final-buttons reveal-item">
            <button className="btn btn-primary btn-lg" onClick={() => scrollTo('contacto')}>
              Contactar ahora
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => scrollTo('tienda')}>
              Ver tienda
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
