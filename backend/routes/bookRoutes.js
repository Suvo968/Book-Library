const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// POST - Add a new book
router.post('/', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const result = await newBook.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Fetch all books with all fields
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Search books (MUST BE DEFINED BEFORE /:id)
router.get('/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
        { publisher: { $regex: query, $options: 'i' } }
      ]
    });

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET - Bestsellers (MUST BE DEFINED BEFORE /:id)
router.get('/bestsellers', async (req, res) => {
  try {
    const bestsellers = await Book.find({ isBestseller: true });
    res.json(bestsellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Fetch a random book recommendation
router.get('/chatbot/recommend', async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length === 0) {
      return res.status(404).json({ message: "No books found in the database." });
    }
    const randomBook = books[Math.floor(Math.random() * books.length)];
    res.json({ book: randomBook.title });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Fetch top 3 best-selling books
// GET - Fetch top 3 best-selling books
router.get('/chatbot/bestsellers', async (req, res) => {
  try {
    // Fetch all best-selling books
    const bestsellers = await Book.find({ isBestseller: true });

    if (bestsellers.length === 0) {
      return res.status(404).json({ message: "No best-selling books found." });
    }

    // Shuffle the array of bestsellers
    const shuffledBooks = bestsellers.sort(() => 0.5 - Math.random());

    // Pick the first 3 books from the shuffled array
    const randomBooks = shuffledBooks.slice(0, 3).map((book) => book.title);

    res.json({ 
      books: randomBooks, 
      viewAllURL: `http://localhost:5050/bestsellers` // Replace with your actual URL
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Fetch a book by its ID
router.get('/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Update a book
router.put('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Book not found' });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;