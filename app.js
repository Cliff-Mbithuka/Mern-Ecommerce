const express = require('express');
const app = express();
const products = require('./routes/product');
const auth = require('./routes/auth');
const errorMiddleware = require('./middlewares/errors')
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser())

app.use('/api/v1/products', products);
app.use('/api/v1/', auth);

// Middleware to Handle Errors
app.use(errorMiddleware);

module.exports = app;
    