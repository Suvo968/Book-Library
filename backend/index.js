require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
const Book = require('./models/Book');
const app = express();
const port = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());

// Landing route
app.get('/', (req, res) => {
    res.send('Welcome to the Backend Server!');
});

// Test endpoint
app.get('/test', async (req, res) => {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/BookInventory';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Use book routes
app.use('/books', bookRoutes);

app.post('/chat', async (req, res) => {
    try {
      const userMessage = req.body.message.toLowerCase();
      
      if (userMessage.includes('recommend')) {
        const books = await Book.aggregate([{ $sample: { size: 1 } }]);
        
        if (books.length > 0) {
          const recommendedBook = books[0];
          return res.json({
            reply: `I recommend reading "${recommendedBook.title}" by ${recommendedBook.author}. Description: ${recommendedBook.description}`,
          });
        } else {
          return res.json({
            reply: "Sorry, I couldn't find any book to recommend right now. Please try again later.",
          });
        }
      }
  
      res.json({ reply: "I'm sorry, I didn't understand. Can you please ask about books?" });
    } catch (error) {
      console.error("Error in /chat endpoint:", error);
      res.status(500).json({ reply: "An error occurred. Please try again later." });
    }
  });

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
      console.log('Server closed.');
      mongoose.connection.close(false, () => {
          console.log('MongoDB connection closed.');
          process.exit(0);
      });
  });
});