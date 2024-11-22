const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();
const booksRoutes=require('./routes/books')
const app = express();
connectDB();

app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.status(200).send('Book collection');
});
app.use('/books',booksRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
