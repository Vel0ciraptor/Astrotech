import { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';
import { projects as initialProjects } from '../data/projects';

const DATA_VERSION = 'v5'; // bump this to reset localStorage on breaking changes

const AdminContext = createContext();

const initialServices = [
  {
    id: 'automatizacion',
    title: 'Automatización',
    description: 'Optimización de tareas repetitivas mediante flujos de trabajo inteligentes que ahorran tiempo y aumentan la eficiencia.',
    iconName: 'Workflow',
    image: '/assets/Automatizaciones N8n.webp',
    features: ['Flujos inteligentes', 'Ahorro de tiempo', 'Mayor eficiencia'],
    color: '#a855f7',
    priceText: 'Desde $199',
    details: 'Implementamos flujos en herramientas como n8n y Make para automatizar todos tus procesos de negocio sin intervención humana continua.'
  },
  {
    id: 'webs-rapidas',
    title: 'Webs Rápidas',
    description: 'Sitios web y aplicaciones optimizados para velocidad, escalabilidad y conversión, diseñados para destacar.',
    iconName: 'LayoutDashboard',
    image: '/assets/Servicio Sitios Web.webp',
    features: ['Velocidad de carga', 'Diseño responsive', 'SEO optimizado'],
    color: '#3b82f6',
    priceText: 'Desde $499',
    details: 'Creamos landing pages y plataformas web utilizando las últimas tecnologías para asegurar que tus visitantes tengan la mejor experiencia y se conviertan en clientes.'
  },
  {
    id: 'agentes-ia',
    title: 'Agentes IA',
    description: 'Implementación de soluciones impulsadas por IA para automatizar atención al cliente, procesos y toma de decisiones.',
    iconName: 'Bot',
    image: '/assets/CHATBOT.webp',
    features: ['Soporte 24/7', 'Análisis de datos', 'IA conversacional'],
    color: '#8b5cf6',
    priceText: 'Desde $399',
    details: 'Desarrollamos bots inteligentes que pueden responder dudas frecuentes, reservar citas y guiar ventas, conectados directamente a tu WhatsApp o sitio web.'
  },
];

export function AdminProvider({ children }) {
  // Bust stale cache when DATA_VERSION changes
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('admin_data_version') !== DATA_VERSION) {
      localStorage.removeItem('admin_services');
      localStorage.removeItem('admin_products');
      localStorage.removeItem('admin_projects');
      localStorage.setItem('admin_data_version', DATA_VERSION);
    }
  }

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('admin_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('admin_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('admin_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('admin_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('admin_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('admin_projects', JSON.stringify(projects));
  }, [projects]);

  // Actions
  const updateService = (id, newService) => {
    setServices(services.map(s => s.id === id ? newService : s));
  };
  const addService = (newService) => setServices([...services, newService]);
  const deleteService = (id) => setServices(services.filter(s => s.id !== id));

  const updateProduct = (id, newProduct) => {
    setProducts(products.map(p => p.id === id ? newProduct : p));
  };
  const addProduct = (newProduct) => setProducts([...products, newProduct]);
  const deleteProduct = (id) => setProducts(products.filter(p => p.id !== id));

  const updateProject = (id, newProject) => {
    setProjects(projects.map(p => p.id === id ? newProject : p));
  };
  const addProject = (newProject) => setProjects([...projects, newProject]);
  const deleteProject = (id) => setProjects(projects.filter(p => p.id !== id));

  return (
    <AdminContext.Provider value={{
      services, updateService, addService, deleteService,
      products, updateProduct, addProduct, deleteProduct,
      projects, updateProject, addProject, deleteProject
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
