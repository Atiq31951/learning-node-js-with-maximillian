const Express = require("express");
const Route = Express.Router();

// Controllers
const {
  GetAddProduct,
  PostAddProduct,
} = require("../controllers/admin");

Route.get("/add-product", GetAddProduct);
Route.post("/add-product", PostAddProduct);
Route.get("/products");

module.exports = Route;
