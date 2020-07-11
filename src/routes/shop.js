const Express = require("express");
const Route = Express.Router();

// Controllers
const {
  GetProducts,
  GetProduct,
  GetIndex,
  GetCart,
  UpdateCart,
  GetCheckout,
  GetOrders,
  PostOrders,
  PostCart,
} = require("../controllers/shop");

Route.get("/", GetIndex);
Route.get("/products", GetProducts);
Route.get("/product/:productId", GetProduct);
Route.post("/cart", PostCart);
Route.get("/cart", GetCart);
Route.post("/cart/:productId", UpdateCart);
Route.post('/orders', PostOrders);
Route.get("/orders", GetOrders);
// Route.get("/checkout", GetCheckout);

module.exports = Route;
