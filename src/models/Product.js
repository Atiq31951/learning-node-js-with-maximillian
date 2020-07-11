const { getDB } = require("../utils/database");

const mongoDB = require("mongodb");

class Product {
  constructor(title, price, imageUrl, description, id) {
    this.title = title;
    this.price = price;
    this.image_url = imageUrl;
    this.description = description;
    this._id = id ? new mongoDB.ObjectId(id) : null;
  }

  save = async () => {
    const DB = getDB();
    try {
      return await DB.collection("products").insertOne(this);
    } catch (err) {
      return err;
    }
  };

  static async fetchAll() {
    const DB = getDB();
    try {
      return await DB.collection("products").find().toArray();
    } catch (err) {
      return err;
    }
  }

  static async fetchSingle(productId) {
    const DB = getDB();
    try {
      const product = await DB.collection("products")
        .find({ _id: new mongoDB.ObjectId(productId) })
        .next();
      return product;
    } catch (err) {
      return err;
    }
  }

  async updateProduct() {
    const DB = getDB();
    try {
      await DB.collection("products").updateOne(
        {
          _id: this._id,
        },
        {
          $set: this,
        }
      );
    } catch (err) {
      console.log("Err", err);
      return err;
    }
  }

  static async deleteProduct(productId) {
    const DB = getDB();
    try {
      return await DB.collection('products').deleteOne({ _id: new mongoDB.ObjectId(productId) });
    } catch (error) {
      return error;
    }
  }
}

module.exports = Product;
