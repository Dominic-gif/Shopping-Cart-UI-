import { createContext, useState, useEffect, useContext } from "react";
import db from "../data/db.json";

export const ProductContext = createContext();

// Group API categories with the matching local ones
const CATEGORY_ALIASES = {
  groceries: "provisions",
  vehicle: "vehicles",
  motorcycle: "vehicles",
};

// Free public product catalogs — no API keys needed. Each one maps its
// products to the shape the app uses; ids are prefixed so sources never clash.
const SOURCES = [
  {
    // 194 products, 24 categories
    url: "https://dummyjson.com/products?limit=0&select=title,description,price,discountPercentage,rating,stock,brand,category,thumbnail",
    map: (data) =>
      data.products.map((p) => ({
        id: `dj-${p.id}`,
        name: p.title,
        description: p.description,
        price: p.price,
        discountPercentage: p.discountPercentage,
        rating: p.rating,
        stock: p.stock,
        brand: p.brand,
        category: CATEGORY_ALIASES[p.category] ?? p.category,
        image: p.thumbnail,
      })),
  },
  {
    // 20 products: clothing, jewelery, electronics
    url: "https://fakestoreapi.com/products",
    map: (data) =>
      data.map((p) => ({
        id: `fs-${p.id}`,
        name: p.title,
        description: p.description,
        price: p.price,
        rating: p.rating?.rate,
        category: p.category.replace(/'/g, "").replace(/\s+/g, "-"),
        image: p.image,
      })),
  },
];

// Bundled products are always included, so the shop works offline too
const localProducts = db.products.map((p) => ({
  ...p,
  id: `local-${p.id}`,
  category: p.category.toLowerCase(),
  stock: p.quantity,
  image: `/${p.image}`,
}));

const fetchSource = async ({ url, map }) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} failed: ${response.status}`);
  return map(await response.json());
};

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      // One failing API shouldn't hide products from the others
      const results = await Promise.allSettled(SOURCES.map(fetchSource));
      const remote = results.flatMap((r) => {
        if (r.status === "fulfilled") return r.value;
        console.warn("Product source unavailable:", r.reason);
        return [];
      });
      setProducts([...localProducts, ...remote]);
      setError(null);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
