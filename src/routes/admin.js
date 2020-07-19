const Express = require("express");
const Route = Express.Router();

const { isAdmin } = require("../middlewares/auth");

// Controllers
const {
  GetAddProduct,
  PostAddProduct,
  GetProducts,
  GetProductToEdit,
  PostUpdateProduct,
  PostDeleteProduct,
} = require("../controllers/admin");

Route.get("/add-product", isAdmin, GetAddProduct);
Route.post("/add-product", isAdmin, PostAddProduct);
Route.get("/products", isAdmin, GetProducts);
Route.get("/edit-product/:productId", isAdmin, GetProductToEdit);
Route.post("/update-product/:productId", isAdmin, PostUpdateProduct);
Route.post("/delete-product/:productId", isAdmin, PostDeleteProduct);

module.exports = Route;
