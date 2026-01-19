import express from 'express';
import CartManager from '../managers/CartManager.js';

const router = express.Router();
const cartManager = new CartManager();

// POST / - Crear nuevo carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json({ status: 'success', payload: newCart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// GET /:cid - Listar productos del carrito
router.get('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cartId = isNaN(cid) ? cid : parseInt(cid);
    
    const cart = await cartManager.getCartById(cartId);
    
    if (!cart) {
      return res.status(404).json({ 
        status: 'error', 
        message: 'Carrito no encontrado' 
      });
    }
    
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// POST /:cid/product/:pid - Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cartId = isNaN(cid) ? cid : parseInt(cid);
    const productId = isNaN(pid) ? pid : parseInt(pid);
    
    const updatedCart = await cartManager.addProductToCart(cartId, productId);
    
    res.json({ status: 'success', payload: updatedCart });
  } catch (error) {
    if (error.message === 'Carrito no encontrado') {
      return res.status(404).json({ status: 'error', message: error.message });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
