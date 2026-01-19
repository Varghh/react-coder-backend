import express from 'express';
import cors from 'cors';
import productsRouter from './routers/products.routes.js';
import cartsRouter from './routers/carts.routes.js';

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Productos y Carritos',
    endpoints: {
      products: '/api/products',
      carts: '/api/carts'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ 
    status: 'error', 
    message: 'Ruta no encontrada' 
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
