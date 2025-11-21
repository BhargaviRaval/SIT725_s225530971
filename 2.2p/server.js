const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;

  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return res.status(400).json({ error: 'Invalid numbers' });
  }

  const result = num1 + num2;
  res.json({ num1, num2, result });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
