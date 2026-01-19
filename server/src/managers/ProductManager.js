import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.join(__dirname, '../data/products.json');

class ProductManager {
  constructor() {
    this.path = productsPath;
  }

  async getProducts() {
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

  async saveProducts(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
  }

  async getAllProducts() {
    return await this.getProducts();
  }
  async getProductById(id) {
    const products = await this.getProducts();
    const product = products.find(p => p.id === id);
    return product || null;
  }

  async generateId() {
    const products = await this.getProducts();
    if (products.length === 0) {
      return 1;
    }
    const maxId = Math.max(...products.map(p => typeof p.id === 'number' ? p.id : parseInt(p.id) || 0));
    return maxId + 1;
  }

  async addProduct(productData) {
    const { title, description, code, price, status, stock, category, thumbnails } = productData;

    if (!title || !description || !code || price === undefined || stock === undefined || !category) {
      throw new Error('Faltan campos obligatorios');
    }

    const products = await this.getProducts();

    const existingProduct = products.find(p => p.code === code);
    if (existingProduct) {
      throw new Error('El código del producto ya existe');
    }

    const id = await this.generateId();
    const newProduct = {
      id,
      title,
      description,
      code,
      price: Number(price),
      status: status !== undefined ? Boolean(status) : true,
      stock: Number(stock),
      category,
      thumbnails: Array.isArray(thumbnails) ? thumbnails : []
    };

    products.push(newProduct);
    await this.saveProducts(products);

    return newProduct;
  }

  async updateProduct(id, updateData) {
    const products = await this.getProducts();
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    const { id: _, ...dataToUpdate } = updateData;
    products[productIndex] = {
      ...products[productIndex],
      ...dataToUpdate,
      id: products[productIndex].id // Mantener el ID original
    };

    await this.saveProducts(products);
    return products[productIndex];
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    products.splice(productIndex, 1);
    await this.saveProducts(products);
    return true;
  }
}

export default ProductManager;
