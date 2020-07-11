const { GetProducts, GetProduct } = require("../models/Product");
const User = require("../models/User");
const Product = require("../models/Product");

module.exports.GetProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.status(200);
    res.render("pages/shop/product-list", {
      pageTitle: "Products",
      path: "/products",
      products,
    });
  } catch (err) {
    res.redirect("/");
  }
  return;
};

module.exports.GetProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await Product.fetchSingle(productId);
    res.status(200);
    res.render("pages/shop/product-details", {
      pageTitle: `${product ? product.title : "error"}`,
      product: product,
      path: "/product",
    });
  } catch (err) {
    res.redirect("/");
  }
  return;
};

module.exports.GetIndex = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.status(200);
    res.render("pages/shop/index", {
      pageTitle: "Shop",
      products,
      path: "/",
    });
  } catch (err) {
    res.redirect("/");
  }
  return;
};

module.exports.PostCart = async (req, res, next) => {
  const { productId, productPrice } = req.body;
  try {
    const selectedProduct = await Product.fetchSingle(productId);
    await req.user.addToCart(selectedProduct);
    res.status(200);
    res.redirect("/");
  } catch (err) {
    console.log('Error ==> ', err)
    return err;
  }
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
