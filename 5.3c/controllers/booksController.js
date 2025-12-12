const booksService = require('../services/booksService');

exports.getAllBooks = async (req, res) => {
  try {
    const items = await booksService.getAllBooks();
    res.json({ data: items });
  } catch (err) {
    console.error('Error in getAllBooks:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await booksService.getBookById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ data: book });
  } catch (err) {
    console.error('Error in getBookById:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
