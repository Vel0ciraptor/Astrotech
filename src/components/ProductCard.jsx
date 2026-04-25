import { useState } from 'react';
import { useCart } from '../context/CartContext';
import * as LucideIcons from 'lucide-react';
import './ProductCard.css';

const iconMap = {
  automation: LucideIcons.Settings,
  dashboard: LucideIcons.LayoutDashboard,
  'ai-agent': LucideIcons.Bot,
  web: LucideIcons.Globe,
  pack: LucideIcons.Package,
};

const categoryLabels = {
  automation: 'Automatización',
  ai: 'IA / Bots',
  web: 'Web',
  resources: 'Recursos',
};

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const IconComponent = iconMap[product.icon] || LucideIcons.Box;

  return (
    <div className="product-card reveal-item">
      <div className="product-card-header">
        <div
          className="product-card-header-bg"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${product.color}, transparent 70%)`,
          }}
        />

        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
          />
        ) : null}

        <div
          className="product-card-icon"
          style={{
            background: `linear-gradient(135deg, ${product.color}30, ${product.color}10)`,
            borderColor: product.color,
            color: product.color,
          }}
        >
          <IconComponent size={36} strokeWidth={1.5} />
        </div>
      </div>

      <div className="product-card-body">
        <span className="product-card-category">{categoryLabels[product.category]}</span>
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-tagline">{product.tagline}</p>

        <div className="product-card-footer">
          <div className="product-card-price">
            ${product.price} <span>USD</span>
          </div>
          <button
            className={`product-card-add ${added ? 'added' : ''}`}
            onClick={handleAdd}
          >
            {added ? (
              <>
                <LucideIcons.Check size={16} />
                Agregado
              </>
            ) : (
              <>
                <LucideIcons.Plus size={16} />
                Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}