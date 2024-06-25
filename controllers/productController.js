const Product = require("../models/product");
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')


// Create new product => /api/v1/product/new
exports.newProduct = catchAsyncErrors (async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ message: `success`, product });
});

// Get all product => /api/v1/products
exports.getProducts = catchAsyncErrors (async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});


// Get single Product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors (async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }

    res.status(200).json({
        success: true,
        product
    })
});

// update Product details => /api/v1/product/:id
exports.updateProduct = catchAsyncErrors (async (req, res, next) => {
   let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }

   product = await Product.findByIdAndUpdate(req.params.id, req.body, { 
    new: true,
    runValidators: true,
    useFindAndModify: false
   });
    
   res.status(200).json({
    success: true,
    product
})
});


// Delete Product  => /api/v1/product/:id
exports.deleteProduct = catchAsyncErrors (async (req, res, next) => {
   const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Product not found', 404))
    }

    // await product.remove();

    await Product.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
       message: 'product is deleted'
    })
});