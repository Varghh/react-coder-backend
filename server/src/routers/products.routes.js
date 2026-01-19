import express from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = express.Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {
  try {
    const products = await productManager.getAllProducts();
    res.json({ status: 'success', payload: products });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const productId = isNaN(pid) ? pid : parseInt(pid);
    
    const product = await productManager.getProductById(productId);
    
    if (!product) {
      return res.status(404).json({ 
        status: 'error', 
        message: 'Producto no encontrado' 
      });
    }
    
    res.json({ status: 'success', payload: product });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await productManager.addProduct(productData);
    
    res.status(201).json({ status: 'success', payload: newProduct });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const productId = isNaN(pid) ? pid : parseInt(pid);
    const updateData = req.body;
    
    const updatedProduct = await productManager.updateProduct(productId, updateData);
    
    res.json({ status: 'success', payload: updatedProduct });
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ status: 'error', message: error.message });
    }
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const productId = isNaN(pid) ? pid : parseInt(pid);
    
    await productManager.deleteProduct(productId);
    
    res.json({ status: 'success', message: 'Producto eliminado correctamente' });
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ status: 'error', message: error.message });
    }
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
