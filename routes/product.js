const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route("/").get( getProducts);
router.route("/:id").get(getSingleProduct);
router.route("/new").post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

router.route("/:id").put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

router.route('/review').put(isAuthenticatedUser, createProductReview)

module.exports = router;
