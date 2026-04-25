import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(options = {}) {
  const containerRef = useRef(null);

  const {
    target = '.reveal-item',
    from = { opacity: 0, y: 60 },
    to = { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    stagger = 0.15,
    triggerStart = 'top 85%',
  } = options;

  useGSAP(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(target);
    if (elements.length === 0) return;

    gsap.fromTo(elements, from, {
      ...to,
      stagger,
      scrollTrigger: {
        trigger: containerRef.current,
        start: triggerStart,
        toggleActions: 'play none none none',
      },
    });
  }, { scope: containerRef });

  return containerRef;
}
