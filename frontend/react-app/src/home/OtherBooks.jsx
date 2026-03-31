import React, { useEffect, useState } from 'react';
import BookCards from '../components/BookCards';

const OtherBooks = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/books`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch books');
        }
        return res.json();
      })
      .then(data => {
        setBooks(data.slice(0, 10));
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <BookCards books={books} headline="Other Books" />

      
      
    </div>
    
    
  );
};

export default OtherBooks;
