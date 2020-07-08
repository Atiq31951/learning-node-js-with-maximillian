const Products = [];

module.exports.AddProduct = (productObject) => {
  productObject.id = (
    Number.parseInt(Math.random(7) * 1000) + new Date().getTime()
  ).toString();
  Products.push(productObject);
};

module.exports.DeleteProduct = (id) => {
  Products.forEach((product, index) => {
    if (product.id === id) {
      Products.splice(index, 1);
      return;
    }
  });
};

module.exports.GetProducts = () => {
  return Products;
};

module.exports.GetProduct = (productId) => {
  return Products.find((product) => product.id === productId) || null;
};

module.exports.UpdateProduct = (productId, newProductObject) => {
  const index = Products.findIndex((product) => product.id === productId);
  if (Products[index]) {
    Products[index] = newProductObject;
  }
};
