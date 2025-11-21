const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

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

  const result = num1 + num2;
  res.json({ 
    operation: 'addition',
    num1, 
    num2, 
    result,
    expression: `${num1} + ${num2} = ${result}`
  });
});

app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;

  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ error: 'Invalid numbers' });
  }

  const result = num1 + num2;
  res.json({ num1, num2, result });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
