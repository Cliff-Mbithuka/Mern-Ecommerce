const express = require('express');
const app = express();
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const errorMiddleware = require('./middlewares/errors')
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser())

app.use('/api/v1/products', products);
app.use('/api/v1/', auth);
app.use('/api/v1/', order);

// Middleware to Handle Errors
app.use(errorMiddleware);

module.exports = app;
    