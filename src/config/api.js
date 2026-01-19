// Configuración de la API
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8080/api',
  PRODUCTS_ENDPOINT: '/products',
  CARTS_ENDPOINT: '/carts'
};

// Función helper para construir URLs
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
