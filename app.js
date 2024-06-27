const express = require('express');
const app = express();
const products = require('./routes/product');
const auth = require('./routes/auth');
const errorMiddleware = require('./middlewares/errors')


app.use(express.json());

app.use('/api/v1/products', products);
app.use('/api/v1/register', auth);

// Middleware to Handle Errors
app.use(errorMiddleware);

module.exports = app;
    