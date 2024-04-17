const express = require("express");
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsForUser,
} = require("../controllers/productController");
const router = express.Router();

router.route("/vendor/:id").get(getProductsForUser);
router.route("/").get(getProducts);
router.route("/add").post(addProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;