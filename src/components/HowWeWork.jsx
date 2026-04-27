import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket } from 'lucide-react';
import './HowWeWork.css';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: 'Análisis',
    desc: 'Evaluamos tu negocio y definimos la estrategia óptima.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
    ),
  },
  {
    title: 'Diseño',
    desc: 'Creamos interfaces premium con UX optimizado.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>
      </svg>
    ),
  },
  {
    title: 'Desarrollo',
    desc: 'Construimos con tecnología moderna y escalable.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    title: 'Automatización',
    desc: 'Implementamos flujos que trabajan por ti 24/7.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
];

export default function HowWeWork() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current || !lineRef.current) return;

    const isMobile = window.innerWidth < 768;

    // Animate the progress line
    gsap.to(lineRef.current, {
      [isMobile ? 'height' : 'width']: '100%',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 50%',
        scrub: 1,
      },
    });

    // Animate steps
    const stepEls = sectionRef.current.querySelectorAll('.howwework-step');
    stepEls.forEach((step, i) => {
      gsap.fromTo(step,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.1,
        }
      );

      // Add active class on scroll
      ScrollTrigger.create({
        trigger: step,
        start: 'top 60%',
        onEnter: () => step.classList.add('active'),
      });
    });
  }, { scope: sectionRef });

  return (
    <section className="section howwework" id="como-trabajamos" ref={sectionRef}>
      <div className="section-bg">
        <div className="section-glow" />
        <div className="section-scan" />
      </div>
      <div className="container">
        <div className="section-header">
          <div className="section-label-wrapper">
            <span className="section-label">Proceso</span>
          </div>
          <h2 className="section-title">
            Cómo <span className="gradient-text">trabajamos</span>
          </h2>
          <p className="section-subtitle">
            Un proceso claro y eficiente para llevar tu proyecto del concepto a la realidad.
          </p>
        </div>

        <div className="howwework-content">
          <div className="howwework-line">
            <div className="howwework-line-fill" ref={lineRef}>
              <div className="howwework-line-dots">
                <div className="line-dot dot-1"></div>
                <div className="line-dot dot-2"></div>
                <div className="line-dot dot-3"></div>
              </div>
            </div>
          </div>

          <div className="howwework-steps">
            {steps.map((step, i) => (
              <div key={i} className="howwework-step">
                <div className="howwework-step-visual">
                  <div className="howwework-step-number">
                    {step.icon}
                    <span className="howwework-step-count">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                </div>
                <div className="howwework-step-card">
                  <h3 className="howwework-step-title">{step.title}</h3>
                  <p className="howwework-step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="howwework-footer">
          <div className="howwework-footer-pill">
            <Rocket className="footer-pill-icon" size={20} />
            <p>Transparencia, comunicación y resultados en cada paso del camino.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
