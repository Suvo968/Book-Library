import React from 'react';
import { useState, useEffect } from 'react';
import BookCards from '../components/BookCards';

const BestSellerBook = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/books/bestsellers`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch best seller books");
        }
        return res.json();
      })
      .then((data) => {
        //console.log("Fetched bestsellers:",data); // Log the data
        if (data.length === 0) {
          throw new Error("No best seller books found");
        }
        setBooks(data.slice(0, 10)); // Get the first 10 books
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bestsellers:", err.message); // Log the error
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  // Loading state: Show a spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Error state: Show an error message with a retry button
  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error}</p>
        <button
          onClick={() => window.location.reload()} // Reload the page to retry
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  // Empty state: Show a message if no books are found
  if (books.length === 0) {
    return (
      <div className="text-center text-gray-600">
        <p>No best seller books found.</p>
      </div>
    );
  }

  // Success state: Render the BookCards component
  return (
    <div>
      <BookCards books={books} headline="Top 10 Best Seller Books" />
    </div>
  );
};

export default BestSellerBook;