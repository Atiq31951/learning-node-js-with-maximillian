const { GetProducts, GetProduct } = require("../models/Product");
const User = require("../models/User");
const Product = require("../models/Product");

exports.GetProducts = async (req, res, next) => {
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

exports.GetProduct = async (req, res, next) => {
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

exports.GetIndex = async (req, res, next) => {
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

exports.PostCart = async (req, res, next) => {
  const { productId, productPrice } = req.body;
  try {
    const selectedProduct = await Product.fetchSingle(productId);
    await req.user.addToCart(selectedProduct);
    res.status(200);
    res.redirect("/cart");
  } catch (err) {
    console.log("Error ==> ", err);
    return err;
  }
};

exports.GetCart = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();
    res.status(200);
    res.render("pages/shop/cart", {
      cart,
      pageTitle: "Your Cart",
      path: "/cart",
    });
  } catch (err) {
    console.log("Err => ", err);
  }
};

exports.UpdateCart = async (req, res, next) => {
  const { productId } = req.params;
  const { quantity } = req.query;
  try {
    await req.user.updateCart(productId, Number(quantity));
    res.redirect("/cart");
  } catch (err) {
    res.redirect("/");
  }
};

exports.PostOrders = async (req, res, next) => {
  try {
    await req.user.AddOrder();
    res.redirect("/cart");
  } catch (err) {
    res.redirect("/cart");
  }
};

exports.GetOrders = async (req, res, next) => {
  try {
    const orders = await req.user.GetOrders();
    res.status(200);
    res.render("pages/shop/orders", {
      orders,
      pageTitle: "Orders",
      path: "/orders",
    });
  } catch (err) {
    console.log("Err ==> ", err);
  }
};

exports.GetCheckout = (req, res, next) => {
  res.status(200);
  res.render("pages/shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
