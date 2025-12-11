// server.js

const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Import route file (same pattern as: const foodRoute = require('./routes/foodRoute'))
const booksRoute = require('./routes/booksRoute');

// Serve static files from public (same as Week 5)
app.use(express.static(path.join(__dirname, 'public')));

// Mount the route at /api/books (like app.use('/api/food', foodRoute))
app.use('/api/books', booksRoute);

// Root route (optional, similar to Week 5 examples)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
