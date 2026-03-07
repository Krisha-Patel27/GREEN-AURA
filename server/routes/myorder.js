// // const express = require("express");
// // const router = express.Router();
// // const Razorpay = require("razorpay");
// // const MyOrder = require("../models/MyOrder");

// // // Razorpay instance
// // const razorpay = new Razorpay({
// //   key_id: process.env.RAZORPAY_KEY_ID,
// //   key_secret: process.env.RAZORPAY_KEY_SECRET,
// // });

// // /**
// //  * @route   POST /api/myOrder/create
// //  * @desc    Create order & return Razorpay order info
// //  */
// // router.post("/create", async (req, res) => {
// //   try {
// //     const { uid, pid, qty, totalPrice, address, phone } = req.body;

// //     // 1️⃣ Save order in DB with status "pending"
// //     const order = new MyOrder({
// //       uid,
// //       pid,
// //       qty,
// //       totalPrice,
// //       address,
// //       phone,
// //     });
// //     await order.save();

// //     // 2️⃣ Create Razorpay order
// //     const options = {
// //       amount: totalPrice * 100, // in paise
// //       currency: "INR",
// //       receipt: order.oid.toString(), // use auto-increment oid
// //     };
// //     const razorpayOrder = await razorpay.orders.create(options);

// //     // 3️⃣ Send Razorpay order details to frontend
// //     res.json({
// //       success: true,
// //       oid: order.oid,
// //       razorpayOrderId: razorpayOrder.id,
// //       amount: razorpayOrder.amount,
// //       currency: razorpayOrder.currency,
// //     });
// //   } catch (error) {
// //     console.error("Order creation error:", error);
// //     res.status(500).json({ success: false, message: "Order creation failed" });
// //   }
// // });

// // /**
// //  * @route   POST /api/myOrder/verify
// //  * @desc    Update order after successful payment
// //  */
// // router.post("/verify", async (req, res) => {
// //   try {
// //     const { oid, paymentId } = req.body;

// //     const order = await MyOrder.findOneAndUpdate(
// //       { oid },
// //       {
// //         paymentId,
// //         ostatus: "delivered", // or keep "pending" if you ship later
// //       },
// //       { new: true }
// //     );

// //     if (!order) return res.status(404).json({ success: false, message: "Order not found" });

// //     res.json({ success: true, message: "Payment verified & order updated", order });
// //   } catch (error) {
// //     console.error("Payment verification error:", error);
// //     res.status(500).json({ success: false, message: "Verification failed" });
// //   }
// // });

// // /**
// //  * @route   GET /api/myOrder/:uid
// //  * @desc    Get all orders of a user
// //  */
// // router.get("/:uid", async (req, res) => {
// //   try {
// //     const uid = Number(req.params.uid);
// //     const orders = await MyOrder.find({ uid }).sort({ createdAt: -1 });
// //     res.json({ success: true, orders });
// //   } catch (error) {
// //     console.error("Get orders error:", error);
// //     res.status(500).json({ success: false, message: "Failed to fetch orders" });
// //   }
// // });

// // /**
// //  * @route   GET /api/myOrder/details/:oid
// //  * @desc    Get order details by oid
// //  */
// // router.get("/details/:oid", async (req, res) => {
// //   try {
// //     const oid = Number(req.params.oid);
// //     const order = await MyOrder.findOne({ oid });
// //     if (!order) return res.status(404).json({ success: false, message: "Order not found" });
// //     res.json({ success: true, order });
// //   } catch (error) {
// //     console.error("Get order details error:", error);
// //     res.status(500).json({ success: false, message: "Failed to fetch order details" });
// //   }
// // });

// // /**
// //  * @route   PUT /api/myOrder/status/:oid
// //  * @desc    Update order status (e.g., pending -> delivered)
// //  */
// // router.put("/status/:oid", async (req, res) => {
// //   try {
// //     const oid = Number(req.params.oid);
// //     const { ostatus } = req.body;

// //     const order = await MyOrder.findOneAndUpdate(
// //       { oid },
// //       { ostatus },
// //       { new: true }
// //     );
// //     if (!order) return res.status(404).json({ success: false, message: "Order not found" });

// //     res.json({ success: true, message: "Order status updated", order });
// //   } catch (error) {
// //     console.error("Update status error:", error);
// //     res.status(500).json({ success: false, message: "Failed to update order status" });
// //   }
// // });

// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const Razorpay = require("razorpay");
// const MyOrder = require("../models/MyOrder");

// // Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// /**
//  * @route   POST /api/myOrder/create
//  * @desc    Create order & return Razorpay order info
//  */
// router.post("/create", async (req, res) => {
//   try {
//     const { uid, pid, qty, totalPrice, address, phone } = req.body;

//     // 1️⃣ Save order in DB with status "pending"
//     const order = new MyOrder({
//       uid,
//       pid,
//       qty,
//       totalPrice,
//       address,
//       phone,
//     });
//     await order.save();

//     // 2️⃣ Create Razorpay order
//     const options = {
//       amount: totalPrice * 100, // in paise
//       currency: "INR",
//       receipt: order.oid.toString(), // use auto-increment oid
//     };
//     const razorpayOrder = await razorpay.orders.create(options);

//     // 3️⃣ Send Razorpay order details to frontend
//     res.json({
//       success: true,
//       oid: order.oid,
//       razorpayOrderId: razorpayOrder.id,
//       amount: razorpayOrder.amount,
//       currency: razorpayOrder.currency,
//     });
//   } catch (error) {
//     console.error("Order creation error:", error);
//     res.status(500).json({ success: false, message: "Order creation failed" });
//   }
// });

// /**
//  * @route   POST /api/myOrder/verify
//  * @desc    Update order after successful payment
//  */
// router.post("/verify", async (req, res) => {
//   try {
//     const { oid, paymentId } = req.body;

//     const order = await MyOrder.findOneAndUpdate(
//       { oid },
//       {
//         paymentId,
//         ostatus: "delivered", // or keep "pending" if you ship later
//       },
//       { new: true }
//     );

//     if (!order) return res.status(404).json({ success: false, message: "Order not found" });

//     res.json({ success: true, message: "Payment verified & order updated", order });
//   } catch (error) {
//     console.error("Payment verification error:", error);
//     res.status(500).json({ success: false, message: "Verification failed" });
//   }
// });

// /**
//  * @route   GET /api/myOrder/:uid
//  * @desc    Get all orders of a user
//  */
// router.get("/:uid", async (req, res) => {
//   try {
//     const uid = Number(req.params.uid);
//     const orders = await MyOrder.find({ uid }).sort({ createdAt: -1 });
//     res.json({ success: true, orders });
//   } catch (error) {
//     console.error("Get orders error:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch orders" });
//   }
// });

// /**
//  * @route   GET /api/myOrder/details/:oid
//  * @desc    Get order details by oid
//  */
// router.get("/details/:oid", async (req, res) => {
//   try {
//     const oid = Number(req.params.oid);
//     const order = await MyOrder.findOne({ oid });
//     if (!order) return res.status(404).json({ success: false, message: "Order not found" });
//     res.json({ success: true, order });
//   } catch (error) {
//     console.error("Get order details error:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch order details" });
//   }
// });

// /**
//  * @route   PUT /api/myOrder/status/:oid
//  * @desc    Update order status (e.g., pending -> delivered)
//  */
// router.put("/status/:oid", async (req, res) => {
//   try {
//     const oid = Number(req.params.oid);
//     const { ostatus } = req.body;

//     const order = await MyOrder.findOneAndUpdate(
//       { oid },
//       { ostatus },
//       { new: true }
//     );
//     if (!order) return res.status(404).json({ success: false, message: "Order not found" });

//     res.json({ success: true, message: "Order status updated", order });
//   } catch (error) {
//     console.error("Update status error:", error);
//     res.status(500).json({ success: false, message: "Failed to update order status" });
//   }
// });

// module.exports = router;