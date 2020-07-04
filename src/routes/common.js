const Express = require("express");
const Route = Express.Router();
const Path = require('path');
const { GetProducts } = require("../models/Products");

Route.get("/", (req, res, next) => {
  res.status(200);
  res.render("pages/shop", { pageTitle: "Shop", products: GetProducts() });
});

module.exports = Route;
