import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route 
              path='/' 
              element={<ItemListContainer greeting="¡Bienvenidos a Perrito con chaucha store!" />} 
            />
            
            <Route 
              path='/category/:categoryId' 
              element={<ItemListContainer greeting="Productos" />} 
            />
            
            <Route 
              path='/item/:itemId' 
              element={<ItemDetailContainer />} 
            />
            
            <Route 
              path='/cart' 
              element={<Cart />} 
            />
            
            <Route 
              path='/checkout' 
              element={<Checkout />} 
            />
            
            <Route 
              path='/admin' 
              element={<AdminPanel />} 
            />
            
            <Route 
              path='*' 
              element={
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <h1>404</h1>
                  <p>Algo se rompio y no se que auxilio</p>
                </div>
              } 
            />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;