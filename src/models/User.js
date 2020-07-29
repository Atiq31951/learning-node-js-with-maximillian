const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = require("./Order");

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
  orders: [
    {
      order_id: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },
    },
  ],
  active: {
    type: Boolean,
    default: false,
    required: false,
  },
  email_validation_code: {
    type: String,
    required: false,
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
    await this.save();
  } catch (err) {
    console.log("Error in addToCart ", err);
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
    await this.save();
  } catch (err) {
    console.log("Error in updateCart ", err);
    return err;
  }
};

UserSchema.methods.createOrder = async function () {
  const cartUser = this.populate("cart.items");
  const productIds = cartUser.cart.items.map((item) => {
    return item.product_id;
  });
  try {
    const user = await this.populate("cart.items.product_id").execPopulate();
    currentCart = {};
    currentCart.total_price = user.cart.total_price;
    currentCart.items = [];

    user.cart.items.forEach((item, index) => {
      const updatedItem = {
        quantity: item.quantity,
        ...item.product_id._doc,
        product_id: productIds[index],
        _id: item._id,
      };
      currentCart.items.push(updatedItem);
    });
    const order = new Order({
      user_id: user._id,
      created: new Date(),
      stattus: 0,
      total_price: currentCart.total_price,
      items: currentCart.items,
    });
    await order.save();
    this.orders.push({
      order_id: order._id,
    });
    this.cart = {};
    await this.save();
  } catch (err) {
    console.log("Error in createOrder ", err);
  }
};

module.exports = mongoose.model("Users", UserSchema);
