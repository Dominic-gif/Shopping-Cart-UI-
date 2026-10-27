import React, { createContext, useState, useEffect, useContext } from "react";
import db from "../data/db.json";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from an API or define them here
    const fetchProducts = async () => {
      // Example fetch call
      try {
        // json-server only runs locally; production builds use the bundled data
        if (!import.meta.env.DEV) {
          setProducts(db.products);
          setLoading(false);
          return;
        }
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export function useProducts() {
  return useContext(ProductContext);
}
