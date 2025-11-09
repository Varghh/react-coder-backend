import { collection, addDoc } from 'firebase/firestore';
import { db } from '../src/firebase.js';

const products = [
  {
    name: 'Alimento Premium para Perros',
    price: 15000,
    category: 'alimento',
    img: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400',
    stock: 10,
    description: 'Alimento balanceado premium para perros adultos de todas las razas.'
  },
  {
    name: 'Alimento para Gatos',
    price: 12000,
    category: 'alimento',
    img: 'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=400',
    stock: 15,
    description: 'Alimento nutritivo para gatos con proteínas de alta calidad.'
  },
  {
    name: 'Snacks para Perros',
    price: 3500,
    category: 'alimento',
    img: 'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=400',
    stock: 25,
    description: 'Deliciosos snacks naturales para premiar a tu perro.'
  },
  {
    name: 'Shampoo para Perros',
    price: 4500,
    category: 'higiene',
    img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',
    stock: 20,
    description: 'Shampoo hipoalergénico con fragancia suave y duradera.'
  },
  {
    name: 'Cepillo Dental',
    price: 2800,
    category: 'higiene',
    img: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=400',
    stock: 30,
    description: 'Cepillo dental para mantener la higiene bucal de tu mascota.'
  },
  {
    name: 'Arena para Gatos',
    price: 5500,
    category: 'higiene',
    img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    stock: 18,
    description: 'Arena absorbente con control de olores para gatos.'
  },
  {
    name: 'Pelota de Goma',
    price: 1500,
    category: 'juguetes',
    img: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=400',
    stock: 40,
    description: 'Pelota resistente ideal para jugar y ejercitar a tu perro.'
  },
  {
    name: 'Ratón de Juguete',
    price: 1200,
    category: 'juguetes',
    img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400',
    stock: 35,
    description: 'Ratón de tela con catnip para que tu gato se divierta.'
  },
  {
    name: 'Cuerda para Perros',
    price: 2000,
    category: 'juguetes',
    img: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
    stock: 22,
    description: 'Cuerda resistente para jugar al tira y afloja.'
  }
];

const uploadProducts = async () => {
  try {
    for (const product of products) {
      await addDoc(collection(db, 'products'), product);
      console.log(`Producto ${product.name} subido exitosamente`);
    }
    console.log('¡Todos los productos fueron subidos!');
  } catch (error) {
    console.error('Error al subir productos:', error);
  }
};

uploadProducts();

