import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/productsService';
import ItemDetail from './ItemDetail';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);

    getProductById(itemId)
      .then(productData => {
        setProduct(productData);
      })
      .catch(error => {
        console.error('Error al cargar producto:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [itemId]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#b0b0b0' }}>
        <h2>Cargando producto...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#e0e0e0' }}>
        <h2>Producto no encontrado</h2>
        <p>El producto que buscas no existe o fue eliminado.</p>
      </div>
    );
  }

  return (
    <div>
      <ItemDetail {...product} />
    </div>
  );
};

export default ItemDetailContainer;