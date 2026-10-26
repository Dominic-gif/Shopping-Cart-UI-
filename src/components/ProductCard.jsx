import { FaStar } from 'react-icons/fa'
import { useCart } from '../context/CartContext.jsx'


const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="rounded-lg bg-white p-4 shadow flex flex-col">
            <img
              src={`/${product.image}`}
              alt={product.name}
              className="mb-4 h-48 w-full object-contain"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-500">{product.description}</p>
            
              <p className="font-bold text-blue-600">${product.price.toFixed(2)}</p>
              <p></p>

              <button onClick={() => addToCart(product)} className="bg-blue-600 text-white mt-3 px-4 py-2 rounded transition duration-300 hover:bg-blue-700">Add to Cart</button>
              <span className="flex items-center gap-1 text-sm text-yellow-500">
                <FaStar /> {product.rating}
              </span>
        </div>
     );
}
 
export default ProductCard;