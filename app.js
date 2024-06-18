const express = require('express');
const app = express();
const products = require('./routes/product');

app.use(express.json());

app.use('/api/v1/products', products);

module.exports = app;
    