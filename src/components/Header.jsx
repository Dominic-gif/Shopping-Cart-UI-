import { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext.jsx'

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    const { cart, removeFromCart, clearCart } = useCart()
    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    return (
        <header className="sticky top-0 z-40 p-4 flex justify-between items-center bg-white shadow-md">
            <h1 className="flex items-center gap-2 text-2xl font-bold text-blue-600">
              <img src="/shopmate-icon.svg" alt="" className="h-9 w-9" />
              ShopMate
            </h1>
            <div className="relative">

          <button className="cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>

            <FaShoppingCart className="text-3xl text-gray-800" />
            {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                    {itemCount}
                </span>
            )}
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-2">Cart Items</h2>
                {cart.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                  <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">
                    {cart.map((item) => (
                      <li key={item.id} className="flex justify-between py-2">
                        <div>
                            <div className="font-semibold">{item.name} </div>
                            <p className="text-cyan-600 text-sm">{item.quantity} x ${item.price.toFixed(2)}</p>
                            
                        </div> 
                        <button className="text-red-600 text-sm hover:underline" onClick={() => removeFromCart(item.id)}>Remove</button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 flex justify-between font-semibold text-green-600">Total: <span>${total}</span></div>
                {cart.length > 0 && (
                  <button className="mt-3 w-full bg-red-400 text-white py-2 px-4 rounded hover:bg-red-700" onClick={clearCart}>
                    Clear Cart
                  </button>
                )}
              </div> 
            </div>
          )}
            </div>
        </header>
    )
}

export default Header
