const Product = require('../models/product');
const products = require('../data/products');
const connectDataBase = require("../config/database");

connectDataBase();

const seedProducts = async () => {
    try{

        await Product.deleteMany();
        console.log('Products are deleted!')

        await Product.insertMany(products);
        console.log(`All Products added!`);

        process.exit(1);

    }catch(error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts();
