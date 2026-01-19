import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cartsPath = path.join(__dirname, '../data/carts.json');

class CartManager {
  constructor() {
    this.path = cartsPath;
  }

  async getCarts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.writeFile(this.path, JSON.stringify([], null, 2));
        return [];
      }
      throw error;
    }
  }

  async saveCarts(carts) {
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
  }

  async generateId() {
    const carts = await this.getCarts();
    if (carts.length === 0) {
      return 1;
    }
    const maxId = Math.max(...carts.map(c => typeof c.id === 'number' ? c.id : parseInt(c.id) || 0));
    return maxId + 1;
  }

  async createCart() {
    const carts = await this.getCarts();
    const id = await this.generateId();

    const newCart = {
      id,
      products: []
    };

    carts.push(newCart);
    await this.saveCarts(carts);

    return newCart;
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    const cart = carts.find(c => c.id === id);
    return cart || null;
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex(c => c.id === cartId);

    if (cartIndex === -1) {
      throw new Error('Carrito no encontrado');
    }

    const cart = carts[cartIndex];
    const productIndex = cart.products.findIndex(p => p.product === productId);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({
        product: productId,
        quantity: 1
      });
    }

    carts[cartIndex] = cart;
    await this.saveCarts(carts);

    return cart;
  }
}

export default CartManager;
