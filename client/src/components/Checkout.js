import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import "./Checkout.css";

const Checkout = () => {

  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [total, setTotal] = useState(0);

  // ================= LOAD CHECKOUT =================
  const loadCheckout = async () => {

    try {

      // 🔐 Check user session
      const userRes = await axios.get("/api/user/check-session", {
        withCredentials: true
      });

      if (!userRes.data.loggedIn) return;

      const u = userRes.data.user;

      setName(u.uname || "");
      setPhone(u.phone || "");
      setAddress(u.address || "");

      // 🛒 Get cart
      const cartRes = await axios.get("/api/cart/user", {
        withCredentials: true
      });

      const cart = cartRes.data;

      // 🔥 Fetch product details using pid
      const cartWithProducts = await Promise.all(

        cart.map(async (item) => {

          try {

            const productRes = await axios.get(
              `/api/product/${item.pid}`
            );

            return {
              ...item,
              product: productRes.data
            };

          } catch (err) {

            console.error("Product fetch error:", err);

            return {
              ...item,
              product: null
            };

          }

        })

      );

      setCartItems(cartWithProducts);

      // 💰 Calculate total
      const grandTotal = cartWithProducts.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );

      setTotal(grandTotal);

    } catch (err) {

      console.error("Checkout load error:", err);

    }

  };

  useEffect(() => {
    loadCheckout();
  }, []);


  // ================= PLACE ORDER =================
  const placeOrder = () => {

    if (!phone || !address) {
      alert("Please fill delivery details");
      return;
    }

    alert("Order placed successfully!");

  };


  return (

    <div className="checkout-container">

      <h2>Checkout</h2>

      <div className="checkout-grid">

        {/* ================= DELIVERY DETAILS ================= */}

        <div className="checkout-left">

          <h3>Delivery Details</h3>

          <label>Name</label>
          <input type="text" value={name} readOnly />

          <label>Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label>Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button
            className="place-order-btn"
            onClick={placeOrder}
          >
            Place Order
          </button>

        </div>


        {/* ================= ORDER SUMMARY ================= */}

        <div className="checkout-right">

          <h3>Order Summary</h3>

          {cartItems.map((item) => (

            <div key={item.aid} className="summary-item">

              <img
                src={
                  item.product?.images?.length
                    ? `http://localhost:5000/uploads/${item.product.images[0]}`
                    : "https://dummyimage.com/80x80/cccccc/000000&text=No+Image"
                }
                alt={item.product?.pname}
                className="cart-img"
              />

              <div className="summary-info">

                <p>{item.product?.pname || "Product not found"}</p>

                <small>
                  ₹{item.product?.price} × {item.qty}
                </small>

              </div>

              <span>₹{item.totalPrice}</span>

            </div>

          ))}

          <hr />

          <div className="summary-total">
            <strong>Total</strong>
            <strong>₹{total}</strong>
          </div>

        </div>

      </div>

    </div>

  );

};

export default Checkout;