const Product = require("../models/Product");

module.exports.GetAddProduct = (req, res, next) => {
  res.status(200);
  res.render("pages/admin/add-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
  });
};

module.exports.PostAddProduct = async (req, res, next) => {
  const { title, image_url, price, description } = req.body;
  const product = new Product(title, Number(price), image_url, description);
  try {
    await product.save();
    res.status(200);
    res.redirect("/admin/products");
  } catch (err) {
    console.log("Error occured", err);
    res.render("/pages/admin/add-product");
  }
  return;
};

module.exports.GetProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.status(200);
    res.render("pages/admin/products", {
      pageTitle: "Admin Products",
      path: "/admin/products",
      products,
    });
  } catch (err) {
    res.redirect("/");
  }
  return;
};

module.exports.GetProductToEdit = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Product.fetchSingle(productId);
    if (!product) {
      res.redirect("/");
    }
    const { edit } = req.query;
    res.render("pages/admin/edit-product", {
      pageTitle: `${product ? "Edit Product" : "error"}`,
      product: product,
      path: "/edit-product",
    });
  } catch (err) {
    res.redirect("/pages/error");
  }
};

module.exports.PostUpdateProduct = async (req, res, next) => {
  const { productId } = req.params;
  const { title, image_url, price, description } = req.body;
  const product = new Product(title, Number(price), image_url, description, productId);
  try {
    await product.updateProduct();
    res.redirect("/admin/products");
  } catch (err) {
    res.redirect("/");
  }
};

module.exports.PostDeleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  try {
    await Product.deleteProduct(productId)
    res.redirect("/admin/products");
  } catch (error) {
    res.redirect("/");
  }
};
