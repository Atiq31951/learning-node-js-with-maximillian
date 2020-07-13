const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = require("./Product");

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
        },
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
    return acc + curr.price * curr.quantity;
  }, 0);
  this.cart = updatedCart;
  try {
    this.save();
  } catch (err) {
    console.log("Error occured ===> ", err);
    return err;
  }
};

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
