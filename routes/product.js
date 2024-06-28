const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { isAuthenticatedUser } = require('../middlewares/auth')

router.route("/").get( getProducts);
router.route("/:id").get(getSingleProduct);
router.route("/new").post(isAuthenticatedUser, newProduct);

router.route("/:id").put(isAuthenticatedUser, updateProduct).delete(isAuthenticatedUser, deleteProduct);

module.exports = router;
