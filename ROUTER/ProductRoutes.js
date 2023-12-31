const express = require("express");
const productRouter = express.Router();
const ProductControllerFunction = require("../CONTROLLER/ProductController");

productRouter.post("/add-product", ProductControllerFunction.CreateProduct);
productRouter.get("/all-products", ProductControllerFunction.ShowAllProducts);
productRouter.get(
  "/single-product/:id",
  ProductControllerFunction.ViewSingleProduct
);
productRouter.put(
  "/update-product/:id",
  ProductControllerFunction.UpdateProduct
);
productRouter.delete(
  "/delete-product/:id",
  ProductControllerFunction.DeleteProduct
);

module.exports = productRouter;
