const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  wid: {
    type: Number,
    unique: true
  },
  uid: {
    type: Number,
    required: true
  },
  pid: {
    type: Number,
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Wishlist", wishlistSchema);