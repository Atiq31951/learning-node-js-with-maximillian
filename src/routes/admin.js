const Express = require("express");
const Route = Express.Router();

// Controllers
const {
  GetAddProduct,
  PostAddProduct,
  GetProducts,
  GetProductToEdit,
  PostUpdateProduct,
  PostDeleteProduct,
} = require("../controllers/admin");

Route.get("/add-product", GetAddProduct);
Route.post("/add-product", PostAddProduct);
Route.get("/products", GetProducts);
Route.get("/edit-product/:productId", GetProductToEdit);
Route.post("/update-product/:productId", PostUpdateProduct);
Route.post("/delete-product/:productId", PostDeleteProduct);

module.exports = Route;
