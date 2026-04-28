import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icons } from './Icons';
import './Team.css';

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: 'Ing. Rodrigo R',
    role: 'Project Manager',
    icon: <Icons.Users size={32} />,
    color: '#3b82f6', // Blue
  },
  {
    name: 'Ing. Oscar Z',
    role: 'Developer',
    icon: <Icons.Code2 size={32} />,
    color: '#a855f7', // Purple
  },
  {
    name: 'Ing. Luis L',
    role: 'Developer',
    icon: <Icons.Cpu size={32} />,
    color: '#ec4899', // Pink
  }
];

export default function Team() {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo('.team-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section className="section team" id="equipo" ref={containerRef}>
      <div className="section-bg">
        <div className="team-glow team-glow-1"></div>
        <div className="team-glow team-glow-2"></div>
        <div className="team-glow team-glow-3"></div>
      </div>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Creadores</span>
          <h2 className="section-title">
            Conoce a nuestro <span className="gradient-text">equipo</span>
          </h2>
          <p className="section-subtitle">
            Los ingenieros detrás de las soluciones tecnológicas que transforman tu negocio.
          </p>
        </div>

        <div className="team-grid">
          {team.map((member, i) => (
            <div key={i} className="team-card">
              <div
                className="team-card-bg"
                style={{
                  background: `radial-gradient(circle at 50% -20%, ${member.color}30, transparent 70%)`
                }}
              />
              <div className="team-card-content">
                <div className="team-avatar-ring" style={{ borderColor: `${member.color}40` }}>
                  <div className="team-avatar" style={{ background: `${member.color}15`, color: member.color, borderColor: `${member.color}30` }}>
                    {member.icon}
                  </div>
                </div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role" style={{ color: member.color }}>{member.role}</p>
                <p className="team-desc">Especialista en desarrollo e innovación tecnológica.</p>
                <div className="team-social">
                  <button className="team-social-btn" aria-label="Perfil">
                    <Icons.Globe size={18} />
                  </button>
                  <button className="team-social-btn" aria-label="Email">
                    <Icons.Mail size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
