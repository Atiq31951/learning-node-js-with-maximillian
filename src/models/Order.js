const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: new Date(),
  },
  status: {
    type: Number,
    required: true,
    default: 0,
  },
  total_price: {
    type: Number,
    required: true,
    default: 0.0,
  },
  items: [
    {
      product_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image_url: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Order", OrderSchema);
