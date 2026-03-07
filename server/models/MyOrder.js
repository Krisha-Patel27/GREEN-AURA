// models/MyOrder.js
const mongoose = require("mongoose");
const Counter = require("./Counter");

const myOrderSchema = new mongoose.Schema({
  oid: { type: Number, unique: true },       // auto increment order ID
  uid: { type: Number, required: true },     // user ID as number
  pid: [{ type: String, required: true }],   // array of product IDs
  qty: [{ type: Number, required: true }],   // quantities
  totalPrice: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  ostatus: { type: String, enum: ["pending", "delivered"], default: "pending" },
  paymentId: { type: String },               // Razorpay payment ID
  createdAt: { type: Date, default: Date.now },
});

// Auto-increment oid before save
myOrderSchema.pre("save", async function (next) {
  const doc = this;
  if (doc.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: "myorder" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    doc.oid = counter.seq;
  }
  next();
});

module.exports = mongoose.model("MyOrder", myOrderSchema);