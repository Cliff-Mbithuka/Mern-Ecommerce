const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.route("/").get(getProducts);
router.route("/:id").get(getSingleProduct);
router.route("/new").post(newProduct);

router.route("/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
