import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  /* Persist cart */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  /* Add product to cart */
  /* Add product to cart */
  const addToCart = (product, quantity = 1) => {
    const qty = Number(quantity);
    if (isNaN(qty) || qty < 1) return; // ignore invalid quantities

    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        const newQty = Math.min(existing.quantity + qty, product.stock);
        return prev.map((item) =>
          item._id === product._id ? { ...item, quantity: newQty } : item,
        );
      }

      return [...prev, { ...product, quantity: Math.min(qty, product.stock) }];
    });
  };

  /* Remove product completely */
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  /* Update quantity */
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  /* Clear cart */
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
