import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { Card } from 'flowbite-react';
import { CartContext } from '../contects/CartContext'; // Import CartContext

const Shop = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
  const { setCartItems } = useContext(CartContext); // Use CartContext

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/books`)
      .then((rest) => rest.json())
      .then((data) => setBooks(data));
  }, []);

  const handleBuyNow = (book) => {
    setCartItems((prevItems) => [...prevItems, book]); // Add the book to the cart
    navigate('/cart'); // Redirect to the cart page
  };

  return (
    <div className="mt-28 px-4 lg:px-24">
      <h2 className="text-5xl font-bold text-center">All Books are here</h2>
      <div className="grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        {books.map((book) => (
          // Use book.isbn as the key
          <Card key={book.isbn}>
            <img src={book.imageURL} alt={book.title} className="h-96" />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <p>{book.title}</p>
            </h5>
            <button
              onClick={() => handleBuyNow(book)} // Pass the book to handleBuyNow
              className="bg-blue-700 font-semibold text-white py-2 rounded"
            >
              Buy Now
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shop;