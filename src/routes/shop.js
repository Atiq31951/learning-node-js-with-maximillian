const Express = require("express");
const Route = Express.Router();

// Controllers
const { GetProduct } = require("../controllers/shop");

Route.get("/", GetProduct);
Route.get("/products");
Route.get("/cart");
Route.get("/checkout");

module.exports = Route;
