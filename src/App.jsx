import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import ServiceDetail from './pages/ServiceDetail';
import ProjectDetail from './pages/ProjectDetail';
import AdminPanel from './pages/AdminPanel';

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

export default function App() {
  return (
    <AdminProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollHandler />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/servicio/:id" element={<ServiceDetail />} />
            <Route path="/proyecto/:id" element={<ProjectDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AdminProvider>
  );
}
