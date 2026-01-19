import { useState } from 'react';
import { buildApiUrl } from '../config/api.js';

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    price: '',
    status: true,
    stock: '',
    category: '',
    thumbnails: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Convertir thumbnails de string a array
      const thumbnails = formData.thumbnails
        ? formData.thumbnails.split(',').map(url => url.trim()).filter(url => url)
        : [];

      const productData = {
        title: formData.title,
        description: formData.description,
        code: formData.code,
        price: Number(formData.price),
        status: formData.status,
        stock: Number(formData.stock),
        category: formData.category,
        thumbnails: thumbnails
      };

      const response = await fetch(buildApiUrl('/products'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear el producto');
      }

      setMessage(`✅ Producto creado exitosamente! ID: ${data.payload.id}`);
      
      // Limpiar formulario
      setFormData({
        title: '',
        description: '',
        code: '',
        price: '',
        status: true,
        stock: '',
        category: '',
        thumbnails: ''
      });
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Panel de Administración - Crear Producto</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Título *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Ej: Alimento Premium para Perros"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Descripción *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={styles.textarea}
            placeholder="Descripción del producto"
            rows="3"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Código *</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Ej: ALM001 (debe ser único)"
          />
        </div>

        <div style={styles.row}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Precio *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              style={styles.input}
              placeholder="Ej: 15000"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Stock *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              style={styles.input}
              placeholder="Ej: 50"
            />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Categoría *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="">Selecciona una categoría</option>
            <option value="alimento">Alimento</option>
            <option value="higiene">Higiene</option>
            <option value="juguetes">Juguetes</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
              style={styles.checkbox}
            />
            Producto activo
          </label>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>URLs de Imágenes</label>
          <input
            type="text"
            name="thumbnails"
            value={formData.thumbnails}
            onChange={handleChange}
            style={styles.input}
            placeholder="Separar múltiples URLs con comas"
          />
          <small style={styles.helpText}>
            Ej: https://imagen1.jpg, https://imagen2.jpg
          </small>
        </div>

        {message && (
          <div style={styles.message}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creando...' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#2d2d44',
    borderRadius: '16px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.6)'
  },
  title: {
    color: '#e0e0e0',
    fontSize: '2rem',
    marginBottom: '2rem',
    textAlign: 'center',
    fontWeight: '700'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
  label: {
    color: '#e0e0e0',
    fontWeight: '600',
    fontSize: '1rem'
  },
  input: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #444',
    backgroundColor: '#1e1e2e',
    color: '#e0e0e0',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s'
  },
  textarea: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #444',
    backgroundColor: '#1e1e2e',
    color: '#e0e0e0',
    fontSize: '1rem',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  select: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #444',
    backgroundColor: '#1e1e2e',
    color: '#e0e0e0',
    fontSize: '1rem',
    outline: 'none',
    cursor: 'pointer'
  },
  checkbox: {
    marginRight: '0.5rem',
    cursor: 'pointer'
  },
  helpText: {
    color: '#b0b0b0',
    fontSize: '0.85rem',
    marginTop: '0.25rem'
  },
  button: {
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #4ECDC4 0%, #20BF6B 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    marginTop: '1rem'
  },
  message: {
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#1e1e2e',
    color: '#e0e0e0',
    fontSize: '1rem',
    textAlign: 'center'
  }
};

export default AdminPanel;
