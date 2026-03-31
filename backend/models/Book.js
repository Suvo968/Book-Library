const mongoose = require('mongoose');

// Book schema
const bookSchema = new mongoose.Schema({
  isbn: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  rentalPrice: { type: Number, required: true },
  status: { type: String, enum: ['Yes', 'No'], required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  isBestseller: { type: Boolean, default: false },
  description:{type: String , required: true},
  imageURL: { type: String } 
});

// Create book model
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
