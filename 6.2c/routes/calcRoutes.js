const express = require('express');
const { add } = require('../utils/calculator');

const router = express.Router();

router.get('/add', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: 'Invalid numbers' });
  }

  const result = add(a, b);
  res.json({ result });
});

module.exports = router;
