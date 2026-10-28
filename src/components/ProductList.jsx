import { useMemo, useState } from 'react'
import ProductCard from './ProductCard';
import { useProducts } from '../context/ProductContext.jsx'

const SORTS = {
  featured: () => 0,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
  discount: (a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0),
}

const ProductList = () => {

  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sort, setSort] = useState('featured')

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))].sort(),
    [products]
  )

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return products
      .filter((p) => category === 'all' || p.category === category)
      .filter((p) => !q || `${p.name} ${p.brand ?? ''} ${p.description}`.toLowerCase().includes(q))
      .sort(SORTS[sort])
  }, [products, search, category, sort])

  if (loading) return <p className="text-gray-500">Loading...</p>
  if (error) return <div className="text-red-600">❌ {error.message ?? String(error)}</div>

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products or brands..."
          className="flex-1 rounded border border-gray-300 bg-white px-3 py-2"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded border border-gray-300 bg-white px-3 py-2 capitalize">
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c.replace(/-/g, ' ')}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded border border-gray-300 bg-white px-3 py-2">
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Top rated</option>
          <option value="discount">Biggest discount</option>
        </select>
      </div>

      <p className="mb-4 text-sm text-gray-500">{visible.length} of {products.length} products</p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {visible.length === 0 && <p className="text-gray-500">No products match your search.</p>}
    </>
  )
}

export default ProductList
