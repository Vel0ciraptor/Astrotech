import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';

// Eager load Home for better LCP
import Home from './pages/Home';

// Lazy load other pages to reduce initial bundle size
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

// Loading fallback component
function PageLoader() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#0a0f19',
      color: '#a855f7'
    }}>
      <div className="loader">Cargando...</div>
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollHandler />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/servicio/:id" element={<ServiceDetail />} />
              <Route path="/proyecto/:id" element={<ProjectDetail />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </AdminProvider>
  );
}
