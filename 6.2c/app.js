const express = require('express');
const path = require('path');
const calcRoutes = require('./routes/calcRoutes');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/calc', calcRoutes);

module.exports = app;
