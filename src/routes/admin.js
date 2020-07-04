const Express = require("express");
const Route = Express.Router();
const Path = require("path");
// const rootDir = require("../utils/path");
const {
  AddProduct,
  DeleteProduct,
  UpdateProduct,
  GetProducts
} = require("../models/Products");

Route.get("/add-product", (req, res, next) => {
  res.status(200);
  res.render('pages/add-product', { pageTitle: "Add product" });
});

Route.post("/product", (req, res, next) => {
  // console.log("req.body ===> ", req.body);
  const { title } = req.body
  AddProduct({title})
  res.status(200);
  res.redirect("/");
});

module.exports = Route;
