const {
  AddProduct,
  GetProducts
} = require("../models/Products");

module.exports.GetAddProduct = (req, res, next) => {
  res.status(200);
  res.render("pages/admin/add-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
  });
};

module.exports.PostAddProduct = (req, res, next) => {
  const { title, image_url, price, description } = req.body;
  AddProduct({ title, image_url, price, description });
  res.status(200);
  res.redirect("/");
};

module.exports.GetProducts = (req, res, next) => {
  res.status(200);
  res.render('pages/admin/products', {
    pageTitle: 'Admin Products',
    path: '/admin/products',
    products: GetProducts(),
  });
};
