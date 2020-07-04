const {
  AddProduct,
} = require("../models/Products");

module.exports.GetAddProduct = (req, res, next) => {
  res.status(200);
  res.render("pages/admin/add-product", {
    pageTitle: "Add product",
    path: "admin/add-product",
  });
};

module.exports.PostAddProduct = (req, res, next) => {
  const { title } = req.body;
  AddProduct({ title });
  res.status(200);
  res.redirect("/");
};
