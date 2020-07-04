const Products = [];

module.exports.AddProduct = (productObject) => {
  productObject.id = Math.random(7) + new Date().getMilliseconds();
  Products.push(productObject);
};

module.exports.DeleteProduct = (id) => {
  Products.forEach((product, index) => {
    if (product.id === id) {
      Products.splice(index, 1);
      return;
    }
  });
  return Products;
};

module.exports.UpdateProduct = (id, changedObject) => {
  Products.forEach((product, index) => {
    if (product.id === id) {
      Products[index] = changedObject;
      return;
    }
  });
  return Products;
};

module.exports.GetProducts = () => {
  return Products;
};
