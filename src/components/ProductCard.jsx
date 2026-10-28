import { FaStar } from 'react-icons/fa'
import { useCart } from '../context/CartContext.jsx'


const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const discount = Math.round(product.discountPercentage ?? 0);
    const originalPrice = discount > 0 ? product.price / (1 - discount / 100) : null;
    const outOfStock = product.stock === 0;

    return (
        <div className="relative rounded-lg bg-white p-4 shadow flex flex-col">
            {discount > 0 && (
              <span className="absolute top-3 left-3 rounded bg-orange-500 px-2 py-1 text-xs font-bold text-white">
                -{discount}%
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="mb-4 h-48 w-full object-contain"
            />
            <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-wide text-gray-400">
              <span>{product.brand ?? 'Generic'}</span>
              <span className="rounded bg-gray-100 px-2 py-0.5 normal-case text-gray-600">{product.category}</span>
            </div>
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="mb-3 line-clamp-2 text-sm text-gray-500">{product.description}</p>

            <div className="mt-2 flex items-baseline gap-2">
              <p className="font-bold text-blue-600">${product.price.toFixed(2)}</p>
              {originalPrice && (
                <p className="text-sm text-gray-400 line-through">${originalPrice.toFixed(2)}</p>
              )}
            </div>

            <div className="mt-1 mb-3 flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-yellow-500">
                <FaStar /> {product.rating?.toFixed(1)}
              </span>
              {product.stock != null && (
                <span className={product.stock < 10 ? 'text-red-500' : 'text-green-600'}>
                  {outOfStock ? 'Out of stock' : product.stock < 10 ? `Only ${product.stock} left` : 'In stock'}
                </span>
              )}
            </div>

            <button
              onClick={() => addToCart(product)}
              disabled={outOfStock}
              className="mt-auto bg-blue-600 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Add to Cart
            </button>
        </div>
     );
}

export default ProductCard;
