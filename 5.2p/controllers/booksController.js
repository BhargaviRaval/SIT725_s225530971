const booksService = require('../services/booksService');

exports.getAllBooks = (req, res) => {
  const items = booksService.getAllBooks();
  res.json({ data: items });
};

exports.getBookById = (req, res) => {
  const { id } = req.params;
  const book = booksService.getBookById(id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.json({ data: book });
};
