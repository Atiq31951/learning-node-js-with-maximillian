const {
  GetProducts,
} = require("../models/Products");

module.exports.GetProduct = (req, res, next) => {
  res.status(200);
  res.render("pages/shop/product-list", {
    pageTitle: "All products",
    products: GetProducts(),
    path: "/products",
  });
};

module.exports.GetIndex = (req, res, next) => {
  res.status(200);
  res.render("pages/shop/index", {
    pageTitle: "Shop",
    products: GetProducts(),
    path: "/",
  });
};

module.exports.GetCart = (req, res, next) => {
  res.status(200);
  res.render("pages/shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart",
  });
};

module.exports.GetCheckout = (req, res, next) => {
  res.status(200);
  res.render("pages/shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

module.exports.GetOrders = (req, res, next) => {
  res.status(200);
  res.render("pages/shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
};

