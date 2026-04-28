import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import Navbar from '../components/Navbar';
import Cart from '../components/Cart';
import Footer from '../components/Footer';
import ImageModal from '../components/ImageModal';
import { 
  ArrowLeft, MessageCircle, ChevronRight, CheckCircle2, Maximize2,
  Workflow, LayoutDashboard, Bot, Briefcase, Settings, Cpu, LineChart
} from 'lucide-react';
import './ServiceDetail.css';

// Manual map for dynamic service icons to avoid importing the whole library
const IconMap = {
  Workflow,
  LayoutDashboard,
  Bot,
  Briefcase,
  Settings,
  Cpu,
  LineChart
};

const processSteps = [
  { label: 'Análisis', desc: 'Evaluamos tus necesidades específicas y definimos el alcance.' },
  { label: 'Propuesta', desc: 'Diseñamos un plan con arquitectura, plazos y costos claros.' },
  { label: 'Implementación', desc: 'Desarrollamos e integramos la solución con control de calidad.' },
  { label: 'Soporte', desc: 'Acompañamiento continuo, optimización y actualizaciones.' },
];

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services } = useAdmin();
  const [cartOpen, setCartOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState('');

  const service = services.find(s => s.id === id);
  const otherServices = services.filter(s => s.id !== id);

  if (!service) {
    return (
      <>
        <Navbar onCartOpen={() => setCartOpen(true)} />
        <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Servicio no encontrado
          </h2>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Volver al inicio
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const IconComponent = IconMap[service.iconName] || Briefcase;
  const c = service.color || '#a855f7';

  const handleWhatsApp = () => {
    const msg = `¡Hola! Me interesa el servicio de ${service.title}. Quisiera más información.`;
    window.open(`https://wa.me/59176382164?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const openLightbox = (src) => {
    setSelectedImg(src);
    setModalOpen(true);
  };

  return (
    <div className="sd-page">
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <ImageModal src={selectedImg} isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section className="sd-hero">
        <div className="sd-blob sd-blob-1" style={{ background: `radial-gradient(circle, ${c}, transparent 70%)` }} />
        <div className="sd-blob sd-blob-2" style={{ background: `radial-gradient(circle, ${c}, transparent 70%)` }} />
        <div className="sd-grid-overlay" />

        <div className="sd-hero-inner container">
          <button className="sd-back" onClick={() => navigate('/')}>
            <ArrowLeft size={16} />
            Volver
          </button>

          <div className="sd-hero-layout">
            <div className="sd-hero-text">
              <div className="sd-category-label" style={{ color: c, borderColor: `${c}40`, background: `${c}10` }}>
                <IconComponent size={12} />
                {service.title}
              </div>

              <h1 className="sd-headline">
                {service.description || service.title}
              </h1>

              <p className="sd-sub">
                {service.details || 'Soluciones inteligentes que automatizan, optimizan y escalan tu negocio al siguiente nivel.'}
              </p>

              <div className="sd-price-row">
                <div className="sd-price" style={{ color: c }}>{service.priceText}</div>
                <button className="sd-cta-btn" style={{ background: c, color: '#0a0f19' }} onClick={handleWhatsApp}>
                  <MessageCircle size={16} />
                  Solicitar presupuesto
                </button>
              </div>

              {service.features && service.features.length > 0 && (
                <div className="sd-pills">
                  {service.features.map((feat, i) => (
                    <span key={i} className="sd-pill" style={{ borderColor: `${c}40`, color: c, background: `${c}10` }}>
                      {feat}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="sd-hero-visual">
              {service.image ? (
                <div className="sd-visual-image" onClick={() => openLightbox(service.image)} style={{ cursor: 'zoom-in' }}>
                  <img src={service.image} alt={service.title} />
                  <div className="sd-visual-zoom-hint">
                    <Maximize2 size={24} />
                  </div>
                </div>
              ) : (
                <>
                  <div className="sd-visual-ring sd-visual-ring-1" style={{ borderColor: `${c}15` }} />
                  <div className="sd-visual-ring sd-visual-ring-2" style={{ borderColor: `${c}25` }} />
                  <div className="sd-visual-ring sd-visual-ring-3" style={{ borderColor: `${c}40` }} />
                  <div className="sd-visual-core" style={{ background: `${c}15`, borderColor: c, color: c }}>
                    <IconComponent size={96} strokeWidth={1} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="sd-process">
        <div className="container">
          <p className="sd-section-label">Nuestro proceso</p>
          <h2 className="sd-section-title">
            Así trabajamos <span className="gradient-text">contigo</span>
          </h2>

          <div className="sd-process-grid">
            {processSteps.map((step, i) => (
              <div key={i} className="sd-process-step">
                <div className="sd-step-number" style={{ borderColor: `${c}40`, color: c }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div
                  className="sd-step-line"
                  style={{
                    background: i < processSteps.length - 1 ? `linear-gradient(90deg, ${c}60, transparent)` : 'transparent'
                  }}
                />
                <h3 className="sd-step-title">{step.label}</h3>
                <p className="sd-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {service.features && service.features.length > 0 && (
        <section className="sd-features">
          <div className="container">
            <div className="sd-features-layout">
              <div className="sd-features-left">
                <p className="sd-section-label">¿Qué incluye?</p>
                <h2 className="sd-section-title" style={{ textAlign: 'left' }}>
                  Todo lo que <span className="gradient-text">necesitas</span> para empezar
                </h2>
                <button className="sd-cta-btn mt-8" style={{ background: c, color: '#0a0f19' }} onClick={handleWhatsApp}>
                  <MessageCircle size={16} />
                  Hablar con el equipo
                </button>
              </div>

              <div className="sd-features-right">
                {service.features.map((feat, i) => (
                  <div key={i} className="sd-feature-item">
                    <div className="sd-feature-icon" style={{ background: `${c}18`, color: c }}>
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <div className="sd-feature-title">{feat}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {otherServices.length > 0 && (
        <section className="sd-others">
          <div className="container">
            <p className="sd-section-label">Más servicios</p>
            <div className="sd-others-grid">
              {otherServices.map(s => {
                const Ic = IconMap[s.iconName] || Briefcase;
                return (
                  <button
                    key={s.id}
                    className="sd-other-card"
                    onClick={() => navigate(`/servicio/${s.id}`)}
                  >
                    <div className="sd-other-icon" style={{ background: `${s.color}18`, color: s.color }}>
                      <Ic size={22} />
                    </div>
                    <div className="sd-other-info">
                      <div className="sd-other-title">{s.title}</div>
                      <div className="sd-other-price" style={{ color: s.color }}>{s.priceText}</div>
                    </div>
                    <ChevronRight size={16} className="sd-other-arrow" />
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
