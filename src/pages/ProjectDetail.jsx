import { useParams, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Navbar from '../components/Navbar';
import Cart from '../components/Cart';
import Footer from '../components/Footer';
import ImageModal from '../components/ImageModal';
import { Icons } from '../components/Icons';
const ArrowLeft = Icons.ArrowLeft;
const Globe = Icons.Globe;
const Cpu = Icons.Cpu;
const Bot = Icons.Bot;
const CheckCircle2 = Icons.Check;
const ChevronLeft = Icons.ArrowLeft;
const ChevronRight = (props) => <div style={{transform: 'rotate(180deg)', display: 'inline-flex', alignItems: 'center'}}><Icons.ArrowLeft {...props} /></div>;
const TrendingUp = Icons.LineChart;
const MessageCircle = Icons.Mail;
const ImageIcon = Icons.Gem;
const Maximize2 = Icons.Plus;
import './ProjectDetail.css';

function ImageCarousel({ images, color, onImageClick }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);

  if (!images || images.length === 0) {
    return (
      <div className="pd-carousel-wrap">
        <div className="pd-carousel-empty">
          <ImageIcon size={40} strokeWidth={1} />
          <span>Sin imágenes disponibles</span>
        </div>
      </div>
    );
  }

  const prev = () => setCurrent(i => Math.max(0, i - 1));
  const next = () => setCurrent(i => Math.min(images.length - 1, i + 1));

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) next();
    if (diff < -50) prev();
    touchStartX.current = null;
  };

  return (
    <>
      <div className="pd-carousel-wrap" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="pd-carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {images.map((src, i) => (
            <div key={i} className="pd-carousel-slide" onClick={() => onImageClick(src)} style={{ cursor: 'zoom-in' }}>
              <img src={src} alt={`Vista ${i + 1}`} />
              <div className="pd-carousel-zoom-hint">
                <Maximize2 size={20} />
              </div>
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button className="pd-carousel-arrow pd-carousel-arrow-prev" onClick={(e) => { e.stopPropagation(); prev(); }} disabled={current === 0}>
              <ChevronLeft size={20} />
            </button>
            <button className="pd-carousel-arrow pd-carousel-arrow-next" onClick={(e) => { e.stopPropagation(); next(); }} disabled={current === images.length - 1}>
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className="pd-carousel-counter">{current + 1} / {images.length}</div>
        )}

        {images.length > 1 && (
          <div className="pd-carousel-dots">
            {images.map((_, i) => (
              <button key={i} className={`pd-carousel-dot ${i === current ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setCurrent(i); }} />
            ))}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="pd-thumbnails">
          {images.map((src, i) => (
            <button key={i} className={`pd-thumb ${i === current ? 'active' : ''}`} style={{ borderColor: i === current ? color : 'transparent' }} onClick={() => setCurrent(i)}>
              <img src={src} alt={`Miniatura ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useAdmin();
  const [cartOpen, setCartOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState('');
  const containerRef = useRef();

  const project = projects.find(p => p.id.toString() === id);
  const otherProjects = projects.filter(p => p.id.toString() !== id).slice(0, 3);

  // Normalize images
  let images = [];
  if (project) {
    if (Array.isArray(project.images)) {
      images = project.images;
    } else if (project.image) {
      images = [project.image];
    }
    // Ensure all paths start with / if they don't have http
    images = images.map(img => (img.startsWith('/') || img.startsWith('http')) ? img : `/assets/${img}.webp`);
  }

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

    tl.fromTo('.pd-hero-glow', { opacity: 0, scale: 0.8 }, { opacity: 0.15, scale: 1, duration: 2 })
      .fromTo('.pd-info-col > *',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, stagger: 0.1 },
        0.3
      )
      .fromTo('.pd-visual-col',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0 },
        0.5
      );
  }, { scope: containerRef });

  const getCategoryIcon = (cat) => {
    if (cat === 'web') return <Globe size={13} />;
    if (cat === 'automation') return <Cpu size={13} />;
    if (cat === 'ai') return <Bot size={13} />;
    return null;
  };

  const getCategoryName = (cat) => {
    if (cat === 'web') return 'Desarrollo Web';
    if (cat === 'automation') return 'Automatización';
    if (cat === 'ai') return 'Inteligencia Artificial';
    return cat;
  };

  if (!project) {
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
          <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Proyecto no encontrado</h2>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Volver al inicio</button>
        </div>
        <Footer />
      </>
    );
  }

  const c = project.color || '#a855f7';

  const handleWhatsApp = () => {
    const msg = `¡Hola! Vi el proyecto "${project.title}" y me gustaría algo similar.`;
    window.open(`https://wa.me/59176382164?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const openLightbox = (src) => {
    setSelectedImg(src);
    setModalOpen(true);
  };

  return (
    <div className="pd-page" ref={containerRef}>
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <ImageModal src={selectedImg} isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <section className="pd-main-section">
        <div className="pd-hero-glow" style={{ background: `radial-gradient(ellipse, ${c}, transparent 70%)` }} />

        <div className="container">
          <button className="pd-back" onClick={() => navigate('/')}>
            <ArrowLeft size={16} /> Volver
          </button>

          <div className="pd-split-layout">
            {/* Left Column: Info */}
            <div className="pd-info-col">
              <div className="pd-category-badge" style={{ color: c, borderColor: `${c}40`, background: `${c}10` }}>
                {getCategoryIcon(project.category)}
                {getCategoryName(project.category)}
              </div>

              <h1 className="pd-title">{project.title}</h1>
              <p className="pd-description">{project.description}</p>

              <div className="pd-info-extras">
                <div className="pd-result-chip" style={{ color: c, borderColor: `${c}40`, background: `${c}10` }}>
                  <TrendingUp size={16} />
                  {project.result}
                </div>

                <button className="pd-cta-btn" style={{ background: c, color: '#0a0f19' }} onClick={handleWhatsApp}>
                  <MessageCircle size={16} />
                  ¿Hablamos?
                </button>
              </div>

              <div className="pd-divider" />

              <div className="pd-details-compact">
                <div className="pd-compact-section">
                  <div className="pd-section-tag" style={{ background: `${c}15`, color: c }}>El reto</div>
                  <p className="pd-section-body-compact">{project.challenge}</p>
                </div>
                <div className="pd-compact-section">
                  <div className="pd-section-tag" style={{ background: `${c}15`, color: c }}>La solución</div>
                  <p className="pd-section-body-compact">{project.solution}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Visuals */}
            <div className="pd-visual-col">
              <ImageCarousel images={images} color={c} onImageClick={openLightbox} />

              {project.stack && project.stack.length > 0 && (
                <div className="pd-stack-container">
                  <div className="pd-sidebar-label">Tecnologías</div>
                  <div className="pd-stack-chips">
                    {project.stack.map((tech, i) => (
                      <span key={i} className="pd-stack-chip" style={{ color: c, borderColor: `${c}40`, background: `${c}10` }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {otherProjects.length > 0 && (
        <section className="pd-others">
          <div className="container">
            <div className="pd-others-label">Más proyectos</div>
            <div className="pd-others-grid">
              {otherProjects.map(p => (
                <button key={p.id} className="pd-other-card" onClick={() => navigate(`/proyecto/${p.id}`)}>
                  <div className="pd-other-thumb">
                    {p.images && p.images.length > 0 ? (
                      <img src={p.images[0]} alt={p.title} />
                    ) : (
                      <div className="pd-other-thumb-empty" style={{ color: p.color }}>
                        {getCategoryIcon(p.category)}
                      </div>
                    )}
                  </div>
                  <div className="pd-other-info">
                    <div>
                      <div className="pd-other-title">{p.title}</div>
                      <div className="pd-other-cat">{getCategoryName(p.category)}</div>
                    </div>
                    <ChevronRight size={16} className="pd-other-arrow" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
