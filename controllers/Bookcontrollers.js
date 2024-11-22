const Book = require('../models/Book');

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Get a single book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Add a new book

exports.addBook = async (req, res) => {
    const { title, author, isbn, publishedYear } = req.body;

    if (!title || !author || !isbn || !publishedYear) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if a book with the same ISBN already exists
        const existingBook = await Book.findOne({ isbn });
        if (existingBook) {
            return res.status(400).json({ message: 'Book with this ISBN already exists' });
        }

        const newBook = new Book({ title, author, isbn, publishedYear });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add multiple books (Bulk Upload)

exports.addBulkBooks = async (req, res) => {
    const books = req.body; // The body should contain an array of books

    if (!Array.isArray(books) || books.length === 0) {
        return res.status(400).json({ message: 'Invalid input, expected an array of books' });
    }

    // Validate each book and check for duplicates
    const existingBooks = [];
    const newBooks = [];

    for (const book of books) {
        const { title, author, isbn, publishedYear } = book;

        if (!title || !author || !isbn || !publishedYear) {
            return res.status(400).json({ message: 'All fields are required for each book' });
        }

        // Check if the book already exists by ISBN
        const existingBook = await Book.findOne({ isbn });
        if (existingBook) {
            existingBooks.push(isbn); // Track ISBNs of duplicates
        } else {
            newBooks.push(book); // Track new books to be added
        }
    }

    if (existingBooks.length > 0) {
        return res.status(400).json({ message: `Books with ISBNs ${existingBooks.join(', ')} already exist.` });
    }

    try {
        // Bulk insert using insertMany for new books
        const savedBooks = await Book.insertMany(newBooks);
        res.status(201).json(savedBooks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        const { title, author, isbn, publishedYear } = req.body;
        if (title) book.title = title;
        if (author) book.author = author;
        if (isbn) book.isbn = isbn;
        if (publishedYear) book.publishedYear = publishedYear;

        const updatedBook = await book.save();
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get favorite books
exports.getFavoriteBooks = async (req, res) => {
    try {
        const favorites = await Book.find({ isFavorite: true });
        res.status(200).json(favorites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Mark a book as favorite
exports.markAsFavorite = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        book.isFavorite = true;
        const updatedBook = await book.save();
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a random book suggestion
exports.getRandomBook = async (req, res) => {
    try {
        const count = await Book.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomBook = await Book.findOne().skip(randomIndex);
        res.status(200).json(randomBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
