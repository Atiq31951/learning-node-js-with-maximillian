const mongoDb = require("mongodb");
const { getDB } = require("../utils/database");
const { use } = require("../routes/admin");

class User {
  constructor(userName, email, password, phoneNumber, role, id, cart) {
    this.user_name = userName;
    this.email = email;
    this.contact_number = phoneNumber;
    this.password = password;
    this.role = role;
    this._id = id ? new mongoDb.ObjectId(id) : null;
    this.cart = cart.items ? cart : { items: [], total_price: 0.0 };
  }

  // User specific functionalities

  save = async () => {
    const DB = getDB();
    try {
      return await DB.collection("users").insertOne(this);
    } catch (err) {
      return err;
    }
  };

  static async fetchAll() {
    const DB = getDB();
    try {
      return await DB.collection("users").find().toArray();
    } catch (err) {
      return err;
    }
  }

  static async fetchSingle(userId) {
    const DB = getDB();
    try {
      const user = await DB.collection("users")
        .find({ _id: new mongoDb.ObjectId(userId) })
        .next();
      return user;
    } catch (err) {
      return err;
    }
  }

  async updateUser() {
    const DB = getDB();
    try {
      await DB.collection("users").updateOne(
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

  static async deleteUser(userId) {
    const DB = getDB();
    try {
      return await DB.collection("users").deleteOne({
        _id: new mongoDB.ObjectId(userId),
      });
    } catch (error) {
      return error;
    }
  }

  // Cart releted functionlities
  async addToCart(product) {
    const DB = getDB();
    const cartProductIndex = this.cart.items.findIndex(
      (cp) => cp._id.toString() === product._id.toString()
    );
    const updatedCart = { ...this.cart };
    if (cartProductIndex >= 0) {
      updatedCart.items[cartProductIndex].quantity++;
    } else {
      updatedCart.items.push({
        _id: product._id,
        price: product.price,
        quantity: 1,
      });
    }

    updatedCart.total_price = updatedCart.items.reduce((acc, curr, index) => {
      return acc + curr.price * curr.quantity;
    }, 0);
    try {
      await DB.collection("users").updateOne(
        { _id: this._id },
        {
          $set: { ...this, cart: updatedCart },
        }
      );
    } catch (err) {
      console.log("Error occured ===> ", err);
      return err;
    }
  }

  // Order related functionalities
}

module.exports = User;
