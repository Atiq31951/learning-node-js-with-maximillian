const Express = require("express");
const Route = Express.Router();

// Controllers
const {
  GetProduct,
  GetIndex,
  GetCart,
  GetCheckout,
  GetOrders,
} = require("../controllers/shop");

Route.get("/", GetIndex);
Route.get("/products", GetProduct);
Route.get("/cart", GetCart);
Route.get("/checkout", GetCheckout);
Route.get("/orders", GetOrders);

module.exports = Route;
