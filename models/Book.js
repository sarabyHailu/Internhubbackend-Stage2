const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    isFavorite: { type: Boolean, default: false },
});

module.exports = mongoose.model('Book', bookSchema);
