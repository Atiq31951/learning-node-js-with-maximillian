const Path = require("path");
// const rootDir = require("../utils/path");
const {
  AddProduct,
  DeleteProduct,
  UpdateProduct,
  GetProducts,
} = require("../models/Products");

module.exports.AddProductController = (req, res, next) => {
  res.status(200);
  res.render("pages/add-product", {
    pageTitle: "Add product",
    path: "add-product",
  });
};

module.exports.PostProductController = (req, res, next) => {
  const { title } = req.body;
  AddProduct({ title });
  res.status(200);
  res.redirect("/");
};

module.exports.GetProductController = (req, res, next) => {
  res.status(200);
  res.render("pages/shop", {
    pageTitle: "Shop",
    products: GetProducts(),
    path: "shop",
  });
};
