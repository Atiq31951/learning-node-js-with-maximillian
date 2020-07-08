const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "src",
  "data",
  "cart.json"
);

class Cart {
  static addProducts(id, productPrice) {
    fs.readFile(p, (error, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!error) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct = null;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        ++updatedProduct.qty;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice
        ? cart.totalPrice + Number(productPrice)
        : 0 + Number(productPrice);
      console.log("Cart", cart);
      fs.writeFile(p, JSON.stringify(cart), (error) => {
        if (error) {
          console.log("Something error happened", error);
        }
      });
    });
  }
}

module.exports = Cart;
