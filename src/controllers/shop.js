const { GetProducts, GetProduct } = require("../models/Product");
const Product = require("../models/Product");

exports.GetProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200);
    let isLoggedIn = req.session.isLoggedIn || false;
    let isAdmin = req.session.isAdmin || false;

    res.render("pages/shop/product-list", {
      pageTitle: "Products",
      path: "/products",
      products,
      isLoggedIn,
      isAdmin,
    });
  } catch (err) {
    res.redirect("/");
  }
  return;
};

exports.GetProduct = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    res.status(200);
    res.render("pages/shop/product-details", {
      pageTitle: `${product ? product.title : "error"}`,
      product: product,
      path: "/product",
      isLoggedIn: req.session.isLoggedIn || false,
      isAdmin: req.session.isAdmin || false,
    });
  } catch (err) {
    res.redirect("/");
  }
  return;
};

exports.GetIndex = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200);
    res.render("pages/shop/index", {
      pageTitle: "Shop",
      products,
      path: "/",
      isLoggedIn: req.session.isLoggedIn || false,
      isAdmin: req.session.isAdmin || false,
    });
  } catch (err) {
    res.redirect("/");
  }
  return;
};

exports.PostCart = async (req, res, next) => {
  const { productId, productPrice } = req.body;
  try {
    const selectedProduct = await Product.findById(productId);
    await req.user.addToCart(selectedProduct);
    res.status(200);
    res.redirect("/cart");
  } catch (err) {
    return err;
  }
};

exports.GetCart = async (req, res, next) => {
  try {
    let user = await req.user.populate("cart.items.product_id").execPopulate();
    cart = {};
    cart.total_price = user.cart.total_price;
    cart.items = [];

    user.cart.items.forEach((item) => {
      const updatedItem = {
        quantity: item.quantity,
        ...item.product_id._doc,
        _id: item._id,
      };
      cart.items.push(updatedItem);
    });
    res.status(200);
    res.render("pages/shop/cart", {
      cart,
      pageTitle: "Your Cart",
      path: "/cart",
      isLoggedIn: req.session.isLoggedIn || false,
      isAdmin: req.session.isAdmin || false,
    });
  } catch (err) {
    return err
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
    await req.user.createOrder();
    res.redirect("/orders");
  } catch (err) {
    res.redirect("/cart");
  }
};

exports.GetOrders = async (req, res, next) => {
  try {
    const user = await req.user.populate("orders.order_id").execPopulate();

    orders = [];

    user.orders.forEach((order) => {
      const updatedOrder = {
        ...order.order_id._doc,
        _id: order._id,
      };
      orders.push(updatedOrder);
    });

    res.status(200);
    res.render("pages/shop/orders", {
      orders,
      pageTitle: "Orders",
      path: "/orders",
      isLoggedIn: req.session.isLoggedIn || false,
      isAdmin: req.session.isAdmin || false,
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
    isLoggedIn: req.session.isLoggedIn || false,
    isAdmin: req.session.isAdmin || false,
  });
};
