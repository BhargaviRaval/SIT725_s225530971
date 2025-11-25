const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/2.html'));
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Addition Calculator REST API',
    endpoints: {
      'GET /api': 'API documentation',
      'GET /add?num1=5&num2=3': 'Add two numbers',
      'POST /add': 'Add two numbers (JSON body: {num1, num2})'
    }
  });
});

app.get('/add', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Invalid numbers. Use /add?num1=5&num2=3' });
  }

  res.json({
    operation: 'addition',
    num1,
    num2,
    result: num1 + num2
  });
});

app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;

  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ error: 'Invalid numbers' });
  }

  res.json({ result: num1 + num2 });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
