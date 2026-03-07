const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  aid: {
    type: Number,
    unique: true,
    required: true
  },
  uid: {
    type: Number,
    ref: "User",
    required: true
  },
  pid: {
    type: String,
    ref: "Product",
    required: true
  },
  qty: {
    type: Number,
    default: 1
  },
  totalPrice: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);