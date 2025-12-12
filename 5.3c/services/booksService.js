const Book = require('../models/bookModel');

const getAllBooks = async () => {
  const books = await Book.find({}).sort({ title: 1 }); 
  return books;
};

const getBookById = async (id) => {
  const book = await Book.findOne({ id }); 
  return book;
};

module.exports = { getAllBooks, getBookById };
