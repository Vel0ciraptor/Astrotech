import GlassCard from './GlassCard';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Smartphone, Diamond, Sparkles, MousePointer2 } from 'lucide-react';
import './Experience.css';

const features = [
  { icon: <Smartphone />, title: 'Mobile-First', desc: 'Diseñado primero para móvil, perfecto en todos los dispositivos.' },
  { icon: <Diamond />, title: 'Liquid Glass UI', desc: 'Interfaces con efecto glass premium y moderno.' },
  { icon: <Sparkles />, title: 'Animaciones Fluidas', desc: 'Micro-interacciones que mejoran la experiencia.' },
  { icon: <MousePointer2 />, title: 'UX sin Fricción', desc: 'Navegación intuitiva, conversión optimizada.' },
];

export default function Experience() {
  const containerRef = useScrollReveal({ target: '.reveal-item' });

  return (
    <section className="section experience" id="experiencia" ref={containerRef}>
      <div className="section-bg">
        <div className="section-glow" />
        <div className="section-orb" />
      </div>
      <div className="container">
        <div className="experience-content">
          <div className="experience-text">
            <span className="section-label reveal-item">Experiencia</span>
            <h2 className="section-title reveal-item" style={{ textAlign: 'left' }}>
              Diseño que se <span className="gradient-text">siente</span> premium
            </h2>
            <p className="reveal-item text-secondary">
              Cada proyecto que creamos está pensado para impactar visualmente
              y funcionar con la mayor fluidez posible.
            </p>

            <div className="experience-features">
              {features.map((f, i) => (
                <GlassCard key={i} className="experience-feature reveal-item" noHover>
                  <span className="experience-feature-icon text-[var(--accent-primary)] mb-2">{f.icon}</span>
                  <span className="experience-feature-title">{f.title}</span>
                  <span className="experience-feature-desc">{f.desc}</span>
                </GlassCard>
              ))}
            </div>
          </div>

          <div className="experience-visual reveal-item">
            <div className="experience-mockup">
              <div className="experience-mockup-inner">
                <div className="experience-mockup-bar"></div>
                <div className="experience-mockup-blocks">
                  <div className="experience-mockup-block" style={{ width: '100%' }}></div>
                  <div className="experience-mockup-block"></div>
                  <div className="experience-mockup-block"></div>
                  <div className="experience-mockup-block"></div>
                </div>
              </div>
              <div className="experience-mockup-glow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
