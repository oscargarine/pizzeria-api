import { createContext, useContext, useState, useEffect } from 'react';

const PizzaContext = createContext();

export const usePizzas = () => useContext(PizzaContext);

export const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = 'http://localhost:5000/api/pizzas';

  const getPizzas = async () => {
    try {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setPizzas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPizzas();
  }, []);

  return (
    <PizzaContext.Provider value={{ pizzas, loading, error }}>
      {children}
    </PizzaContext.Provider>
  );
};
