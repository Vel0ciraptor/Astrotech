import { useRef, useMemo, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);
  const blobRef = useRef(null);
  const floatsRef = useRef([]);
  const [loadVideo, setLoadVideo] = useState(false);

  // Delay video loading to improve initial performance (LCP/FCP)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadVideo(true);
    }, 3500); // 3.5s delay to ensure it's the last thing
    return () => clearTimeout(timer);
  }, []);

  // Generate particles
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${6 + Math.random() * 10}s`,
      delay: `${Math.random() * 5}s`,
      size: `${1 + Math.random() * 2}px`,
    }));
  }, []);

  useGSAP(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.hero-badge', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo('.hero-title', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
      .fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .fromTo('.hero-tags', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .fromTo('.hero-ctas', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')
      .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.1');

    // Blob continuous morph
    if (blobRef.current) {
      gsap.to(blobRef.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: 'none',
      });
    }

    // Float glass elements
    floatsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        y: `${15 + i * 5}`,
        x: `${5 + i * 3}`,
        rotation: 5 + i * 2,
        duration: 4 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, { scope: heroRef });

  // Mouse parallax on desktop
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (clientX - centerX) / centerX;
    const moveY = (clientY - centerY) / centerY;

    floatsRef.current.forEach((el, i) => {
      if (!el) return;
      const factor = (i + 1) * 12;
      gsap.to(el, {
        x: moveX * factor,
        y: moveY * factor,
        duration: 0.8,
        ease: 'power2.out',
      });
    });
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="inicio" ref={heroRef} onMouseMove={handleMouseMove}>
      {/* Background effects */}
      <div className="hero-bg">
        <div className="hero-grid-bg"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
      </div>

      {/* Video background - Delayed load to prioritize critical content */}
      <div className="hero-video-container">
        {loadVideo && (
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/Liquid_glass_background_202604222022.webp"
          >
            <source src="/assets/Bubble_changes_shapes_202604222043.webm" type="video/webm" />
          </video>
        )}
      </div>

      {/* Particles */}
      <div className="hero-particles">
        {particles.map(p => (
          <div
            key={p.id}
            className="hero-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Blob */}
      <div className="hero-blob" ref={blobRef}>
        <svg viewBox="0 0 600 600">
          <defs>
            <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.6" />
              <stop offset="50%" stopColor="var(--accent-secondary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--accent-tertiary)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            fill="url(#blobGrad)"
            d="M420.5,302.5Q405,405,302.5,437Q200,469,140,384.5Q80,300,140,215.5Q200,131,302.5,118Q405,105,427,202.5Q449,300,420.5,302.5Z"
          />
        </svg>
      </div>

      {/* Floating glass shapes */}
      <div className="hero-float hero-float-1" ref={el => floatsRef.current[0] = el}></div>
      <div className="hero-float hero-float-2" ref={el => floatsRef.current[1] = el}></div>
      <div className="hero-float hero-float-3" ref={el => floatsRef.current[2] = el}></div>

      {/* Content */}
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Digital Systems · Automation · AI
          </div>

          <h1 className="hero-title">
            Construimos sistemas digitales{' '}
            <span className="gradient-text">rápidos, automatizados</span>{' '}
            y escalables
          </h1>

          <p className="hero-subtitle">
            Transformamos negocios con tecnología de vanguardia. Webs de alto rendimiento,
            automatización inteligente y agentes de IA que trabajan por ti.
          </p>

          <div className="hero-tags">
            <span className="hero-tag">
              <span className="hero-tag-icon"></span> Webs
            </span>
            <span className="hero-tag">
              <span className="hero-tag-icon"></span> Automatización
            </span>
            <span className="hero-tag">
              <span className="hero-tag-icon"></span> IA
            </span>
          </div>

          <div className="hero-ctas">
            <button className="btn btn-primary btn-lg" onClick={() => scrollTo('servicios')}>
              Ver servicios
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => scrollTo('tienda')}>
              Ir a tienda
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <span>SCROLL</span>
        <div className="hero-scroll-line"></div>
      </div>
    </section>
  );
}
