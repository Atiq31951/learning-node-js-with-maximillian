const Express = require("express");
const Route = Express.Router();

// Controllers
const {
  GetProducts,
  GetProduct,
  GetIndex,
  GetCart,
  GetCheckout,
  GetOrders,
  PostCart,
} = require("../controllers/shop");

Route.get("/", GetIndex);
Route.get("/products", GetProducts);
Route.get("/product/:productId", GetProduct);
Route.post("/cart", PostCart);
// Route.get("/cart", GetCart);
// Route.get("/checkout", GetCheckout);
// Route.get("/orders", GetOrders);

module.exports = Route;
