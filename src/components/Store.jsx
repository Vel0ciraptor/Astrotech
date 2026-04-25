import { useState } from 'react';
import ProductCard from './ProductCard';
import { categories } from '../data/products';
import { useAdmin } from '../context/AdminContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Store.css';

export default function Store() {
  const { products } = useAdmin();
  const [activeCategory, setActiveCategory] = useState('all');
  const containerRef = useScrollReveal({ target: '.reveal-item' });

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <section className="section store" id="tienda" ref={containerRef}>
      <div className="section-bg">
        <div className="section-glow" />
      </div>
      <div className="container">
        <div className="section-header">
          <span className="section-label reveal-item">Tienda</span>
          <h2 className="section-title reveal-item">
            Productos <span className="gradient-text">digitales</span>
          </h2>
          <p className="section-subtitle reveal-item">
            Soluciones listas para implementar. Automatizaciones, agentes IA y herramientas
            que escalan tu negocio.
          </p>
        </div>

        <div className="store-filters reveal-item">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`store-filter ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="store-grid">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
