// const express = require('express');
// const router = express.Router();
// const Book = require('../models/Book');

// // Get all books
// router.get('/', async (req, res) => {
//     try {
//         const books = await Book.find();
//         res.status(200).json(books);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Add a new book
// router.post('/', async (req, res) => {
//     const { title, author, isbn, publishedYear } = req.body;

//     if (!title || !author || !isbn || !publishedYear) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//         const newBook = new Book({ title, author, isbn, publishedYear });
//         const savedBook = await newBook.save();
//         res.status(201).json(savedBook);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Update a book by ID
// router.put('/:id', async (req, res) => {
//     try {
//         const book = await Book.findById(req.params.id);
//         if (!book) return res.status(404).json({ message: 'Book not found' });

//         const { title, author, isbn, publishedYear } = req.body;
//         if (title) book.title = title;
//         if (author) book.author = author;
//         if (isbn) book.isbn = isbn;
//         if (publishedYear) book.publishedYear = publishedYear;

//         const updatedBook = await book.save();
//         res.status(200).json(updatedBook);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Delete a book by ID
// router.delete('/:id', async (req, res) => {
//     try {
//         const book = await Book.findById(req.params.id);
//         if (!book) {
//             return res.status(404).json({ message: 'Book not found' });
//         }

//         // Use findByIdAndDelete to delete the document directly
//         await Book.findByIdAndDelete(req.params.id);
//         res.status(200).json({ message: 'Book deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });


// // Custom endpoint: Get favorite books
// router.get('/favorites', async (req, res) => {
//     try {
//         const favorites = await Book.find({ isFavorite: true });
//         res.status(200).json(favorites);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Custom endpoint: Mark a book as favorite
// router.post('/:id/favorite', async (req, res) => {
//     try {
//         const book = await Book.findById(req.params.id);
//         if (!book) return res.status(404).json({ message: 'Book not found' });

//         book.isFavorite = true;
//         const updatedBook = await book.save();
//         res.status(200).json(updatedBook);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
// // Custom endpoint: Get a random book suggestion
// router.get('/recommendations', async (req, res) => {
//     try {
//         // Count the total number of books in the database
//         const count = await Book.countDocuments();

//         // Generate a random index between 0 and the count of books - 1
//         const randomIndex = Math.floor(Math.random() * count);

//         // Fetch a random book by skipping the random number of books
//         const randomBook = await Book.findOne().skip(randomIndex);

//         // Return the random book
//         res.status(200).json(randomBook);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });


// module.exports = router;
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/Bookcontrollers');

// Get all books
router.get('/', bookController.getAllBooks);

// Add a new book
router.post('/', bookController.addBook);
// Add bulk new books
router.post('/bulk', bookController.addBulkBooks);

// Update a book by ID
router.put('/:id', bookController.updateBook);

// Delete a book by ID
router.delete('/:id', bookController.deleteBook);

// Get favorite books
router.get('/favorites', bookController.getFavoriteBooks);

// Mark a book as favorite
router.post('/:id/favorite', bookController.markAsFavorite);

// Get a random book recommendation
router.get('/recommendations', bookController.getRandomBook);
// Get a single book by ID
router.get('/:id', bookController.getBookById);

module.exports = router;
