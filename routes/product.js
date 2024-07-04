const express = require("express");

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/review").patch(isAuthenticatedUser, createProductReview);

router.route("/").get(getProducts);
router.route("/:id").get(getSingleProduct);
router
  .route("/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

router
  .route("/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/reviews").get(isAuthenticatedUser, getProductReviews);
router.route("/reviews").delete(isAuthenticatedUser, deleteReview);

module.exports = router;
