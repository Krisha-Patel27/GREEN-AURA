import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import "./AddToCart.css";

function AddToCart() {

  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  // ================= CHECK SESSION =================
  const fetchUser = async () => {
    try {

      const res = await axios.get("/api/user/check-session", {
        withCredentials: true
      });

      if (res.data.loggedIn) {
        setUser(res.data.user);
      } else {
        navigate("/user-login");
      }

    } catch (err) {
      console.error("Session error:", err);
    }
  };


  // ================= FETCH CART + PRODUCTS =================
  const fetchCart = async () => {

    try {

      const res = await axios.get("/api/cart/user", {
        withCredentials: true
      });

      const cart = res.data;

      // 🔥 Fetch product for each cart item
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

    } catch (err) {

      console.error("Cart load error:", err);

    }

  };


  // ================= PAGE LOAD =================
  useEffect(() => {
    fetchUser();
  }, []);


  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);


  // ================= CHANGE QUANTITY =================
  const changeQty = async (item, delta) => {

    const newQty = Math.max(1, item.qty + delta);
    const newTotal = newQty * item.product.price;

    try {

      await axios.put(
        `/api/cart/update/${item.aid}`,
        {
          qty: newQty,
          totalPrice: newTotal
        },
        { withCredentials: true }
      );

      setCartItems(prev =>
        prev.map(cart =>
          cart.aid === item.aid
            ? { ...cart, qty: newQty, totalPrice: newTotal }
            : cart
        )
      );

    } catch (err) {

      console.error("Qty update error:", err);

    }

  };


  // ================= REMOVE ITEM =================
  const removeItem = async (aid) => {

    try {

      await axios.delete(`/api/cart/remove/${aid}`, {
        withCredentials: true
      });

      setCartItems(prev =>
        prev.filter(item => item.aid !== aid)
      );

    } catch (err) {

      console.error("Remove error:", err);

    }

  };


  // ================= GRAND TOTAL =================
  const grandTotal = cartItems.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );


  return (

    <div className="cart-container container">

      <h2 className="cart-title">🛒 Your Cart</h2>


      {cartItems.length === 0 ? (

        <div className="empty-cart">

          <h3>Your cart is empty</h3>

          <button
            className="continue-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>

        </div>

      ) : (

        <div className="row">

          {/* ================= CART ITEMS ================= */}
          <div className="col-md-8">

            {cartItems.map((item) => (

              <div key={item.aid} className="cart-item">

                <img
                  src={`http://localhost:5000/uploads/${item.product?.images?.[0]}`}
                  alt={item.product?.pname}
                  className="cart-img"
                />

                <div className="cart-info">

                  <h5>{item.product?.pname}</h5>

                  <p className="cart-price">
                    ₹{item.product?.price}
                  </p>

                  <div className="qty-box">

                    <button
                      onClick={() => changeQty(item, -1)}
                    >
                      −
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() => changeQty(item, 1)}
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.aid)}
                  >
                    Remove
                  </button>

                </div>

                <div className="cart-total">

                  ₹{item.totalPrice}

                </div>

              </div>

            ))}

          </div>



          {/* ================= ORDER SUMMARY ================= */}
          <div className="col-md-4">

            <div className="cart-summary">

              <h4>Order Summary</h4>

              <div className="summary-row">
                <span>Total Items</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="summary-row">
                <span>Grand Total</span>
                <span>₹{grandTotal}</span>
              </div>

              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                Proceed To Checkout
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default AddToCart;