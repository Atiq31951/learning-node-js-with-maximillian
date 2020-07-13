const { getDB } = require("../utils/database");

const mongoDB = require("mongodb");

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ProductScema = new Schema({
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
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  owner_id: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Product", ProductScema);
