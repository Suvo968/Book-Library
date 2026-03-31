import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from '../contects/CartContext'; // Ensure the correct import path

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, handleRemoveFromCart } = useContext(CartContext);

  // Calculate the total price of items in the cart
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + (Number(item.rentalPrice) || 0), 0)
      .toFixed(2);
  };

  // Navigate to the checkout page
  const handleCheckout = () => {
    navigate("/checkout");
  };

  // Navigate to the shop section
  const handleContinueShopping = () => {
    navigate("/shop"); // Redirect to the shop section
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={item.imageURL || "https://via.placeholder.com/150"} // Better fallback image
                  alt={item.title}
                  className="w-20 h-30 object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-600">Author: {item.author}</p>
                  <p className="text-gray-600">Price: ₹{item.rentalPrice}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to remove ${item.title}?`)) {
                    handleRemoveFromCart(item);
                  }
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right mt-4">
            <h3 className="text-xl font-bold">Total: ₹{calculateTotal()}</h3>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={handleContinueShopping} // Redirect to the shop section
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Continue Shopping
            </button>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;