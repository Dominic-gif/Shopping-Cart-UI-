import ProductCard from './ProductCard';
import { useProducts } from '../context/ProductContext.jsx'

const ProductList = () => {

  const { products, loading, error } = useProducts();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <div className="text-red-600">❌ {error}</div>}
      {!loading && !error && products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductList
