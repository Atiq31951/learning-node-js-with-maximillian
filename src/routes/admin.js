const Express = require("express");
const Route = Express.Router();
const {
  AddProductController,
  PostProductController,
} = require("../controllers/products");

Route.get("/add-product", AddProductController);

Route.post("/product", PostProductController);

module.exports = Route;
