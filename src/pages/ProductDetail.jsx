import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import Navbar from '../components/Navbar';
import Cart from '../components/Cart';
import Footer from '../components/Footer';
import { ArrowLeft, CheckCircle2, Star, Settings, Bot, Globe, ShoppingCart } from 'lucide-react';
import './ProductDetail.css';

const categoryIcons = {
  automation: Settings,
  ai: Bot,
  web: Globe,
};

const categoryLabels = {
  automation: 'Automatización',
  ai: 'Inteligencia Artificial',
  web: 'Desarrollo Web',
};

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { products } = useAdmin();
  const [cartOpen, setCartOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <>
        <Navbar onCartOpen={() => setCartOpen(true)} />
        <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        <div className="pd-404">
          <h2 className="pd-404-title">Producto no encontrado</h2>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Volver al inicio
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);
  const IconComponent = categoryIcons[product.category] || Settings;
  const c = product.color || '#a855f7';

  return (
    <div className="pd-page">
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <section className="pd-hero">
        <div className="pd-hero-glow" style={{ background: `radial-gradient(circle, ${c}, transparent 70%)` }} />
        
        <div className="container">
          <button className="pd-back" onClick={() => navigate('/')}>
            <ArrowLeft size={16} />
            Volver
          </button>

          <div className="pd-product-layout" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 'var(--space-16)', alignItems: 'start' }}>
            {/* Left Column: Visual */}
            <div className="pd-product-visual" style={{ position: 'sticky', top: '110px' }}>
              <div className="pd-product-image-container">
                <div className="pd-product-image-bg" style={{ background: `radial-gradient(circle at 50% 50%, ${c}, transparent 70%)` }} />
                {product.imageUrl && (
                  <img src={product.imageUrl} alt={product.name} className="pd-product-image" />
                )}
                <div className="pd-product-icon" style={{ borderColor: c, color: c }}>
                  <IconComponent size={56} strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Right Column: Info */}
            <div className="pd-product-info">
              <span className="pd-category-badge" style={{ color: c, borderColor: `${c}40` }}>
                {categoryLabels[product.category]}
              </span>

              <h1 className="pd-product-title">{product.name}</h1>
              <p className="pd-product-tagline">{product.tagline}</p>

              <div className="pd-price-section">
                <span className="pd-price" style={{ color: c }}>${product.price}</span>
                <span className="pd-price-currency">USD</span>
              </div>

              <p className="pd-description">{product.description}</p>

              <div className="pd-info-grid">
                <div>
                  <div className="pd-info-card-label">Formato</div>
                  <div className="pd-info-card-value">{product.format || 'Descarga Digital'}</div>
                </div>
                <div>
                  <div className="pd-info-card-label">Ideal para</div>
                  <div className="pd-info-card-value">{product.idealFor || 'Negocios y Agencias'}</div>
                </div>
              </div>

              <button className={`pd-add-btn ${added ? 'added' : ''}`} onClick={handleAdd}>
                {added ? (
                  <>
                    <CheckCircle2 size={20} />
                    Agregado al carrito
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Agregar al carrito
                  </>
                )}
              </button>

              {/* Includes */}
              {product.includes && product.includes.length > 0 && (
                <>
                  <div className="pd-section-divider" />
                  <h3 className="pd-section-title">
                    <Settings size={20} style={{ color: c }} />
                    Lo que incluye
                  </h3>
                  <div className="pd-feature-list">
                    {product.includes.map((item, i) => (
                      <div key={i} className="pd-feature-item">
                        <div className="pd-feature-icon" style={{ color: c }}>
                          <CheckCircle2 size={18} />
                        </div>
                        <span className="pd-feature-text">{item}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Benefits */}
              {product.benefits && product.benefits.length > 0 && (
                <>
                  <div className="pd-section-divider" />
                  <h3 className="pd-section-title">
                    <Star size={20} style={{ color: c }} />
                    Beneficios clave
                  </h3>
                  <div className="pd-feature-list">
                    {product.benefits.map((item, i) => (
                      <div key={i} className="pd-feature-item">
                        <div className="pd-feature-icon" style={{ color: c }}>
                          <CheckCircle2 size={18} />
                        </div>
                        <span className="pd-feature-text">{item}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pd-related">
          <div className="container">
            <h2 className="pd-related-title">También te podría interesar</h2>
            <div className="pd-related-grid">
              {relatedProducts.map(rp => {
                const RpIcon = categoryIcons[rp.category] || Globe;
                return (
                  <button
                    key={rp.id}
                    className="pd-related-card"
                    onClick={() => navigate(`/product/${rp.id}`)}
                  >
                    <div className="pd-related-card-img-container">
                      {rp.imageUrl ? (
                        <img src={rp.imageUrl} alt={rp.name} className="pd-related-card-img" />
                      ) : (
                        <div className="pd-related-card-img-empty" style={{ background: `linear-gradient(135deg, ${rp.color}20, var(--bg-secondary))` }}>
                          <RpIcon size={40} style={{ color: rp.color }} />
                        </div>
                      )}
                    </div>
                    <div className="pd-related-card-body">
                      <span className="pd-related-card-badge">{rp.category}</span>
                      <h4 className="pd-related-card-title">{rp.name}</h4>
                      <p className="pd-related-card-desc">{rp.tagline}</p>
                      <div className="pd-related-card-footer">
                        <span className="pd-related-card-price" style={{ color: rp.color }}>${rp.price}</span>
                        <span className="pd-related-card-link">
                          Ver detalles <ArrowLeft size={12} style={{ transform: 'rotate(180deg)' }} />
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}