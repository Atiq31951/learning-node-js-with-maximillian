const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = require('./Product');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact_number: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: Number,
    required: false,
    default: 5,
  },
  cart: {
    items: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
          require: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          require: true,
        },
        price: {
          type: Number,
          require: true,
        }
      },
    ],
    total_price: {
      type: Number,
      default: 0,
      required: false,
    },
  },
});


// Cart releted functionlities
UserSchema.methods.addToCart = async function (product) {
  const cartProductIndex = this.cart.items.findIndex(
    (cp) => cp.product_id.toString() === product._id.toString()
  );

  const updatedCart = { ...this.cart };

  if (cartProductIndex >= 0) {
    updatedCart.items[cartProductIndex].quantity++;
  } else {
    const itemObject = {
      product_id: product._id,
      price: product.price,
      quantity: 1,
    };
    updatedCart.items.push(itemObject);
  }

  updatedCart.total_price = updatedCart.items.reduce((acc, curr, index) => {
    return acc + (curr.price * curr.quantity);
  }, 0);
  this.cart = updatedCart;
  try {
    this.save();
  } catch (err) {
    console.log("Error occured ===> ", err);
    return err;
  }
}


  UserSchema.methods.updateCart = async function (product_id, updatedQuantity) {
    const cartProductIndex = this.cart.items.findIndex(
      (cp) => cp._id.toString() === product_id.toString()
    );
    const updatedCart = { ...this.cart };

    if (updatedQuantity > 0) {
      this.cart.items[cartProductIndex].quantity = updatedQuantity;
    } else {
      this.cart.items.splice(cartProductIndex, 1);
    }

    this.cart.total_price = updatedCart.items.reduce((acc, curr, index) => {
      return acc + curr.price * curr.quantity;
    }, 0);
    try {
      // cart.items = updatedCart.items
      this.save();
    } catch (err) {
      console.log("Error occured ===> ", err);
      return err;
    }
  };


module.exports = mongoose.model("Users", UserSchema);

// class User {
//   constructor(userName, email, password, contactNumber, role, id, cart) {
//     this.user_name = userName;
//     this.email = email;
//     this.contact_number = contactNumber;
//     this.password = password;
//     this.role = role;
//     this._id = id ? new mongoDb.ObjectId(id) : null;
//     this.cart = cart.items ? cart : { items: [], total_price: 0.0 };
//   }

//   // User specific functionalities

//   save = async () => {
//     const DB = getDB();
//     try {
//       return await DB.collection("users").insertOne(this);
//     } catch (err) {
//       return err;
//     }
//   };

//   static async fetchAll() {
//     const DB = getDB();
//     try {
//       return await DB.collection("users").find().toArray();
//     } catch (err) {
//       return err;
//     }
//   }

//   static async fetchSingle(userId) {
//     const DB = getDB();
//     try {
//       const user = await DB.collection("users")
//         .find({ _id: new mongoDb.ObjectId(userId) })
//         .next();
//       return user;
//     } catch (err) {
//       return err;
//     }
//   }

//   async updateUser() {
//     const DB = getDB();
//     try {
//       await DB.collection("users").updateOne(
//         {
//           _id: this._id,
//         },
//         {
//           $set: this,
//         }
//       );
//     } catch (err) {
//       console.log("Err", err);
//       return err;
//     }
//   }

//   static async deleteUser(userId) {
//     const DB = getDB();
//     try {
//       return await DB.collection("users").deleteOne({
//         _id: new mongoDB.ObjectId(userId),
//       });
//     } catch (error) {
//       return error;
//     }
//   }

//   // Cart releted functionlities
//   async addToCart(product) {
//     const DB = getDB();
//     const cartProductIndex = this.cart.items.findIndex(
//       (cp) => cp._id.toString() === product._id.toString()
//     );
//     const updatedCart = { ...this.cart };
//     if (cartProductIndex >= 0) {
//       updatedCart.items[cartProductIndex].quantity++;
//     } else {
//       updatedCart.items.push({
//         _id: product._id,
//         price: product.price,
//         quantity: 1,
//       });
//     }

//     updatedCart.total_price = updatedCart.items.reduce((acc, curr, index) => {
//       return acc + curr.price * curr.quantity;
//     }, 0);
//     try {
//       await DB.collection("users").updateOne(
//         { _id: this._id },
//         {
//           $set: { ...this, cart: updatedCart },
//         }
//       );
//     } catch (err) {
//       console.log("Error occured ===> ", err);
//       return err;
//     }
//   }

//   async getCart() {
//     const DB = getDB();
//     const productIds = this.cart.items.map((item) => item._id) || [];
//     try {
//       const products = await DB.collection("products")
//         .find({ _id: { $in: productIds } })
//         .toArray();
//       products.map((item, index) => {
//         item.quantity = this.cart.items[index].quantity;
//       });
//       return {
//         items: products,
//         total_price: this.cart.total_price,
//         total_product: this.cart.items.reduce((acc, curr) => {
//           return acc + curr.quantity;
//         }, 0),
//       };
//     } catch (err) {
//       return err;
//     }
//   }

//   async updateCart(product_id, updatedQuantity) {
//     const DB = getDB();
//     const cartProductIndex = this.cart.items.findIndex(
//       (cp) => cp._id.toString() === product_id.toString()
//     );
//     const updatedCart = { ...this.cart };

//     if (updatedQuantity > 0) {
//       updatedCart.items[cartProductIndex].quantity = updatedQuantity;
//     } else {
//       updatedCart.items.splice(cartProductIndex, 1);
//     }

//     updatedCart.total_price = updatedCart.items.reduce((acc, curr, index) => {
//       return acc + curr.price * curr.quantity;
//     }, 0);
//     try {
//       await DB.collection("users").updateOne(
//         { _id: this._id },
//         {
//           $set: { ...this, cart: updatedCart },
//         }
//       );
//     } catch (err) {
//       console.log("Error occured ===> ", err);
//       return err;
//     }
//   }

//   // Order related functionalities
//   async AddOrder() {
//     const DB = getDB();
//     let cartToBeInserted = { items: [], total_price: 0.0 };
//     try {
//       const itemIds = this.cart.items.map((item) => item._id);
//       const products = await DB.collection("products")
//         .find({ _id: { $in: itemIds } })
//         .toArray();
//       this.cart.items.forEach((item, index) => {
//         cartToBeInserted.items.push({
//           ...item,
//           ...products[index],
//         });
//       });
//       cartToBeInserted = {
//         ...cartToBeInserted,
//         total_price: this.cart.total_price,
//         user: {
//           _id: this._id,
//           name: this.user_name,
//           email: this.email,
//           contact_number: this.contact_number,
//         },
//         status: 1,
//       };
//       await DB.collection("orders").insertOne({ ...cartToBeInserted });
//       await DB.collection("users").updateOne(
//         { _id: this._id },
//         {
//           $set: {
//             cart: {},
//           },
//         }
//       );
//     } catch (err) {
//       console.log("Errr ===> ", err);
//     }
//   }

//   async GetOrders() {
//     const DB = getDB();
//     try {
//       const orders = await DB.collection("orders")
//         .find({ 'user._id': this._id })
//         .toArray();
//       return orders;
//     } catch (err) {
//       console.log("Error ==> ", err)
//     }
//   }
// }

// module.exports = User;
