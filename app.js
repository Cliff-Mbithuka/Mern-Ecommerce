const express = require('express');
const app = express();
const products = require('./routes/product');
const errorMiddleware = require('./middlewares/errors')


app.use(express.json());

app.use('/api/v1/products', products);

// Middleware to Handle Errors
app.use(errorMiddleware);

module.exports = app;
    