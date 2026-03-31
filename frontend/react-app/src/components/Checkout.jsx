import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contects/CartContext"; // Corrected import path
import { ToastContainer, toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.rentalPrice, 0).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { fullName, address, cardNumber, expiryDate, cvv } = formData;
    if (!fullName || !address || !cardNumber || !expiryDate || !cvv) {
      toast.error("Please fill in all the details before placing your order.");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) return; // Stop if form is invalid

    setIsPlacingOrder(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5; // Simulate success/failure
      if (isSuccess) {
        toast.success("Order placed successfully!");
        clearCart();
        navigate("/");
      } else {
        setError("Failed to place order. Please try again.");
        toast.error("Failed to place order. Please try again.");
      }
      setIsPlacingOrder(false);
    }, 2000);
  };

  return (
    <section className="min-h-screen p-8 bg-gray-100">
      <header>
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      </header>
      {cartItems.length > 0 ? (
        <div className="space-y-4">
          {/* Display Cart Items */}
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
              <div className="flex items-center space-x-4">
                <img src={item.imageURL || "default-image.jpg"} alt={item.title} className="w-20 h-30 object-cover" />
                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-600">Author: {item.author}</p>
                  <p className="text-gray-600">Price: ₹{item.rentalPrice}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Display Total Amount */}
          <div className="text-right mt-4">
            <h3 className="text-xl font-bold">Total: ₹{calculateTotal()}</h3>
          </div>

          {/* Payment and Shipping Form */}
          <div className="mt-6 p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Payment and Shipping Details</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your address"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your card number"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter CVV"
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            {/* Back to Shopping Button */}
            <button
              onClick={() => navigate("/shop")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Back to Shopping
            </button>

            {/* Place Order Button */}
            <button
              type="button"
              onClick={handlePlaceOrder}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={cartItems.length === 0 || isPlacingOrder}
            >
              {isPlacingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </div>

          {/* Display Error Message */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Your cart is empty.{" "}
          <button
            onClick={() => navigate("/shop")}
            className="text-blue-600 hover:underline"
          >
            Continue Shopping
          </button>
        </p>
      )}

      {/* Toast Container */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </section>
  );
};

export default Checkout;