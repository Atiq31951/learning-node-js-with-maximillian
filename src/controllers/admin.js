const {
  AddProduct,
  GetProducts,
  GetProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../models/Products");

module.exports.GetAddProduct = (req, res, next) => {
  res.status(200);
  res.render("pages/admin/add-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
  });
};

module.exports.GetProductToEdit = (req, res, next) => {
  const { productId } = req.params;
  const product = GetProduct(productId);
  console.log("productId ==> ", productId, "product ==> ", product);
  const { edit } = req.query;
  console.log('Edit == > ', edit)
  // console.log("Product ===> ", product);
  res.render("pages/admin/edit-product", {
    pageTitle: `${product ? "Edit Product" : "error"}`,
    product: product,
    path: "/edit-product",
  });
};

module.exports.PostUpdateProduct = (req, res, next) => {
  const { productId } = req.params;
  const { title, image_url, price, description } = req.body;
  UpdateProduct(productId, {
    title,
    image_url,
    price,
    description,
  });
  res.redirect("/admin/products");
};

module.exports.PostDeleteProduct = (req, res, next) => {
  const { productId } = req.params
  DeleteProduct(productId)
  res.redirect('/admin/products');
}

module.exports.PostAddProduct = (req, res, next) => {
  const { title, image_url, price, description } = req.body;
  AddProduct({ title, image_url, price, description });
  res.status(200);
  res.redirect("/");
};

module.exports.GetProducts = (req, res, next) => {
  res.status(200);
  res.render("pages/admin/products", {
    pageTitle: "Admin Products",
    path: "/admin/products",
    products: GetProducts(),
  });
};
