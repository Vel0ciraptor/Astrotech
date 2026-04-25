import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import {
  Plus, Trash2, Edit2, LogOut,
  LayoutDashboard, Briefcase, ShoppingBag,
  FolderKanban, Image as ImageIcon, Save, X,
  Workflow, Globe, Bot
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

/* ── Reusable field components ── */
function Field({ label, hint, children }) {
  return (
    <div className="ap-field">
      <label className="ap-label">
        {label}
        {hint && <span className="ap-label-hint">({hint})</span>}
      </label>
      {children}
    </div>
  );
}

function ImgPreview({ url, label, slot }) {
  return (
    <div className="ap-multi-img-slot">
      <div className="ap-multi-img-preview">
        {url
          ? <img src={url} alt={label} onError={e => { e.target.style.display = 'none'; }} />
          : <><ImageIcon size={20} strokeWidth={1} /><span>{slot}</span></>
        }
      </div>
      <div className="ap-img-slot-label">{label}</div>
    </div>
  );
}

export default function AdminPanel() {
  const {
    services, updateService, addService, deleteService,
    products, updateProduct, addProduct, deleteProduct,
    projects, updateProject, addProject, deleteProject
  } = useAdmin();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(null);

  const set = (key, val) => setFormData(prev => ({ ...prev, [key]: val }));

  /* ── Helpers ── */
  const handleEdit = (item) => {
    setEditingItem(item.id);
    setFormData({ ...item });
  };

  const handleCreate = () => {
    setEditingItem('new');
    if (activeTab === 'services') {
      setFormData({ id: Date.now().toString(), title: '', description: '', iconName: 'Workflow', features: [], color: '#00d4ff', priceText: '', details: '' });
    } else if (activeTab === 'products') {
      setFormData({ id: Date.now().toString(), name: '', tagline: '', category: 'automation', price: 0, description: '', imageUrl: '', icon: 'automation', color: '#00d4ff', includes: [], benefits: [], format: 'Descarga Digital', idealFor: '' });
    } else {
      setFormData({ id: Date.now().toString(), title: '', category: 'web', description: '', result: '', stack: [], color: '#00d4ff', images: ['', '', ''], challenge: '', solution: '' });
    }
  };

  const handleSave = () => {
    // Ensure images array is clean for projects (remove empty strings at end but keep up to 3)
    let data = { ...formData };
    if (activeTab === 'projects' && Array.isArray(data.images)) {
      data.images = data.images.filter(url => url && url.trim() !== '');
    }

    if (activeTab === 'services') {
      if (editingItem === 'new') addService(data);
      else updateService(editingItem, data);
    } else if (activeTab === 'products') {
      if (editingItem === 'new') addProduct(data);
      else updateProduct(editingItem, data);
    } else {
      if (editingItem === 'new') addProject(data);
      else updateProject(editingItem, data);
    }
    setEditingItem(null);
    setFormData(null);
  };

  const handleDelete = (id) => {
    if (confirm('¿Eliminar este elemento permanentemente?')) {
      if (activeTab === 'services') deleteService(id);
      else if (activeTab === 'products') deleteProduct(id);
      else deleteProject(id);
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setEditingItem(null);
    setFormData(null);
  };

  /* ── Shared list items ── */
  const currentList = activeTab === 'services' ? services : activeTab === 'products' ? products : projects;

  /* ── Forms ── */
  const renderServicesForm = () => (
    <>
      <div className="ap-form-card">
        <div className="ap-form-card-title">Información del Servicio</div>
        <div className="ap-form-card-desc">Define cómo aparece el servicio en la web y en su página de detalle.</div>

        <div className="ap-grid-2">
          <Field label="ID de ruta" hint="Ej: webs-rapidas, automatizacion">
            <input className="ap-input" value={formData.id} onChange={e => set('id', e.target.value)} placeholder="automatizacion" />
          </Field>
          <Field label="Título del servicio">
            <input className="ap-input" value={formData.title} onChange={e => set('title', e.target.value)} placeholder="Automatización" />
          </Field>
        </div>

        <Field label="Descripción corta" hint="Aparece en la tarjeta">
          <textarea className="ap-textarea" style={{ minHeight: 80 }} value={formData.description} onChange={e => set('description', e.target.value)} placeholder="Optimización de tareas repetitivas..." />
        </Field>

        <Field label="Detalle completo" hint="Página del servicio">
          <textarea className="ap-textarea" value={formData.details} onChange={e => set('details', e.target.value)} placeholder="Texto largo con más información..." />
        </Field>

        <div className="ap-grid-2">
          <Field label="Precio tentativo">
            <input className="ap-input" value={formData.priceText} onChange={e => set('priceText', e.target.value)} placeholder="Desde $199" />
          </Field>
          <Field label="Color de acento">
            <div className="ap-color-row">
              <input type="color" className="ap-color-input" value={formData.color} onChange={e => set('color', e.target.value)} />
              <input className="ap-input" value={formData.color} onChange={e => set('color', e.target.value)} placeholder="#00d4ff" />
            </div>
          </Field>
        </div>

        <Field label="Características" hint="separadas por coma">
          <input className="ap-input" value={formData.features?.join(', ')} onChange={e => set('features', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} placeholder="Flujos inteligentes, Ahorro de tiempo, Mayor eficiencia" />
        </Field>
      </div>
    </>
  );

  const renderProductsForm = () => (
    <>
      <div className="ap-form-card">
        <div className="ap-form-card-title">Información del Producto</div>
        <div className="ap-form-card-desc">Datos principales, precio y categoría del producto.</div>

        <div className="ap-grid-2">
          <Field label="Nombre del producto">
            <input className="ap-input" value={formData.name} onChange={e => set('name', e.target.value)} placeholder="AutoFlow Business" />
          </Field>
          <Field label="Subtítulo (tagline)">
            <input className="ap-input" value={formData.tagline} onChange={e => set('tagline', e.target.value)} placeholder="Automatización lista para usar" />
          </Field>
        </div>

        <div className="ap-grid-3">
          <Field label="Precio (USD)">
            <input type="number" className="ap-input" value={formData.price} onChange={e => set('price', Number(e.target.value))} placeholder="199" />
          </Field>
          <Field label="Categoría">
            <select className="ap-select" value={formData.category} onChange={e => set('category', e.target.value)}>
              <option value="automation">Automatización</option>
              <option value="ai">Inteligencia Artificial</option>
              <option value="web">Desarrollo Web</option>
            </select>
          </Field>
          <Field label="Color de acento">
            <div className="ap-color-row">
              <input type="color" className="ap-color-input" value={formData.color} onChange={e => set('color', e.target.value)} />
              <input className="ap-input" value={formData.color} onChange={e => set('color', e.target.value)} placeholder="#00d4ff" />
            </div>
          </Field>
        </div>

        <Field label="Descripción">
          <textarea className="ap-textarea" value={formData.description} onChange={e => set('description', e.target.value)} placeholder="Descripción del producto..." />
        </Field>
      </div>

      <div className="ap-form-card">
        <div className="ap-form-card-title">Imagen del Producto</div>
        <div className="ap-form-card-desc">Pega la URL de una imagen. Se mostrará en la tarjeta y en la página del producto.</div>

        <Field label="URL de imagen">
          <div className="ap-img-preview-group">
            <div className="ap-img-preview-thumb" style={{ border: formData.imageUrl ? `2px solid ${formData.color}` : undefined }}>
              {formData.imageUrl
                ? <img src={formData.imageUrl} alt="preview" onError={e => e.target.style.display = 'none'} />
                : <ImageIcon size={20} strokeWidth={1} className="ap-img-preview-thumb placeholder" />
              }
            </div>
            <input
              className="ap-input ap-img-url-input"
              value={formData.imageUrl || ''}
              onChange={e => set('imageUrl', e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>
        </Field>
      </div>

      <div className="ap-form-card">
        <div className="ap-form-card-title">Detalles del Producto</div>

        <Field label="Incluye" hint="separado por coma">
          <textarea className="ap-textarea" style={{ minHeight: 80 }} value={formData.includes?.join('\n')} onChange={e => set('includes', e.target.value.split('\n').filter(Boolean))} placeholder="Un ítem por línea..." />
        </Field>

        <Field label="Beneficios" hint="separado por salto de línea">
          <textarea className="ap-textarea" style={{ minHeight: 80 }} value={formData.benefits?.join('\n')} onChange={e => set('benefits', e.target.value.split('\n').filter(Boolean))} placeholder="Un beneficio por línea..." />
        </Field>

        <div className="ap-grid-2">
          <Field label="Formato">
            <input className="ap-input" value={formData.format || ''} onChange={e => set('format', e.target.value)} placeholder="Descarga digital + guía" />
          </Field>
          <Field label="Ideal para">
            <input className="ap-input" value={formData.idealFor || ''} onChange={e => set('idealFor', e.target.value)} placeholder="Negocios, freelancers, agencias" />
          </Field>
        </div>
      </div>
    </>
  );

  const renderProjectsForm = () => {
    const imgs = formData.images?.length === 3 ? formData.images : ['', '', ''];
    const setImg = (idx, val) => {
      const next = [...imgs];
      next[idx] = val;
      set('images', next);
    };

    return (
      <>
        <div className="ap-form-card">
          <div className="ap-form-card-title">Información del Proyecto</div>

          <Field label="Título">
            <input className="ap-input" value={formData.title} onChange={e => set('title', e.target.value)} placeholder="E-Commerce para Marca Local" />
          </Field>

          <Field label="Descripción breve">
            <textarea className="ap-textarea" style={{ minHeight: 80 }} value={formData.description} onChange={e => set('description', e.target.value)} placeholder="Descripción del proyecto..." />
          </Field>

          <div className="ap-grid-2">
            <Field label="Categoría">
              <select className="ap-select" value={formData.category} onChange={e => set('category', e.target.value)}>
                <option value="web">Desarrollo Web</option>
                <option value="automation">Automatización</option>
                <option value="ai">Inteligencia Artificial</option>
              </select>
            </Field>
            <Field label="Color de acento">
              <div className="ap-color-row">
                <input type="color" className="ap-color-input" value={formData.color} onChange={e => set('color', e.target.value)} />
                <input className="ap-input" value={formData.color} onChange={e => set('color', e.target.value)} placeholder="#00d4ff" />
              </div>
            </Field>
          </div>
        </div>

        <div className="ap-form-card">
          <div className="ap-form-card-title">Galería de Imágenes</div>
          <div className="ap-form-card-desc">Agrega hasta 3 URLs de imágenes. Se mostrarán en el carrusel de la página del proyecto.</div>

          <div className="ap-multi-img-grid">
            {[0, 1, 2].map(idx => (
              <div key={idx} className="ap-multi-img-slot">
                <ImgPreview url={imgs[idx]} label={`Foto ${idx + 1}`} slot={idx === 0 ? 'Imagen principal' : 'Opcional'} />
                <input
                  className="ap-input"
                  value={imgs[idx]}
                  onChange={e => setImg(idx, e.target.value)}
                  placeholder={idx === 0 ? 'URL imagen principal...' : `URL imagen ${idx + 1} (opcional)`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="ap-form-card">
          <div className="ap-form-card-title">Narrativa del Proyecto</div>

          <div className="ap-grid-2">
            <Field label="El Reto">
              <textarea className="ap-textarea" value={formData.challenge || ''} onChange={e => set('challenge', e.target.value)} placeholder="¿Cuál era el problema del cliente?" />
            </Field>
            <Field label="La Solución">
              <textarea className="ap-textarea" value={formData.solution || ''} onChange={e => set('solution', e.target.value)} placeholder="¿Cómo lo resolviste?" />
            </Field>
          </div>

          <Field label="Resultado destacado">
            <input className="ap-input" value={formData.result} onChange={e => set('result', e.target.value)} placeholder="+300% de conversión en 1 mes" />
          </Field>

          <Field label="Stack tecnológico" hint="separado por comas">
            <input className="ap-input" value={formData.stack?.join(', ')} onChange={e => set('stack', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} placeholder="React, Node.js, MongoDB" />
          </Field>
        </div>
      </>
    );
  };

  return (
    <div className="ap-page">
      {/* ── Sidebar ── */}
      <aside className="ap-sidebar">
        <div>
          <div className="ap-sidebar-brand">
            <img src="/logo.png" alt="Astrotech" className="ap-sidebar-logo" />
            <div>
              <div className="ap-sidebar-logo-text">ASTRO<span>TECH</span></div>
            </div>
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', padding: '4px 20px 12px', borderBottom: '1px solid var(--glass-border)' }}>
            Panel de Administración
          </div>
        </div>

        <nav className="ap-nav">
          <button className={`ap-nav-btn ${activeTab === 'dashboard' ? 'active-primary' : ''}`} onClick={() => switchTab('dashboard')}>
            <LayoutDashboard size={16} /> Resumen
          </button>

          <div className="ap-nav-section">Contenido Web</div>

          <button className={`ap-nav-btn ${activeTab === 'services' ? 'active' : ''}`} onClick={() => switchTab('services')}>
            <Briefcase size={16} /> Servicios
          </button>
          <button className={`ap-nav-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => switchTab('projects')}>
            <FolderKanban size={16} /> Portafolio
          </button>
          <button className={`ap-nav-btn ${activeTab === 'products' ? 'active' : ''}`} onClick={() => switchTab('products')}>
            <ShoppingBag size={16} /> Tienda Virtual
          </button>
        </nav>

        <div className="ap-sidebar-footer">
          <button className="ap-nav-btn" onClick={() => navigate('/')}>
            <LogOut size={16} /> Ir a la Web Pública
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="ap-main">
        <div className="ap-main-inner">

          {/* Dashboard */}
          {activeTab === 'dashboard' && !editingItem && (
            <>
              <div style={{ marginBottom: 32 }}>
                <h1 className="ap-page-title">Bienvenido</h1>
                <p className="ap-page-sub">Gestiona los servicios, proyectos y productos de tu web desde aquí.</p>
              </div>
              <div className="ap-stats">
                {[
                  { icon: <Briefcase size={18} />, label: 'Servicios activos', value: services.length },
                  { icon: <FolderKanban size={18} />, label: 'Proyectos en portafolio', value: projects.length },
                  { icon: <ShoppingBag size={18} />, label: 'Productos en tienda', value: products.length },
                ].map(s => (
                  <div key={s.label} className="ap-stat-card">
                    <div className="ap-stat-label">{s.label} {s.icon}</div>
                    <div className="ap-stat-value">{s.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gap: 12 }}>
                {[
                  { tab: 'services', icon: <Briefcase size={16} />, label: 'Gestionar Servicios', sub: 'Edita títulos, descripciones, precios y características' },
                  { tab: 'projects', icon: <FolderKanban size={16} />, label: 'Gestionar Portafolio', sub: 'Agrega proyectos con hasta 3 fotos por URL' },
                  { tab: 'products', icon: <ShoppingBag size={16} />, label: 'Gestionar Tienda', sub: 'Añade o edita productos con imagen por URL' },
                ].map(item => (
                  <button key={item.tab} className="ap-nav-btn" style={{ padding: '16px 20px', borderRadius: 14, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', justifyContent: 'flex-start', gap: 14 }} onClick={() => switchTab(item.tab)}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--glass-bg-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', flexShrink: 0 }}>{item.icon}</div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: 'var(--text-sm)' }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{item.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* List view */}
          {activeTab !== 'dashboard' && !editingItem && (
            <>
              <div className="ap-page-header">
                <div>
                  <h1 className="ap-page-title">
                    {activeTab === 'services' ? 'Servicios' : activeTab === 'products' ? 'Tienda Virtual' : 'Portafolio'}
                  </h1>
                  <p className="ap-page-sub">
                    {activeTab === 'services' ? 'Administra los servicios que ofreces' : activeTab === 'products' ? 'Gestiona productos con imagen y precio' : 'Proyectos publicados con fotos'}
                  </p>
                </div>
                <button className="ap-add-btn" onClick={handleCreate}>
                  <Plus size={16} />
                  Agregar nuevo
                </button>
              </div>

              <div className="ap-table-wrap">
                <table className="ap-table">
                  <thead>
                    <tr>
                      <th>{activeTab === 'products' ? 'Producto' : activeTab === 'services' ? 'Servicio' : 'Proyecto'}</th>
                      {activeTab === 'products' && <th>Precio</th>}
                      {activeTab === 'services' && <th>Precio base</th>}
                      {activeTab === 'projects' && <th>Categoría</th>}
                      <th>Color</th>
                      <th style={{ textAlign: 'right' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentList.length === 0 && (
                      <tr className="ap-table-empty">
                        <td colSpan={4}>No hay elementos. Haz clic en "Agregar nuevo" para comenzar.</td>
                      </tr>
                    )}
                    {currentList.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className="ap-item-cell">
                            <div className="ap-item-thumb">
                              {(item.imageUrl || (item.images && item.images[0]))
                                ? <img src={item.imageUrl || item.images[0]} alt="" onError={e => e.target.style.display = 'none'} />
                                : <ImageIcon size={16} strokeWidth={1.5} style={{ color: 'var(--text-muted)' }} />
                              }
                            </div>
                            <div>
                              <div className="ap-item-name">{item.name || item.title}</div>
                              <div className="ap-item-sub">{item.tagline || item.description?.slice(0, 50) + '...'}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          {activeTab === 'products'
                            ? <span className="ap-price">${item.price} USD</span>
                            : activeTab === 'services'
                            ? <span className="ap-price">{item.priceText}</span>
                            : <span className="ap-badge">{item.category}</span>
                          }
                        </td>
                        <td>
                          <div className="ap-color-cell">
                            <div className="ap-color-dot" style={{ background: item.color }} />
                            <span className="ap-color-hex">{item.color}</span>
                          </div>
                        </td>
                        <td>
                          <div className="ap-row-actions">
                            <button className="ap-icon-btn" onClick={() => handleEdit(item)} title="Editar">
                              <Edit2 size={14} />
                            </button>
                            <button className="ap-icon-btn danger" onClick={() => handleDelete(item.id)} title="Eliminar">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Form view */}
          {editingItem && formData && (
            <>
              <div className="ap-form-header">
                <div>
                  <h1 className="ap-page-title">
                    {editingItem === 'new' ? 'Crear nuevo elemento' : 'Editar elemento'}
                  </h1>
                  <p className="ap-page-sub">Los cambios se guardan al hacer clic en "Guardar".</p>
                </div>
                <div className="ap-form-actions">
                  <button className="ap-cancel-btn" onClick={() => setEditingItem(null)}>
                    <X size={15} /> Cancelar
                  </button>
                  <button className="ap-save-btn" onClick={handleSave}>
                    <Save size={15} /> Guardar
                  </button>
                </div>
              </div>

              {activeTab === 'services' && renderServicesForm()}
              {activeTab === 'products' && renderProductsForm()}
              {activeTab === 'projects' && renderProjectsForm()}

              {/* Sticky bottom save for mobile */}
              <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                <button className="ap-cancel-btn" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setEditingItem(null)}>
                  Cancelar
                </button>
                <button className="ap-save-btn" style={{ flex: 2, justifyContent: 'center' }} onClick={handleSave}>
                  <Save size={15} /> Guardar todos los cambios
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Mobile nav */}
      <div className="ap-mobile-nav">
        {[
          { tab: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Inicio' },
          { tab: 'services', icon: <Briefcase size={20} />, label: 'Servicios' },
          { tab: 'projects', icon: <FolderKanban size={20} />, label: 'Portafolio' },
          { tab: 'products', icon: <ShoppingBag size={20} />, label: 'Tienda' },
        ].map(item => (
          <button key={item.tab} className={`ap-mobile-nav-btn ${activeTab === item.tab ? 'active' : ''}`} onClick={() => switchTab(item.tab)}>
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
