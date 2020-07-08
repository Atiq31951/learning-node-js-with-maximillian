const { GetProducts, GetProduct } = require("../models/Products");
const Cart = require("../models/Cart");

module.exports.GetProducts = (req, res, next) => {
  res.status(200);
  res.render("pages/shop/product-list", {
    pageTitle: "All products",
    products: GetProducts(),
    path: "/products",
  });
};

module.exports.GetProduct = (req, res, next) => {
  const { productId } = req.params;
  const product = GetProduct(productId);
  // console.log("Product ===> ", product);
  res.render("pages/shop/product-details", {
    pageTitle: `${product ? product.title : "error"}`,
    product: product,
    path: "/product",
  });
};

module.exports.GetIndex = (req, res, next) => {
  res.status(200);
  // console.log("GetProducts()", GetProducts());
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

module.exports.PostCart = (req, res, next) => {
  res.status(200);
  const { productId, productPrice } = req.body;
  // console.log("Hello I am here")
  // console.log('req.body: ', req.body);
  // console.log('productId: ', productId);
  Cart.addProducts(productId, productPrice);
  res.redirect('/');
}

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
