import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from './GlassCard';
import { projectCategories } from '../data/projects';
import { useAdmin } from '../context/AdminContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Icons } from './Icons';
import './Projects.css';

export default function Projects() {
  const { projects } = useAdmin();
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();
  const containerRef = useScrollReveal({ target: '.reveal-item' });

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const getCategoryIcon = (cat) => {
    if (cat === 'web') return <span className="mr-1 inline-block"><Icons.Globe size={14} /></span>;
    if (cat === 'automation') return <span className="mr-1 inline-block"><Icons.Cpu size={14} /></span>;
    if (cat === 'ai') return <span className="mr-1 inline-block"><Icons.Bot size={14} /></span>;
    return null;
  };

  const getCategoryName = (cat) => {
    if (cat === 'web') return 'Web';
    if (cat === 'automation') return 'Automatización';
    if (cat === 'ai') return 'IA';
    return cat;
  }

  return (
    <section className="section projects" id="proyectos" ref={containerRef}>
      <div className="section-bg">
        <div className="section-grid" />
        <div className="section-glow" />
        <div className="section-orb" />
      </div>
      <div className="container">
        <div className="section-header">
          <span className="section-label reveal-item">Portafolio</span>
          <h2 className="section-title reveal-item">
            Proyectos que <span className="gradient-text">hablan</span> por nosotros
          </h2>
          <p className="section-subtitle reveal-item">
            Resultados reales, implementaciones concretas. Cada proyecto es una solución diseñada para impactar.
          </p>
        </div>

        <div className="projects-filters reveal-item">
          {projectCategories.map(cat => (
            <button
              key={cat.id}
              className={`projects-filter ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((project) => (
            <GlassCard 
              key={project.id} 
              accent 
              color={project.color} 
              className="project-card reveal-item"
              onClick={() => navigate(`/proyecto/${project.id}`)}
            >
              <div
                className="project-card-bg"
                style={{
                  background: project.images && project.images.length > 0 
                    ? `url(${project.images[0]}) center/cover no-repeat`
                    : `radial-gradient(circle at 30% 30%, ${project.color}40, transparent 60%)`,
                }}
              >
                {project.images && project.images.length > 0 && (
                  <div 
                    className="project-card-glow" 
                    style={{ background: `radial-gradient(circle at 30% 30%, ${project.color}60, transparent 70%)` }} 
                  />
                )}
              </div>
              <div className="project-card-overlay"></div>
              <div className="project-card-content">
                <span className="project-card-category" style={{ color: project.color, borderColor: `${project.color}30` }}>
                  {getCategoryIcon(project.category)} {getCategoryName(project.category)}
                </span>
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.description}</p>
                <div className="project-card-stack">
                  {project.stack?.map((tech, i) => (
                    <span key={i} className="project-stack-badge">{tech}</span>
                  ))}
                </div>
                <div className="project-card-result" style={{ color: project.color }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                  {project.result}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
