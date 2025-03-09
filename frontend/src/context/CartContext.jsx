import { createContext, useState, useContext } from "react";

// Crear el contexto del carrito
const CartContext = createContext();

// Proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Creamos una copia del carrito actual
      let newCart = [...prevCart];
  
      // Verificamos si el producto ya existe en el carrito
      const existingProductIndex = newCart.findIndex((item) => item.id === product.id);
  
      if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, aumentamos su cantidad
        newCart[existingProductIndex] = {
          ...newCart[existingProductIndex],
          count: newCart[existingProductIndex].count + 1,
        };
      } else {
        // Si el producto NO está en el carrito, lo agregamos como un nuevo ítem
        newCart.push({ ...product, count: 1 });
      }
  
      console.log("Carrito actualizado:", newCart); // Verificar si el carrito se actualiza correctamente
  
      return newCart; // Retornamos el carrito actualizado
    });
  };
  
  
  

  // Aumentar cantidad
  const increaseQtty = (id) => {
    setCart((prevCart) => 
      prevCart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  // Disminuir cantidad o eliminar si llega a 0
  const decreaseQtty = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
        .filter((item) => item.count > 0) // Elimina los que llegan a 0
    );
  };

  // Eliminar producto del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calcular total
  const calcTotal = cart.reduce((total, product) => total + product.price * product.count, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQtty, decreaseQtty, removeFromCart, calcTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCart = () => useContext(CartContext);
