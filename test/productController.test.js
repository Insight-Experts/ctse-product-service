const httpMocks = require("node-mocks-http");
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const Product = require("../models/productModel");

jest.mock("../models/productModel");

describe("addProduct Controller Tests", () => {
  it("Should add a new product and return 201 status code", async () => {
    const req = httpMocks.createRequest({
      body: {
        title: "Test Product",
        category: "Test Category",
        productBrand: "Test Brand",
        productCode: "XYZ123",
        description: "Test Description",
        picURL: "http://example.com/pic.jpg",
        price: 100,
        ingredients: "Test Ingredients",
        usage: "Test Usage",
        warnings: "Test Warnings",
        discountNote: "Test Discount",
        discountPrice: 80,
        quantity: 10,
      },
    });
    const res = httpMocks.createResponse();

    Product.prototype.save = jest.fn().mockResolvedValue(req.body);

    await addProduct(req, res);

    expect(res.statusCode).toBe(201);
    expect(JSON.parse(res._getData())).toMatchObject({ title: "Test Product" });
  });

  it("Should return 400 status code if required fields are missing", async () => {
    const req = httpMocks.createRequest({ body: {} });
    const res = httpMocks.createResponse();

    await addProduct(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toHaveProperty(
      "message",
      "Please fill all the fields"
    );
  });
});

describe("getProducts Controller Tests", () => {
  it("Should return all products", async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    Product.find = jest.fn().mockResolvedValue([{ title: "Test Product" }]);

    await getProducts(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData().length).toBeGreaterThan(0);
  });
});

describe("getProductById Controller Tests", () => {
  it("Should return a product by ID", async () => {
    const req = httpMocks.createRequest({ params: { id: "123" } });
    const res = httpMocks.createResponse();

    Product.findById = jest.fn().mockResolvedValue({ title: "Test Product" });

    await getProductById(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toHaveProperty("title", "Test Product");
  });

  it("Should return 404 if the product is not found", async () => {
    const req = httpMocks.createRequest({ params: { id: "not_found_id" } });
    const res = httpMocks.createResponse();

    Product.findById = jest.fn().mockResolvedValue(null);

    await getProductById(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toHaveProperty("message", "Product not found");
  });
});

describe("updateProduct Controller Tests", () => {
  it("Should update a product", async () => {
    const req = httpMocks.createRequest({
      params: { id: "123" },
      body: { title: "Updated Test Product" },
    });
    const res = httpMocks.createResponse();

    const mockProduct = {
      save: jest.fn().mockResolvedValue({ ...req.body }),
    };

    Product.findById = jest.fn().mockResolvedValue(mockProduct);

    await updateProduct(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toHaveProperty("title", "Updated Test Product");
  });

  it("Should return 404 if the product to update is not found", async () => {
    const req = httpMocks.createRequest({ params: { id: "not_found_id" } });
    const res = httpMocks.createResponse();

    Product.findById = jest.fn().mockResolvedValue(null);

    await updateProduct(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toHaveProperty("message", "Product not found");
  });
});

describe("deleteProduct Controller Tests", () => {
  it("Should delete a product", async () => {
    const req = httpMocks.createRequest({ params: { id: "123" } });
    const res = httpMocks.createResponse();

    Product.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: "123" });

    await deleteProduct(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toHaveProperty("message", "Product  Removed");
  });

  it("Should return 404 if the product to delete is not found", async () => {
    const req = httpMocks.createRequest({ params: { id: "not_found_id" } });
    const res = httpMocks.createResponse();

    Product.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    await deleteProduct(req, res);

    expect(res.statusCode).toBe(404);
    expect(res._getJSONData()).toHaveProperty("message", "Product not Found");
  });
});
