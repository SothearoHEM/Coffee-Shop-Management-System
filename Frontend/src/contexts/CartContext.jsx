import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  // ADD TO CART
  const addToCart = (product) => {

    setCart(prev => {

      const exist = prev.find(item => item.id === product.id);

      if (exist) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        { ...product, quantity: 1 }
      ];
    });
  };

  // INCREASE
  const increaseQty = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // DECREASE
  const decreaseQty = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // REMOVE ITEM
  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // CLEAR CART
  const clearCart = () => {
    setCart([]);
  };

  // TOTAL
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.10;
  const total = subtotal + tax;

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      increaseQty,
      decreaseQty,
      removeItem,
      clearCart,
      subtotal,
      tax,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
};
