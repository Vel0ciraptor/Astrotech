import { useEffect } from 'react';
import { Icons } from './Icons';
import './ImageModal.css';

export default function ImageModal({ src, isOpen, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="im-overlay" onClick={onClose}>
      <div className="im-container" onClick={(e) => e.stopPropagation()}>
        <button className="im-close" onClick={onClose} aria-label="Cerrar">
          <Icons.X size={24} />
        </button>
        <div className="im-content">
          <img src={src} alt="Vista ampliada" className="im-image" />
        </div>
        <div className="im-hint">
          <Icons.Plus size={14} /> Haz clic fuera para cerrar
        </div>
      </div>
    </div>
  );
}
