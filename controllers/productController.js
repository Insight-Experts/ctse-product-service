const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const addProduct = asyncHandler(async (req, res) => {
  const {
    title,
    userId,
    category,
    productBrand,
    productCode,
    description,
    picURL,
    price,
    ingredients,
    usage,
    warnings,
    discountNote,
    discountPrice,
    quantity,
  } = req.body;

  if (
    !title ||
    !userId ||
    !category ||
    !productBrand ||
    !productCode ||
    !description ||
    !picURL ||
    !price ||
    !ingredients ||
    !usage ||
    !warnings ||
    !discountNote ||
    !discountPrice ||
    !quantity
  ) {
    res.status(400);
    return res.status(400).json({ message: "Please fill all the fields" });
  } else {
    const product = new Product({
      title,
      userId,
      category,
      productBrand,
      productCode,
      description,
      picURL,
      price,
      ingredients,
      usage,
      warnings,
      discountNote,
      discountPrice,
      quantity,
    });

    const addedProduct = await product.save();

    res.status(201).json(addedProduct);
  }
});

const getProductsForUser = asyncHandler(async (req, res) => {
  const products = await Product.find({userId: req.params.id});
  res.json(products);
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    return res.status(404).json({ message: "Product not found" });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    title,
    category,
    productBrand,
    productCode,
    description,
    picURL,
    price,
    ingredients,
    usage,
    warnings,
    discountNote,
    discountPrice,
    quantity,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.title = title;
    product.category = category;
    product.productBrand = productBrand;
    product.productCode = productCode;
    product.description = description;
    product.picURL = picURL;
    product.price = price;
    product.ingredients = ingredients;
    product.usage = usage;
    product.warnings = warnings;
    product.discountNote = discountNote;
    product.discountPrice = discountPrice;
    product.quantity = quantity;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    return res.status(404).json({ message: "Product not found" });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (product) {
    res.json({ message: "Product  Removed" });
  } else {
    return res.status(404).json({ message: "Product not Found" });
  }
});

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsForUser
};