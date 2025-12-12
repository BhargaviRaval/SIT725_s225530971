const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

const MONGO_URI = 'mongodb://127.0.0.1:27017/booksdb_5_3c';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const booksRoute = require('./routes/booksRoute');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/api/books', booksRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
