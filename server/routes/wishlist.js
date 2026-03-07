// const express = require("express");
// const router = express.Router();
// const Wishlist = require("../models/Wishlist");
// const Counter = require("../models/Counter");


// // AUTO INCREMENT FUNCTION
// async function getNextSequence(name) {
//   const counter = await Counter.findOneAndUpdate(
//     { id: name },
//     { $inc: { seq: 1 } },
//     { new: true, upsert: true }
//   );
//   return counter.seq;
// }



// /* ===============================
//    GET USER WISHLIST
// ================================ */
// router.get("/user/:uid", async (req, res) => {
//   try {
//     const uid = Number(req.params.uid);

//     const items = await Wishlist.find({ uid });

//     const pids = items.map(i => i.pid);

//     res.json(pids);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });



// /* ===============================
//    TOGGLE WISHLIST
// ================================ */
// router.post("/toggle", async (req, res) => {
//   try {

//     const { uid, pid } = req.body;

//     const existing = await Wishlist.findOne({ uid, pid });

//     // REMOVE
//     if (existing) {

//       await Wishlist.deleteOne({ uid, pid });

//       return res.json({
//         status: "removed"
//       });

//     }

//     // ADD
//     const wid = await getNextSequence("wishlist");

//     const newItem = new Wishlist({
//       wid,
//       uid,
//       pid
//     });

//     await newItem.save();

//     res.json({
//       status: "added"
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });



// /* ===============================
//    GET FULL WISHLIST PRODUCTS
// ================================ */

// const Product = require("../models/Product");

// router.get("/products/:uid", async (req, res) => {

//   try {

//     const uid = Number(req.params.uid);

//     const items = await Wishlist.find({ uid });

//     const pids = items.map(i => i.pid);

//     const products = await Product.find({
//       pid: { $in: pids }
//     });

//     res.json(products);

//   } catch (err) {

//     console.error(err);
//     res.status(500).json({ error: "Server error" });

//   }

// });


// module.exports = router;

const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");
const Counter = require("../models/Counter"); // 🔹 import counter

// Add to wishlist
router.post("/add/:pid", async (req, res) => {
  try {
    const user = req.session.user;
    if (!user) return res.status(401).json({ message: "Login first" });

    const pid = Number(req.params.pid); // ensure Number
    const product = await Product.findOne({ pid });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const exists = await Wishlist.findOne({ uid: user.uid, pid });
    if (exists) return res.status(400).json({ message: "Already in wishlist" });

    // 🔹 Generate wid using Counter
    const counter = await Counter.findOneAndUpdate(
      { id: "wishlist" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } // create if not exists
    );

    const newItem = new Wishlist({
      wid: counter.seq, // ✅ auto-generated wid
      uid: user.uid,
      pid,
      addedAt: new Date()
    });

    await newItem.save();

    res.json({ message: "Added to wishlist" });
  } catch (err) {
    console.error("WISHLIST ADD ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Remove from wishlist
router.delete("/remove/:pid", async (req, res) => {
  try {
    const user = req.session.user;
    if (!user) return res.status(401).json({ message: "Login first" });

    const pid = Number(req.params.pid);
    await Wishlist.deleteOne({ uid: user.uid, pid });

    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error("WISHLIST REMOVE ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get user's wishlist
router.get("/user", async (req, res) => {
  try {
    const user = req.session.user;
    if (!user) return res.status(401).json({ message: "Login first" });

    const items = await Wishlist.find({ uid: user.uid });
    res.json(items);
  } catch (err) {
    console.error("WISHLIST GET ERROR:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;