import  { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage on initial render
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemoveFromCart = (itemToRemove) => {
    console.log("Item to remove:", itemToRemove);
    console.log("Current cart items:", cartItems);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemToRemove.id));
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, handleRemoveFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
