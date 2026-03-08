// import React, { useEffect, useState } from "react";
// import axios from "../axiosConfig";
// import { useNavigate } from "react-router-dom";
// import "./Wishlist.css";

// function Wishlist() {
//   const [products, setProducts] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // ================= GET LOGGED-IN USER =================
//   const fetchUserSession = async () => {
//     try {
//       const res = await axios.get("/api/user/check-session", { withCredentials: true });
//       if (res.data.loggedIn) {
//         setUser(res.data.user);
//       } else {
//         setUser(null);
//       }
//     } catch (err) {
//       console.error("Session check error:", err);
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     fetchUserSession();
//   }, []);

//   // ================= LOAD WISHLIST =================
//   const loadWishlist = async () => {
//     if (!user) return;

//     try {
//       const res = await axios.get("/api/wishlist/user", { withCredentials: true });
//       const pids = res.data.map((item) => item.pid);
//       setWishlist(pids);

//       // Fetch product details
//       const productRequests = pids.map((pid) => axios.get(`/api/product/${pid}`));
//       const responses = await Promise.all(productRequests);
//       const productData = responses.map((r) => r.data);
//       setProducts(productData);
//     } catch (err) {
//       console.error("Wishlist load error:", err);
//       setProducts([]);
//       setWishlist([]);
//     }
//   };

//   useEffect(() => {
//     loadWishlist();
//   }, [user]);

//   // ================= REMOVE FROM WISHLIST =================
//   const removeFromWishlist = async (pid) => {
//     try {
//       await axios.delete(`/api/wishlist/remove/${pid}`, { withCredentials: true });
//       setWishlist(wishlist.filter((id) => id !== pid));
//       setProducts(products.filter((p) => p.pid !== pid));
//       window.dispatchEvent(new Event("wishlistUpdated"));
//     } catch (err) {
//       console.error("Remove from wishlist error:", err);
//       alert("Failed to remove from wishlist");
//     }
//   };

//   if (!user) return <p>Please login to view your wishlist.</p>;

//   return (
//     <div className="wishlist-container">
//       <h2 className="wishlist-title">❤️ My Wishlist</h2>

//       {products.length === 0 ? (
//         <div className="wishlist-empty">
//           <h3>Your wishlist is empty</h3>
//           <button onClick={() => navigate("/")} className="wishlist-shop-btn">
//             Continue Shopping
//           </button>
//         </div>
//       ) : (
//         <div className="wishlist-grid">
//           {products.map((product) => (
//             <div key={product.pid} className="wishlist-card">
//               <div className="wishlist-remove" onClick={() => removeFromWishlist(product.pid)}>
//                 ❌
//               </div>

//               <img
//                 src={`http://localhost:5000/uploads/${product.images?.[0]}`}
//                 alt={product.pname}
//                 onClick={() => navigate(`/productdetail/${product.pid}`)}
//               />

//               <h4>{product.pname}</h4>
//               <div className="wishlist-price">₹{product.price}</div>

//               <button
//                 className="wishlist-view-btn"
//                 onClick={() => navigate(`/productdetail/${product.pid}`)}
//               >
//                 View Product
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Wishlist;

import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import "./Wishlist.css";

function Wishlist() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  // ================= GET USER SESSION =================
  const fetchUserSession = async () => {
    try {
      const res = await axios.get("/api/user/check-session", { withCredentials: true });
      if (res.data.loggedIn) {
        setUser(res.data.user);
      } else {
        navigate("/user-login");
      }
    } catch (err) {
      console.error("Session error:", err);
      navigate("/user-login");
    }
  };

  useEffect(() => {
    fetchUserSession();
  }, []);

  // ================= LOAD WISHLIST =================
  const loadWishlist = async () => {
    if (!user) return;

    try {
      const res = await axios.get("/api/wishlist/user", { withCredentials: true });
      const pids = res.data.map((item) => item.pid);
      setWishlist(pids);

      // Fetch full product details
      const productRequests = pids.map((pid) => axios.get(`/api/product/${pid}`));
      const responses = await Promise.all(productRequests);
      const productData = responses.map((r) => r.data);
      setProducts(productData);
    } catch (err) {
      console.error("Wishlist load error:", err);
      setProducts([]);
      setWishlist([]);
    }
  };

  useEffect(() => {
    if (user) loadWishlist();
  }, [user]);

  // ================= REMOVE FROM WISHLIST =================
  const removeFromWishlist = async (pid) => {
    try {
      await axios.delete(`/api/wishlist/remove/${pid}`, { withCredentials: true });
      setWishlist(wishlist.filter((id) => id !== pid));
      setProducts(products.filter((p) => p.pid !== pid));

      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (err) {
      console.error("Remove from wishlist error:", err);
      alert("Failed to remove product from wishlist");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">❤️ My Wishlist</h2>

      {products.length === 0 ? (
        <div className="wishlist-empty">
          <h3>Your wishlist is empty</h3>
          <button className="wishlist-shop-btn" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {products.map((product) => (
            <div key={product.pid} className="wishlist-card">
              <div className="wishlist-remove" onClick={() => removeFromWishlist(product.pid)}>
                ❌
              </div>

              <img
                src={`http://localhost:5000/uploads/${product.images?.[0]}`}
                alt={product.pname}
                onClick={() => navigate(`/productdetail/${product.pid}`)}
              />

              <h4>{product.pname}</h4>
              <div className="wishlist-price">₹{product.price}</div>

              <div
                className="wishlist-heart"
                onClick={() => removeFromWishlist(product.pid)}
                style={{ fontSize: "24px", color: "red", cursor: "pointer" }}
              >
                ❤️
              </div>

              <button
                className="wishlist-view-btn"
                onClick={() => navigate(`/productdetail/${product.pid}`)}
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;