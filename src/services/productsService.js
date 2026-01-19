import { buildApiUrl } from '../config/api.js';

const API_URL = buildApiUrl('');

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    const products = data.payload || [];
    return products.map(product => ({
      id: product.id,
      name: product.title || product.name,
      price: product.price,
      category: product.category,
      img: product.thumbnails && product.thumbnails.length > 0 
        ? product.thumbnails[0] 
        : product.img || '',
      stock: product.stock,
      description: product.description
    }));
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await fetch(`${API_URL}/products`);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    const products = data.payload || [];
    
    const filteredProducts = products.filter(product => 
      product.category === categoryId
    );
    return filteredProducts.map(product => ({
      id: product.id,
      name: product.title || product.name,
      price: product.price,
      category: product.category,
      img: product.thumbnails && product.thumbnails.length > 0 
        ? product.thumbnails[0] 
        : product.img || '',
      stock: product.stock,
      description: product.description
    }));
  } catch (error) {
    console.error('Error al obtener productos por categoría:', error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    const product = data.payload;
    
    if (!product) {
      return null;
    }
    
    return {
      id: product.id,
      name: product.title || product.name,
      price: product.price,
      category: product.category,
      img: product.thumbnails && product.thumbnails.length > 0 
        ? product.thumbnails[0] 
        : product.img || '',
      stock: product.stock,
      description: product.description
    };
  } catch (error) {
    console.error('Error al obtener producto:', error);
    throw error;
  }
};

