const express = require("express");
const {
	addProduct,
	getProducts,
	getProductById,
	updateProduct,
	deleteProduct,
} = require("../controllers/productController");
const router = express.Router();

//get product routes
router.route("/").get(getProducts);
router.route("/add").post(addProduct);
router
	.route("/:id")
	.get(getProductById)
	.put(updateProduct)
	.delete(deleteProduct);

module.exports = router;
