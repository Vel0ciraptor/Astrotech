import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useAdmin } from '../context/AdminContext';
import { Icons } from './Icons';
import './Services.css';

// Manual map for dynamic service icons
const IconMap = {
  Workflow: Icons.Workflow,
  LayoutDashboard: Icons.LayoutDashboard,
  Bot: Icons.Bot,
  Briefcase: Icons.Briefcase,
  Settings: Icons.Settings,
  Cpu: Icons.Cpu,
  LineChart: Icons.LineChart
};

export default function Services() {
  const { services } = useAdmin();
  const navigate = useNavigate();
  const containerRef = useScrollReveal({ target: '.reveal-item' });

  return (
    <section className="section services" id="servicios" ref={containerRef}>
      <div className="section-bg">
        <div className="section-grid" />
        <div className="section-glow" />
        <div className="section-orb section-orb-1" />
        <div className="section-orb section-orb-2" />
      </div>
      <div className="container">
        <div className="section-header">
          <span className="section-label reveal-item">Servicios</span>
          <h2 className="section-title reveal-item">
            Soluciones que <span className="gradient-text">impulsan</span> tu negocio
          </h2>
          <p className="section-subtitle reveal-item">
            Combinamos tecnología avanzada con estrategia para crear sistemas que realmente funcionan.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => {
            const IconComponent = IconMap[service.iconName] || Icons.Briefcase;

            return (
              <div
                key={service.id || i}
                className="service-card reveal-item"
                style={{ '--card-glow': `${service.color}40` }}
                onClick={() => navigate(`/servicio/${service.id}`)}
              >
                <div className="service-card-bg" />

                <div className="service-icon-wrapper">
                  {service.image ? (
                    <div className="service-image-container">
                      <img src={service.image} alt={service.title} className="service-image" />
                    </div>
                  ) : (
                    <div
                      className="service-icon-orb"
                      style={{
                        background: `linear-gradient(135deg, ${service.color}30, ${service.color}10)`,
                        borderColor: service.color,
                      }}
                    >
                      <div className="service-icon" style={{ color: service.color }}>
                        <IconComponent size={48} strokeWidth={1.5} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.description}</p>

                  <div className="service-features">
                    {service.features?.map((feat, j) => (
                      <div key={j} className="service-feature">
                        <span className="service-feature-dot" style={{ background: service.color }} />
                        {feat}
                      </div>
                    ))}
                  </div>

                  <div className="service-price" style={{ color: service.color }}>
                    {service.priceText}
                  </div>

                  <button
                    className="service-cta"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/servicio/${service.id}`);
                    }}
                  >
                    Ver detalle
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}