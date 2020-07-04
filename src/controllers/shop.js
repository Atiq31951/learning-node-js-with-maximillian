const {
  GetProducts,
} = require("../models/Products");

module.exports.GetProduct = (req, res, next) => {
  res.status(200);
  res.render("pages/shop/product-list", {
    pageTitle: "Shop",
    products: GetProducts(),
    path: "shop",
  });
};

module.exports.GetIndex = (req, res, next) => {
  res.status(200);
  res.render("pages/shop/product-list", {
    pageTitle: "Shop",
    products: GetProducts(),
    path: "shop",
  });
};

