const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Counter = require("../models/Counter");

// ================= ADD TO CART =================
router.post("/add", async (req, res) => {
  try {
    const { uid, pid, qty, totalPrice } = req.body;

    const counter = await Counter.findOneAndUpdate(
      { id: "cartAid" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );

    const newCartItem = new Cart({
      aid: counter.seq,
      uid,
      pid,
      qty,
      totalPrice,
    });

    await newCartItem.save();

    res.status(201).json({
      success: true,
      cart: newCartItem,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to add to cart",
    });
  }
});

// ================= GET USER CART =================
router.get("/user", async (req, res) => {
  try {
    const user = req.session.user;

    if (!user) {
      return res.status(401).json({ message: "User not logged in" });
    }

    const cartItems = await Cart.aggregate([
      {
        $match: { uid: user.uid },
      },
      {
        $lookup: {
          from: "products", // collection name
          localField: "pid",
          foreignField: "pid",
          as: "product",
        },
      },
      {
        $unwind: {
          path: "$product",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cart fetch failed" });
  }
});
// ================= REMOVE ITEM =================
router.delete("/remove/:aid", async (req, res) => {
  try {
    await Cart.deleteOne({ aid: req.params.aid });

    res.json({
      success: true,
      message: "Item removed",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Delete failed",
    });
  }
});

// ================= UPDATE QTY =================
router.put("/update/:aid", async (req, res) => {
  try {
    const { qty, totalPrice } = req.body;

    const updated = await Cart.findOneAndUpdate(
      { aid: req.params.aid },
      { qty, totalPrice },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Update qty error:", err);
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;
