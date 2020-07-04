const Express = require("express");
const Route = Express.Router();
const Path = require("path");
const { GetProductController } = require("../controllers/products");

Route.get("/", GetProductController);

module.exports = Route;
