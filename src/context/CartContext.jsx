import { createContext, useState } from 'react';

export const CartContext = createContext({
  cart: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  getTotalQuantity: () => {},
  getTotal: () => {}
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item, quantity) => {
    if (!isInCart(item.id)) {
      setCart(prev => [...prev, { ...item, quantity }]);
    } else {
      setCart(prev => 
        prev.map(prod => 
          prod.id === item.id 
            ? { ...prod, quantity: prod.quantity + quantity }
            : prod
        )
      );
    }
  };

  const removeItem = (itemId) => {
    setCart(prev => prev.filter(prod => prod.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (itemId) => {
    return cart.some(prod => prod.id === itemId);
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, prod) => total + prod.quantity, 0);
  };

  const getTotal = () => {
    return cart.reduce((total, prod) => total + (prod.price * prod.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      removeItem,
      clearCart,
      getTotalQuantity,
      getTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};