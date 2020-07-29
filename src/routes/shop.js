const Express = require("express");
const Route = Express.Router();

const { isAuthenticated } = require("../middlewares/auth");

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
Route.post("/cart", isAuthenticated, PostCart);
Route.get("/cart", isAuthenticated, GetCart);
Route.post("/cart/:productId", isAuthenticated, UpdateCart);
Route.post("/orders", isAuthenticated, PostOrders);
Route.get("/orders", isAuthenticated, GetOrders);
// Route.get("/checkout", GetCheckout);

module.exports = Route;
