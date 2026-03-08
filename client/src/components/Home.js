// // import React, { useEffect, useState } from "react";
// // import axios from "../axiosConfig";
// // import { useNavigate } from "react-router-dom";
// // import "./Home.css";

// // function Home() {
// //   const [user, setUser] = useState(null);
// //   const [showWelcome, setShowWelcome] = useState(false);
// //   const [categories, setCategories] = useState([]);
// //   const [latestProducts, setLatestProducts] = useState([]);

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const initializeHome = async () => {
// //       try {
// //         const sessionRes = await axios.get("/api/user/check-session");

// //         if (!sessionRes.data.loggedIn) {
// //           navigate("/user-login");
// //           return;
// //         }

// //         setUser(sessionRes.data.user);
// //         localStorage.setItem(
// //           "user",
// //           JSON.stringify(sessionRes.data.user)
// //         );
// //         setShowWelcome(true);
// //         setTimeout(() => setShowWelcome(false), 3000);

// //         const categoryRes = await axios.get("/api/category/all");
// //         setCategories(categoryRes.data);

// //         const productRes = await axios.get("/api/product/latest-eight");
// //         setLatestProducts(productRes.data);
// //       } catch (error) {
// //         console.error("Home error:", error);
// //         navigate("/user-login");
// //       }
// //     };

// //     initializeHome();
// //   }, [navigate]);

// //   return (
// //     <div className="home-container">
// //       {/* ================= WELCOME ================= */}
// //       {showWelcome && (
// //         <div className="welcome-overlay">
// //           <div className="welcome-popup">
// //             <h2>🎉 Welcome {user?.uname}</h2>
// //             <p>We’re glad to have you at Green Aura 🌿</p>
// //           </div>
// //         </div>
// //       )}

// //       {/* ================= FEATURE SECTION ================= */}
// //       <section className="feature-section container">
// //         <h1 className="welcome-title">Welcome To Green Aura</h1>

// //         <div className="row">
// //           {[
// //             { img: "home2.jpg", title: "quality you can trust" },
// //             { img: "home3.jpg", title: "not your average plants" },
// //             { img: "home4.jpg", title: "plant care made simple" },
// //           ].map((item, index) => (
// //             <div className="col-md-4 mb-4" key={index}>
// //               <div className="feature-card">
// //                 <img
// //                   src={`/images/${item.img}`}
// //                   alt={item.title}
// //                   className="feature-img"
// //                 />
// //                 <h3>{item.title}</h3>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* ================= CATEGORIES ================= */}
// //       <section className="shop-category-section container">
// //         <h2 className="shop-title">Explore Green Categories</h2>

// //         <div className="circular-category-wrapper">
// //           {categories.map((cat, index) => {
// //             const images = [
// //               "/images/plant1.jpg",
// //               "/images/seeds.jpg",
// //               "/images/potandplanter.jpg",
// //               "/images/plantcare.jpg",
// //               "/images/gardeningtools.jpg",
// //             ];

// //             return (
// //               <div
// //                 key={cat.cid}
// //                 className="circular-category"
// //                 onClick={() => navigate(`/products/${cat.cid}`)}
// //               >
// //                 <div className="circle-img">
// //                   <img
// //                     src={images[index % images.length]}
// //                     alt={cat.cname}
// //                   />
// //                 </div>
// //                 <h4 className="circle-title">{cat.cname}</h4>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </section>

// //       {/* ================= LATEST PRODUCTS ================= */}
// //       <section className="latest-products-section container">
// //         <h2 className="shop-title">New Arrivals</h2>

// //         <div className="row">
// //           {latestProducts.map((product) => (
// //             <div className="col-md-3 mb-4" key={product.pid}>
// //               <div className="modern-product-card">
// //                 {/* Wishlist */}
// //                 <div className="wishlist-btn hover-only">♡</div>

// //                 {/* IMAGE SLIDER */}
// //                 <div
// //                   className="image-slider"
// //                   onClick={() =>
// //                     navigate(`/productdetail/${product.pid}`)
// //                   }
// //                 >
// //                   <div className="image-track">
// //                     {product.images?.map((img, i) => (
// //                       <img
// //                         key={i}
// //                         src={`http://localhost:5000/uploads/${img}`}
// //                         alt={product.pname}
// //                       />
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* PRODUCT INFO */}
// //                 <div className="card-body">
// //                   <h6 className="product-name">{product.pname}</h6>
// //                   <div className="rating">
// //                     {Array.from({ length: 5 }, (_, index) => {
// //                       const rating = Math.round(product.avgRating);
// //                       return (
// //                         <span key={index}>
// //                           {index < rating ? "★" : "☆"}
// //                         </span>
// //                       );
// //                     })}
// //                     <span className="review-count">
// //                       ({product.reviewCount})
// //                     </span>
// //                   </div>
// //                   <div className="price">₹{product.price}</div>
// //                 </div>

// //                 {/* CART BAR */}
// //                 <div className="cart-bar hover-only">
// //                   <button className="qty-btn">−</button>
// //                   <span className="qty">1</span>
// //                   <button className="qty-btn">+</button>

// //                   <button
// //                     className="add-cart-btn"
// //                     disabled={product.stock === 0}
// //                   >
// //                     {product.stock === 0
// //                       ? "Out of Stock"
// //                       : "Add To Cart"}
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }

// // export default Home;

// import React, { useEffect, useState } from "react";
// import axios from "../axiosConfig";
// import { useNavigate } from "react-router-dom";
// import "./Home.css";

// function Home() {
//   const [user, setUser] = useState(null);
//   const [showWelcome, setShowWelcome] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [latestProducts, setLatestProducts] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const initializeHome = async () => {
//       try {
//         const sessionRes = await axios.get("/api/user/check-session");

//         if (!sessionRes.data.loggedIn) {
//           navigate("/user-login");
//           return;
//         }

//         setUser(sessionRes.data.user);
//         localStorage.setItem(
//           "user",
//           JSON.stringify(sessionRes.data.user)
//         );
//         setShowWelcome(true);
//         setTimeout(() => setShowWelcome(false), 3000);

//         const categoryRes = await axios.get("/api/category/all");
//         setCategories(categoryRes.data);

//         const productRes = await axios.get("/api/product/latest-eight");
//         setLatestProducts(productRes.data);
//       } catch (error) {
//         console.error("Home error:", error);
//         navigate("/user-login");
//       }
//     };

//     initializeHome();
//   }, [navigate]);

//   return (
//     <div className="home-container">
//       {/* ================= WELCOME ================= */}
//       {showWelcome && (
//         <div className="welcome-overlay">
//           <div className="welcome-popup">
//             <h2>🎉 Welcome {user?.uname}</h2>
//             <p>We’re glad to have you at Green Aura 🌿</p>
//           </div>
//         </div>
//       )}

//       {/* ================= FEATURE SECTION ================= */}
//       <section className="feature-section container">
//         <h1 className="welcome-title">Welcome To Green Aura</h1>

//         <div className="row">
//           {[
//             { img: "home2.jpg", title: "quality you can trust" },
//             { img: "home3.jpg", title: "not your average plants" },
//             { img: "home4.jpg", title: "plant care made simple" },
//           ].map((item, index) => (
//             <div className="col-md-4 mb-4" key={index}>
//               <div className="feature-card">
//                 <img
//                   src={`/images/${item.img}`}
//                   alt={item.title}
//                   className="feature-img"
//                 />
//                 <h3>{item.title}</h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ================= CATEGORIES ================= */}
//       <section className="shop-category-section container">
//         <h2 className="shop-title">Explore Green Categories</h2>

//         <div className="circular-category-wrapper">
//           {categories.map((cat, index) => {
//             const images = [
//               "/images/plant1.jpg",
//               "/images/seeds.jpg",
//               "/images/potandplanter.jpg",
//               "/images/plantcare.jpg",
//               "/images/gardeningtools.jpg",
//             ];

//             return (
//               <div
//                 key={cat.cid}
//                 className="circular-category"
//                 onClick={() =>
//                   navigate(`/products/${cat.cid}`, {
//                     state: {
//                       cid: cat.cid,
//                       cname: cat.cname,   // ✅ ADDED (only change)
//                     }
//                   })
//                 }
//               >
//                 <div className="circle-img">
//                   <img
//                     src={images[index % images.length]}
//                     alt={cat.cname}
//                   />
//                 </div>
//                 <h4 className="circle-title">{cat.cname}</h4>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       {/* ================= LATEST PRODUCTS ================= */}
//       <section className="latest-products-section container">
//         <h2 className="shop-title">New Arrivals</h2>

//         <div className="row">
//           {latestProducts.map((product) => (
//             <div className="col-md-3 mb-4" key={product.pid}>
//               <div className="modern-product-card">
//                 <div className="wishlist-btn hover-only">♡</div>

//                 <div
//                   className="image-slider"
//                   onClick={() =>
//                     navigate(`/productdetail/${product.pid}`)
//                   }
//                 >
//                   <div className="image-track">
//                     {product.images?.map((img, i) => (
//                       <img
//                         key={i}
//                         src={`http://localhost:5000/uploads/${img}`}
//                         alt={product.pname}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 <div className="card-body">
//                   <h6 className="product-name">{product.pname}</h6>

//                   <div className="rating">
//                     {Array.from({ length: 5 }, (_, index) => {
//                       const rating = Math.round(product.avgRating);
//                       return (
//                         <span key={index}>
//                           {index < rating ? "★" : "☆"}
//                         </span>
//                       );
//                     })}
//                     <span className="review-count">
//                       ({product.reviewCount})
//                     </span>
//                   </div>

//                   <div className="price">₹{product.price}</div>
//                 </div>

//                 <div className="cart-bar hover-only">
//                   <button className="qty-btn">−</button>
//                   <span className="qty">1</span>
//                   <button className="qty-btn">+</button>

//                   <button
//                     className="add-cart-btn"
//                     disabled={product.stock === 0}
//                   >
//                     {product.stock === 0
//                       ? "Out of Stock"
//                       : "Add To Cart"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;

// import React, { useEffect, useState } from "react";
// import axios from "../axiosConfig";
// import { useNavigate } from "react-router-dom";
// import "./Home.css";

// function Home() {
//   const [user, setUser] = useState(null);
//   const [showWelcome, setShowWelcome] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [latestProducts, setLatestProducts] = useState([]);
//   const [wishlist, setWishlist] = useState([]); // ⭐ wishlist state

//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   const initializeHome = async () => {
//   //     try {
//   //       // ✅ check session
//   //       const sessionRes = await axios.get("/api/user/check-session");

//   //       if (!sessionRes.data.loggedIn) {
//   //         navigate("/user-login");
//   //         return;
//   //       }

//   //       const currentUser = sessionRes.data.user;
//   //       setUser(currentUser);
//   //       localStorage.setItem("user", JSON.stringify(currentUser));

//   //       setShowWelcome(true);
//   //       setTimeout(() => setShowWelcome(false), 3000);

//   //       // ✅ fetch categories
//   //       const categoryRes = await axios.get("/api/category/all");
//   //       setCategories(categoryRes.data);

//   //       // ✅ fetch latest products
//   //       const productRes = await axios.get("/api/product/latest-eight");
//   //       setLatestProducts(productRes.data);

//   //       // ⭐ fetch wishlist (type-safe)
//   //       try {
//   //         const wishRes = await axios.get("/api/wishlist/user");
//   //         // convert all pid to string for safe comparison
//   //         const pids = wishRes.data.map((w) => w.pid.toString());
//   //         setWishlist(pids);
//   //         localStorage.setItem("wishlist", JSON.stringify(pids));
//   //         window.dispatchEvent(new Event("wishlistUpdated"));
//   //       } catch (err) {
//   //         console.error("Wishlist fetch error:", err);
//   //         setWishlist([]);
//   //         localStorage.setItem("wishlist", JSON.stringify([]));
//   //       }

//   //     } catch (error) {
//   //       console.error("Home error:", error);
//   //       navigate("/user-login");
//   //     }
//   //   };

//   //   initializeHome();
//   // }, [navigate]);

//   // /* ⭐ TOGGLE WISHLIST */
//   // const toggleWishlist = async (pid) => {
//   //   if (!user) {
//   //     alert("Please login first");
//   //     navigate("/user-login");
//   //     return;
//   //   }

//   //   // ensure pid is string for consistency
//   //   const pidStr = pid.toString();

//   //   try {
//   //     if (wishlist.includes(pidStr)) {
//   //       // REMOVE
//   //       await axios.delete(`/api/wishlist/remove/${pidStr}`);
//   //       setWishlist((prev) => {
//   //         const updated = prev.filter((id) => id !== pidStr);
//   //         localStorage.setItem("wishlist", JSON.stringify(updated));
//   //         return updated;
//   //       });
//   //     } else {
//   //       // ADD
//   //       await axios.post(`/api/wishlist/add/${pidStr}`);
//   //       setWishlist((prev) => {
//   //         const updated = [...prev, pidStr];
//   //         localStorage.setItem("wishlist", JSON.stringify(updated));
//   //         return updated;
//   //       });
//   //     }

//   //     // trigger global update event
//   //     window.dispatchEvent(new Event("wishlistUpdated"));
//   //   } catch (err) {
//   //     console.error("Wishlist toggle error:", err);
//   //     if (err.response?.status === 401) {
//   //       alert("Please login first");
//   //       navigate("/user-login");
//   //     }
//   //   }
//   // };

//   // ⭐ Fetch wishlist safely after session check
//   useEffect(() => {
//     const initializeHome = async () => {
//       try {
//         // ✅ check session
//         const sessionRes = await axios.get("/api/user/check-session");

//         if (!sessionRes.data.loggedIn) {
//           navigate("/user-login");
//           return;
//         }

//         const currentUser = sessionRes.data.user;
//         setUser(currentUser);
//         localStorage.setItem("user", JSON.stringify(currentUser));

//         setShowWelcome(true);
//         setTimeout(() => setShowWelcome(false), 3000);

//         // ✅ fetch categories
//         const categoryRes = await axios.get("/api/category/all");
//         setCategories(categoryRes.data);

//         // ✅ fetch latest products
//         const productRes = await axios.get("/api/product/latest-eight");
//         setLatestProducts(productRes.data);

//         // ⭐ fetch wishlist properly
//         try {
//           const wishRes = await axios.get("/api/wishlist/user");
//           if (Array.isArray(wishRes.data)) {
//             const pids = wishRes.data.map((w) => w.pid);
//             setWishlist(pids);
//             localStorage.setItem("wishlist", JSON.stringify(pids));
//             window.dispatchEvent(new Event("wishlistUpdated"));
//           } else {
//             setWishlist([]);
//           }
//         } catch (err) {
//           console.error("Fetch wishlist error:", err);
//           setWishlist([]);
//           localStorage.setItem("wishlist", JSON.stringify([]));
//         }
//       } catch (error) {
//         console.error("Home error:", error);
//         navigate("/user-login");
//       }
//     };

//     initializeHome();
//   }, [navigate]);

//   // ⭐ Toggle wishlist function
//   const toggleWishlist = async (pid) => {
//     if (!user) {
//       navigate("/user-login");
//       return;
//     }

//     try {
//       if (wishlist.includes(pid)) {
//         // REMOVE from wishlist
//         await axios.delete(`/api/wishlist/remove/${pid}`);
//         const updated = wishlist.filter((id) => id !== pid);
//         setWishlist(updated);
//         localStorage.setItem("wishlist", JSON.stringify(updated));
//       } else {
//         // ADD to wishlist
//         await axios.post(`/api/wishlist/add/${pid}`);
//         const updated = [...wishlist, pid];
//         setWishlist(updated);
//         localStorage.setItem("wishlist", JSON.stringify(updated));
//       }

//       // Trigger header / cart updates
//       window.dispatchEvent(new Event("wishlistUpdated"));
//     } catch (err) {
//       console.error("Wishlist toggle error:", err);
//       if (err.response?.status === 401) {
//         alert("Please login first");
//         navigate("/user-login");
//       }
//     }
//   };

//   return (
//     <div className="home-container">
//       {showWelcome && (
//         <div className="welcome-overlay">
//           <div className="welcome-popup">
//             <h2>🎉 Welcome {user?.uname}</h2>
//             <p>We’re glad to have you at Green Aura 🌿</p>
//           </div>
//         </div>
//       )}

//       {/* Feature Section */}
//       <section className="feature-section container">
//         <h1 className="welcome-title">Welcome To Green Aura</h1>

//         <div className="row">
//           {[
//             { img: "home2.jpg", title: "quality you can trust" },
//             { img: "home3.jpg", title: "not your average plants" },
//             { img: "home4.jpg", title: "plant care made simple" },
//           ].map((item, index) => (
//             <div className="col-md-4 mb-4" key={index}>
//               <div className="feature-card">
//                 <img
//                   src={`/images/${item.img}`}
//                   alt={item.title}
//                   className="feature-img"
//                 />
//                 <h3>{item.title}</h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="shop-category-section container">
//         <h2 className="shop-title">Explore Green Categories</h2>

//         <div className="circular-category-wrapper">
//           {categories.map((cat, index) => {
//             const images = [
//               "/images/plant1.jpg",
//               "/images/seeds.jpg",
//               "/images/potandplanter.jpg",
//               "/images/plantcare.jpg",
//               "/images/gardeningtools.jpg",
//             ];

//             return (
//               <div
//                 key={cat.cid}
//                 className="circular-category"
//                 onClick={() =>
//                   navigate(`/products/${cat.cid}`, {
//                     state: { cid: cat.cid, cname: cat.cname },
//                   })
//                 }
//               >
//                 <div className="circle-img">
//                   <img src={images[index % images.length]} alt={cat.cname} />
//                 </div>

//                 <h4 className="circle-title">{cat.cname}</h4>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       {/* Latest Products */}
//       <section className="latest-products-section container">
//         <h2 className="shop-title">New Arrivals</h2>

//         <div className="row">
//           {latestProducts.map((product) => (
//             <div
//               className="col-md-3 mb-4"
//               key={product.pid}
//               style={{ cursor: "pointer" }}
//             >
//               <div className="modern-product-card">
//                 {/* ⭐ Wishlist */}
//                 <div
//                   className="wishlist-btn hover-only"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     toggleWishlist(product.pid);
//                   }}
//                 >
//                   {wishlist.includes(product.pid.toString()) ? "❤️" : "♡"}
//                 </div>

//                 {/* Image */}
//                 <div
//                   className="image-slider"
//                   onClick={() => navigate(`/productdetail/${product.pid}`)}
//                 >
//                   <div className="image-track">
//                     {product.images?.map((img, i) => (
//                       <img
//                         key={i}
//                         src={`http://localhost:5000/uploads/${img}`}
//                         alt={product.pname}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Product Info */}
//                 <div className="card-body">
//                   <h6 className="product-name">{product.pname}</h6>

//                   <div className="rating">
//                     {Array.from({ length: 5 }, (_, index) => {
//                       const rating = Math.round(product.avgRating);
//                       return (
//                         <span key={index}>{index < rating ? "★" : "☆"}</span>
//                       );
//                     })}
//                     <span className="review-count">
//                       ({product.reviewCount})
//                     </span>
//                   </div>

//                   <div className="price">₹{product.price}</div>
//                 </div>

//                 {/* Cart */}
//                 <div className="cart-bar hover-only">
//                   <button className="qty-btn">−</button>
//                   <span className="qty">1</span>
//                   <button className="qty-btn">+</button>

//                   <button
//                     className="add-cart-btn"
//                     disabled={product.stock === 0}
//                   >
//                     {product.stock === 0 ? "Out of Stock" : "Add To Cart"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;
// ⚠️ Keep your existing imports
import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [user, setUser] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [categories, setCategories] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]); 
  const [qtyMap, setQtyMap] = useState({}); // ⭐ Track quantity per product

  const navigate = useNavigate();

  useEffect(() => {
    const initializeHome = async () => {
      try {
        const sessionRes = await axios.get("/api/user/check-session");
        if (!sessionRes.data.loggedIn) {
          navigate("/user-login");
          return;
        }
        const currentUser = sessionRes.data.user;
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));

        setShowWelcome(true);
        setTimeout(() => setShowWelcome(false), 3000);

        const categoryRes = await axios.get("/api/category/all");
        setCategories(categoryRes.data);

        const productRes = await axios.get("/api/product/latest-eight");
        setLatestProducts(productRes.data);

        // Initialize qtyMap for each product
        const initialQty = {};
        productRes.data.forEach((p) => {
          initialQty[p.pid] = 1;
        });
        setQtyMap(initialQty);

        // Wishlist fetch
        try {
          const wishRes = await axios.get("/api/wishlist/user");
          if (Array.isArray(wishRes.data)) {
            const pids = wishRes.data.map((w) => w.pid);
            setWishlist(pids);
            localStorage.setItem("wishlist", JSON.stringify(pids));
            window.dispatchEvent(new Event("wishlistUpdated"));
          } else {
            setWishlist([]);
          }
        } catch (err) {
          console.error("Fetch wishlist error:", err);
          setWishlist([]);
          localStorage.setItem("wishlist", JSON.stringify([]));
        }
      } catch (error) {
        console.error("Home error:", error);
        navigate("/user-login");
      }
    };
    initializeHome();
  }, [navigate]);

  const toggleWishlist = async (pid) => {
    if (!user) {
      navigate("/user-login");
      return;
    }

    try {
      if (wishlist.includes(pid)) {
        await axios.delete(`/api/wishlist/remove/${pid}`);
        const updated = wishlist.filter((id) => id !== pid);
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
      } else {
        await axios.post(`/api/wishlist/add/${pid}`);
        const updated = [...wishlist, pid];
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
      }
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (err) {
      console.error("Wishlist toggle error:", err);
      if (err.response?.status === 401) {
        alert("Please login first");
        navigate("/user-login");
      }
    }
  };

  // ⭐ Increment / Decrement Qty
  const changeQty = (pid, delta) => {
    setQtyMap((prev) => {
      const newQty = Math.max(1, (prev[pid] || 1) + delta); // min 1
      return { ...prev, [pid]: newQty };
    });
  };

  // ⭐ Add to cart function
  const addToCart = async (product) => {
    if (!user) {
      navigate("/user-login");
      return;
    }

    const qty = qtyMap[product.pid] || 1;
    const totalPrice = qty * product.price;

    try {
      await axios.post("/api/cart/add", {
        uid: user.uid,
        pid: product.pid || product.pid,
        qty,
        totalPrice,
      });

      // Navigate to cart page after successful add
      navigate("/addtocart");
    } catch (err) {
      console.error("Add to cart error:", err);
      alert("Failed to add product to cart");
    }
  };

  return (
    <div className="home-container">
      {showWelcome && (
        <div className="welcome-overlay">
          <div className="welcome-popup">
            <h2>🎉 Welcome {user?.uname}</h2>
            <p>We’re glad to have you at Green Aura 🌿</p>
          </div>
        </div>
      )}

      {/* Feature Section */}
      <section className="feature-section container">
        <h1 className="welcome-title">Welcome To Green Aura</h1>
        <div className="row">
          {[
            { img: "home2.jpg", title: "quality you can trust" },
            { img: "home3.jpg", title: "not your average plants" },
            { img: "home4.jpg", title: "plant care made simple" },
          ].map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="feature-card">
                <img src={`/images/${item.img}`} alt={item.title} className="feature-img" />
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="shop-category-section container">
        <h2 className="shop-title">Explore Green Categories</h2>
        <div className="circular-category-wrapper">
          {categories.map((cat, index) => {
            const images = [
              "/images/plant1.jpg",
              "/images/seeds.jpg",
              "/images/potandplanter.jpg",
              "/images/plantcare.jpg",
              "/images/gardeningtools.jpg",
            ];
            return (
              <div
                key={cat.cid}
                className="circular-category"
                onClick={() => navigate(`/products/${cat.cid}`, { state: { cid: cat.cid, cname: cat.cname } })}
              >
                <div className="circle-img">
                  <img src={images[index % images.length]} alt={cat.cname} />
                </div>
                <h4 className="circle-title">{cat.cname}</h4>
              </div>
            );
          })}
        </div>
      </section>

      {/* Latest Products */}
      <section className="latest-products-section container">
        <h2 className="shop-title">New Arrivals</h2>
        <div className="row">
          {latestProducts.map((product) => (
            <div className="col-md-3 mb-4" key={product.pid} style={{ cursor: "pointer" }}>
              <div className="modern-product-card">
                <div
                  className="wishlist-btn hover-only"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.pid);
                  }}
                >
                  {wishlist.includes(product.pid.toString()) ? "❤️" : "♡"}
                </div>

                <div className="image-slider" onClick={() => navigate(`/productdetail/${product.pid}`)}>
                  <div className="image-track">
                    {product.images?.map((img, i) => (
                      <img key={i} src={`http://localhost:5000/uploads/${img}`} alt={product.pname} />
                    ))}
                  </div>
                </div>

                <div className="card-body">
                  <h6 className="product-name">{product.pname}</h6>
                  <div className="rating">
                    {Array.from({ length: 5 }, (_, index) => {
                      const rating = Math.round(product.avgRating);
                      return <span key={index}>{index < rating ? "★" : "☆"}</span>;
                    })}
                    <span className="review-count">({product.reviewCount})</span>
                  </div>
                  <div className="price">₹{product.price}</div>
                </div>

                {/* Cart Section */}
                <div className="cart-bar hover-only">
                  <button className="qty-btn" onClick={() => changeQty(product.pid, -1)}>−</button>
                  <span className="qty">{qtyMap[product.pid]}</span>
                  <button className="qty-btn" onClick={() => changeQty(product.pid, 1)}>+</button>
                  <button
                    className="add-cart-btn"
                    disabled={product.stock === 0}
                    onClick={() => addToCart(product)}
                  >
                    {product.stock === 0 ? "Out of Stock" : "Add To Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;