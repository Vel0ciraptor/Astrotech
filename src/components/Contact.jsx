import { useState } from 'react';
import GlassCard from './GlassCard';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useScrollReveal({ target: '.reveal-item' });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send via WhatsApp
    const msg = `¡Hola! Soy ${form.name}.\n\nEmail: ${form.email}\n\nMensaje: ${form.message}`;
    window.open(`https://wa.me/59176382164?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="section contact" id="contacto" ref={containerRef}>
      <div className="section-bg">
        <div className="section-grid" />
        <div className="section-glow" />
      </div>
      <div className="container">
        <div className="section-header">
          <span className="section-label reveal-item">Contacto</span>
          <h2 className="section-title reveal-item">
            Hablemos de tu <span className="gradient-text">proyecto</span>
          </h2>
          <p className="section-subtitle reveal-item">
            Respuesta rápida. Cuéntanos qué necesitas y te ayudamos a hacerlo realidad.
          </p>
        </div>

        <div className="contact-wrapper">
          <GlassCard className="contact-card reveal-item" noHover>
            {submitted ? (
              <div className="contact-success">
                <div className="contact-success-icon">✅</div>
                <h3>¡Mensaje enviado!</h3>
                <p>Te responderemos lo antes posible.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-field">
                  <label className="contact-label" htmlFor="contact-name">Nombre</label>
                  <input
                    id="contact-name"
                    className="contact-input"
                    type="text"
                    name="name"
                    placeholder="Tu nombre"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label className="contact-label" htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    className="contact-input"
                    type="email"
                    name="email"
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label className="contact-label" htmlFor="contact-message">Mensaje</label>
                  <textarea
                    id="contact-message"
                    className="contact-textarea"
                    name="message"
                    placeholder="Cuéntanos sobre tu proyecto..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-lg contact-submit">
                  Enviar mensaje
                </button>

                <div className="contact-divider">
                  <div className="contact-divider-line"></div>
                  <span className="contact-divider-text">o contáctanos directamente</span>
                  <div className="contact-divider-line"></div>
                </div>

                <div className="contact-actions">
                  <a
                    href="https://wa.me/59176382164"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-action"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.702-1.233A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.239 0-4.332-.726-6.033-1.96l-.424-.318-3.118.818.833-3.04-.349-.556A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                    </svg>
                    WhatsApp
                  </a>
                  <a
                    href="mailto:contacto@astrotech.dev"
                    className="contact-action"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Email
                  </a>
                </div>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
