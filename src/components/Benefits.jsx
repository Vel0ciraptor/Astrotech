import GlassCard from './GlassCard';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Zap, Settings2, LineChart, Gem } from 'lucide-react';
import './Benefits.css';

const benefits = [
  {
    icon: <Zap size={32} className="text-[var(--accent-primary)]" />,
    title: 'Velocidad',
    desc: 'Sitios optimizados que cargan en menos de 2 segundos.',
    stat: '<2s',
  },
  {
    icon: <Settings2 size={32} className="text-[var(--accent-primary)]" />,
    title: 'Automatización',
    desc: 'Procesos que se ejecutan solos, sin intervención manual.',
    stat: '24/7',
  },
  {
    icon: <LineChart size={32} className="text-[var(--accent-primary)]" />,
    title: 'Escalabilidad',
    desc: 'Arquitectura preparada para crecer sin límites.',
    stat: '∞',
  },
  {
    icon: <Gem size={32} className="text-[var(--accent-primary)]" />,
    title: 'Diseño Moderno',
    desc: 'Interfaces premium que destacan y convierten.',
    stat: 'A+',
  },
];

export default function Benefits() {
  const containerRef = useScrollReveal({ target: '.reveal-item' });

  return (
    <section className="section benefits" id="beneficios" ref={containerRef}>
      <div className="section-bg">
        <div className="section-grid" />
        <div className="section-glow" />
      </div>
      <div className="container">
        <div className="section-header">
          <span className="section-label reveal-item">¿Por qué Astrotech?</span>
          <h2 className="section-title reveal-item">
            Nuestro <span className="gradient-text">diferencial</span>
          </h2>
          <p className="section-subtitle reveal-item">
            No solo construimos — optimizamos, automatizamos y escalamos tu presencia digital.
          </p>
        </div>

        <div className="benefits-grid">
          {benefits.map((b, i) => (
            <GlassCard key={i} className="benefit-card reveal-item">
              <div className="benefit-icon">{b.icon}</div>
              <h3 className="benefit-title">{b.title}</h3>
              <p className="benefit-desc">{b.desc}</p>
              <div className="benefit-stat">{b.stat}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
