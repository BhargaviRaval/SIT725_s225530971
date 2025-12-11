// routes/booksRoute.js

const express = require('express');
const router = express.Router();

// Use index.js in controllers folder (like in the PDF)
const Controllers = require('../controllers');

// GET /api/books → getAllBooks
router.get('/', Controllers.booksController.getAllBooks);

// GET /api/books/:id → getBookById
router.get('/:id', Controllers.booksController.getBookById);

module.exports = router;
