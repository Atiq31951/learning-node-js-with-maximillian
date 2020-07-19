const Product = require("../models/Product");
const { ObjectID } = require("mongodb");

module.exports.GetAddProduct = (req, res, next) => {
  res.status(200);
  res.render("pages/admin/add-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    isLoggedIn: req.session.isLoggedIn,
    isAdmin: req.session.isAdmin
  });
};

module.exports.PostAddProduct = async (req, res, next) => {
  const { title, image_url, price, description } = req.body;
  try {
    const product = new Product({
      title,
      price: Number(price),
      image_url,
      description,
      owner_id: req.user._id,
    });
    await product.save();
    res.status(200);
    res.redirect("/admin/products");
  } catch (err) {
    res.redirect("/admin/add-product");
  }
  return;
};

module.exports.GetProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200);
    res.render("pages/admin/products", {
      pageTitle: "Admin Products",
      path: "/admin/products",
      products,
      isLoggedIn: req.session.isLoggedIn,
      isAdmin: req.session.isAdmin,
    });
  } catch (err) {
    res.redirect("/");
  }
  return;
};

module.exports.GetProductToEdit = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.redirect("/");
    }
    const { edit } = req.query;
    res.render("pages/admin/edit-product", {
      pageTitle: `${product ? "Edit Product" : "error"}`,
      product: product,
      path: "/edit-product",
      isLoggedIn: req.session.isLoggedIn,
      isAdmin: req.session.isAdmin,
    });
  } catch (err) {
    res.redirect("/pages/error");
  }
};

module.exports.PostUpdateProduct = async (req, res, next) => {
  const { productId } = req.params;
  const { title, image_url, price, description } = req.body;
  try {
    let product = await Product.findById(productId);
    product.title = title;
    product.image_url = image_url;
    product.price = price;
    product.description = description;

    await product.save();
    res.redirect("/admin/products");
  } catch (err) {
    res.redirect("/");
  }
};

module.exports.PostDeleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    await Product.findByIdAndDelete(productId);
    res.redirect("/admin/products");
  } catch (error) {
    res.redirect("/");
  }
};
