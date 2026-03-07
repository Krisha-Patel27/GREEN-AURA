// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const session = require("express-session");

// const app = express();

// const adminRoutes = require("./routes/admin");
// const categoryRoutes = require("./routes/category");
// const productRoutes = require("./routes/product");
// const userRoutes = require("./routes/user");
// const reviewRoutes = require("./routes/review");
// const wishlistRoutes = require("./routes/wishlist");
// const cartRoutes = require("./routes/cart");

// const path = require("path");

// // Middleware
// app.use(cors({
//   origin: "http://localhost:3000",  // React port
//   credentials: true
// }));
// // 🔐 Session Setup
// app.use(session({
//   secret: "greenAuraSecretKey",
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false,   // true only in production https
//     maxAge: 1000 * 60 * 60  // 1 hour
//   }
// }));
// app.use(express.json());
// app.use("/api/user", userRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/category", categoryRoutes);
// app.use("/api/product", productRoutes);
// app.use("/api/review", reviewRoutes);
// app.use("/api/wishlist", wishlistRoutes);
// app.use("/api/cart", cartRoutes);

// // app.use("/uploads", express.static("uploads"));

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));

// // Test Route
// app.get("/", (req, res) => {
//   res.send("Green Aura Server Running");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const session = require("express-session");
const path = require("path");

const app = express();

// Existing routes
const adminRoutes = require("./routes/admin");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const reviewRoutes = require("./routes/review");
const wishlistRoutes = require("./routes/wishlist");
const cartRoutes = require("./routes/cart");

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(session({
  secret: "greenAuraSecretKey",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 }
}));
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Test route
app.get("/", (req, res) => res.send("Green Aura Server Running"));

// ============ Razorpay Integration ============

// Create Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Route: create order
app.post("/api/payment/create-order", async (req, res) => {
  const { amount } = req.body; // amount in rupees
  const options = {
    amount: amount * 100, // convert to paise
    currency: "INR",
    receipt: "receipt_" + Date.now()
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Route: verify payment
app.post("/api/payment/verify-payment", (req, res) => {
  const { order_id, payment_id, signature } = req.body;
  const body = order_id + "|" + payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === signature) {
    res.json({ success: true, message: "Payment Verified" });
  } else {
    res.status(400).json({ success: false, message: "Payment Verification Failed" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));