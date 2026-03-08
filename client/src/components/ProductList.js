// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "../axiosConfig";
// import "./ProductList.css";

// const PRODUCTS_PER_PAGE = 12;
// const POT_CATEGORY_NAME = "Pots & Planters"; // change only if cname differs

// const ProductList = () => {
//   const { cid, scid } = useParams();
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);

//   const [categoryName, setCategoryName] = useState("");

//   /* PRICE */
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(0);
//   const [selectedMin, setSelectedMin] = useState(0);
//   const [selectedMax, setSelectedMax] = useState(0);

//   /* SIZE & COLOR (MULTI) */
//   const [sizes, setSizes] = useState([]);
//   const [colors, setColors] = useState([]);
//   const [selectedSizes, setSelectedSizes] = useState([]);
//   const [selectedColors, setSelectedColors] = useState([]);

//   /* PAGINATION */
//   const [currentPage, setCurrentPage] = useState(1);

//   /* ================= LOAD DATA ================= */
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const session = await axios.get("/api/user/check-session");
//         if (!session.data.loggedIn) {
//           navigate("/user-login");
//           return;
//         }

//         const url = scid
//           ? `/api/product/by-category/${cid}/${scid}`
//           : `/api/product/by-category/${cid}`;

//         const res = await axios.get(url);
//         setProducts(res.data);
//         setFiltered(res.data);

//         const prices = res.data.map((p) => p.price);
//         const min = Math.min(...prices);
//         const max = Math.max(...prices);

//         setMinPrice(min);
//         setMaxPrice(max);
//         setSelectedMin(min);
//         setSelectedMax(max);

//         setSizes([...new Set(res.data.flatMap((p) => p.size || []))]);
//         setColors([...new Set(res.data.flatMap((p) => p.color || []))]);

//         const catRes = await axios.get("/api/category/all");
//         const cat = catRes.data.find((c) => c.cid === cid);
//         setCategoryName(cat?.cname || "");

//       } catch (err) {
//         console.error("ProductList error:", err);
//         navigate("/user-login");
//       }
//     };

//     loadData();
//   }, [cid, scid, navigate]);

//   /* ================= CHECKBOX HANDLERS ================= */
//   const toggleValue = (value, list, setList) => {
//     setList(
//       list.includes(value)
//         ? list.filter((v) => v !== value)
//         : [...list, value]
//     );
//   };

//   /* ================= APPLY FILTER ================= */
//   const applyFilter = () => {
//     let result = [...products];

//     result = result.filter(
//       (p) => p.price >= selectedMin && p.price <= selectedMax
//     );

//     if (categoryName === POT_CATEGORY_NAME) {
//       if (selectedSizes.length > 0) {
//         result = result.filter((p) =>
//           p.size?.some((s) => selectedSizes.includes(s))
//         );
//       }

//       if (selectedColors.length > 0) {
//         result = result.filter((p) =>
//           p.color?.some((c) => selectedColors.includes(c))
//         );
//       }
//     }

//     setFiltered(result);
//     setCurrentPage(1);
//   };

//   /* ================= PAGINATION ================= */
//   const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
//   const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
//   const visible = filtered.slice(start, start + PRODUCTS_PER_PAGE);

//   return (
//     <div className="pl-container">
//       {/* ================= FILTER (STICKY) ================= */}
//       <aside className="pl-filter sticky">
//         <h3>Filters</h3>

//         {/* PRICE */}
//         <div className="filter-box">
//           <label>Price ₹{selectedMin} – ₹{selectedMax}</label>
//           <input
//             type="range"
//             min={minPrice}
//             max={maxPrice}
//             value={selectedMin}
//             onChange={(e) => setSelectedMin(+e.target.value)}
//           />
//           <input
//             type="range"
//             min={minPrice}
//             max={maxPrice}
//             value={selectedMax}
//             onChange={(e) => setSelectedMax(+e.target.value)}
//           />
//         </div>

//         {/* SIZE & COLOR (ONLY FOR POTS) */}
//         {categoryName === POT_CATEGORY_NAME && (
//           <>
//             <div className="filter-box">
//               <h4>Size</h4>
//               {sizes.map((s) => (
//                 <label key={s} className="checkbox">
//                   <input
//                     type="checkbox"
//                     checked={selectedSizes.includes(s)}
//                     onChange={() =>
//                       toggleValue(s, selectedSizes, setSelectedSizes)
//                     }
//                   />
//                   {s}
//                 </label>
//               ))}
//             </div>

//             <div className="filter-box">
//               <h4>Color</h4>
//               {colors.map((c) => (
//                 <label key={c} className="checkbox">
//                   <input
//                     type="checkbox"
//                     checked={selectedColors.includes(c)}
//                     onChange={() =>
//                       toggleValue(c, selectedColors, setSelectedColors)
//                     }
//                   />
//                   {c}
//                 </label>
//               ))}
//             </div>
//           </>
//         )}

//         <button className="apply-btn" onClick={applyFilter}>
//           Apply Filters
//         </button>
//       </aside>

//       {/* ================= PRODUCTS ================= */}
//       <section className="pl-products">
//         {visible.map((p) => (
//           <div
//             key={p.pid}
//             className="modern-product-card"
//             onClick={() => navigate(`/productdetail/${p.pid}`)}
//           >
//             <div className="image-slider">
//               <div className="image-track">
//                 {p.images?.map((img, i) => (
//                   <img
//                     key={i}
//                     src={`http://localhost:5000/uploads/${img}`}
//                     alt={p.pname}
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="card-body">
//               <h6>{p.pname}</h6>
//               <div className="price">₹{p.price}</div>
//             </div>
//           </div>
//         ))}

//         {/* PAGINATION */}
//         {totalPages > 1 && (
//           <div className="pagination-modern">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((p) => p - 1)}
//             >
//               ◀
//             </button>

//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 className={currentPage === i + 1 ? "active" : ""}
//                 onClick={() => setCurrentPage(i + 1)}
//               >
//                 {i + 1}
//               </button>
//             ))}

//             <button
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((p) => p + 1)}
//             >
//               ▶
//             </button>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default ProductList;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import "./ProductList.css";

const PRODUCTS_PER_PAGE = 12;
const POT_CATEGORY_NAME = "Pots & Planters";

const ProductList = () => {
  const { cid, scid } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [selectedMin, setSelectedMin] = useState(0);
  const [selectedMax, setSelectedMax] = useState(0);

  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [qty, setQty] = useState({});
  const [wishlist, setWishlist] = useState([]);

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const loadData = async () => {
      try {
        const session = await axios.get("/api/user/check-session");

        if (!session.data.loggedIn) {
          navigate("/user-login");
          return;
        }

        const url = scid
          ? `/api/product/by-category/${cid}/${scid}`
          : `/api/product/by-category/${cid}`;

        const res = await axios.get(url);

        setProducts(res.data);
        setFiltered(res.data);

        const prices = res.data.map((p) => p.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);

        setMinPrice(min);
        setMaxPrice(max);
        setSelectedMin(min);
        setSelectedMax(max);

        setSizes([...new Set(res.data.flatMap((p) => p.size || []))]);
        setColors([...new Set(res.data.flatMap((p) => p.color || []))]);

        const catRes = await axios.get("/api/category/all");
        const cat = catRes.data.find((c) => c.cid === cid);
        setCategoryName(cat?.cname || "");

        const initialQty = {};
        res.data.forEach((p) => (initialQty[p.pid] = 1));
        setQty(initialQty);

        const wish = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(wish);

      } catch (err) {
        console.error("ProductList error:", err);
        navigate("/user-login");
      }
    };

    loadData();
  }, [cid, scid, navigate]);

// ================= WISHLIST =================
const [user, setUser] = useState(null);

// Get logged-in user session
useEffect(() => {
  const fetchSession = async () => {
    try {
      const res = await axios.get("/api/user/check-session", { withCredentials: true });
      if (res.data.loggedIn) setUser(res.data.user);
    } catch (err) {
      console.error("Session error:", err);
    }
  };
  fetchSession();
}, []);

// Load user's wishlist from server
useEffect(() => {
  const loadWishlist = async () => {
    if (!user) return;
    try {
      const res = await axios.get("/api/wishlist/user", { withCredentials: true });
      const pids = res.data.map((item) => item.pid);
      setWishlist(pids);
    } catch (err) {
      console.error("Wishlist load error:", err);
      setWishlist([]);
    }
  };
  loadWishlist();
}, [user]);

// Toggle wishlist with auto-navigation
const toggleWishlist = async (pid) => {
  if (!user) {
    alert("Please login first");
    navigate("/user-login");
    return;
  }

  try {
    if (wishlist.includes(pid)) {
      // REMOVE from wishlist
      await axios.delete(`/api/wishlist/remove/${pid}`, { withCredentials: true });
      setWishlist(wishlist.filter((id) => id !== pid));
    } else {
      // ADD to wishlist
      await axios.post(`/api/wishlist/add/${pid}`, {}, { withCredentials: true });
      setWishlist([...wishlist, pid]);

      // ✅ Navigate automatically after adding
      navigate("/wishlist");
    }

    window.dispatchEvent(new Event("wishlistUpdated"));
  } catch (err) {
    console.error("Wishlist toggle error:", err);
    alert(err.response?.data?.message || "Something went wrong with wishlist");
  }
};

  /* ================= CART ================= */

//   const addToCart = async (product) => {
//   try {

//     const quantity = qty[product.pid] || 1;
//     const totalPrice = quantity * product.price;

//     await axios.post(
//       "/api/cart/add",
//       {
//         pid: product.pid,
//         qty: quantity,
//         totalPrice: totalPrice
//       },
//       { withCredentials: true }
//     );

//     alert("Product added to cart");

//     window.dispatchEvent(new Event("cartUpdated"));

//   } catch (err) {

//     console.error("Add cart error:", err);
//     alert("Failed to add product to cart");

//   }
// };

const addToCart = async (product) => {
  try {

    const uid = user.uid;   // logged in user
    const pid = product.pid;
    const qty = 1;
    const totalPrice = product.price * qty;

    await axios.post("http://localhost:5000/api/cart/add", {
      uid,
      pid,
      qty,
      totalPrice
    });

    alert("Product added to cart");
      navigate('/addtocart');
  } catch (err) {
    console.error("Add cart error:", err);
  }
};

  /* ================= QTY ================= */

  const increaseQty = (pid) => {
    setQty((prev) => ({
      ...prev,
      [pid]: (prev[pid] || 1) + 1,
    }));
  };

  const decreaseQty = (pid) => {
    setQty((prev) => ({
      ...prev,
      [pid]: prev[pid] > 1 ? prev[pid] - 1 : 1,
    }));
  };

  /* ================= FILTER ================= */

  const toggleValue = (value, list, setList) => {
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
  };

  const applyFilter = () => {
    let result = [...products];

    result = result.filter(
      (p) => p.price >= selectedMin && p.price <= selectedMax
    );

    if (categoryName === POT_CATEGORY_NAME) {
      if (selectedSizes.length > 0) {
        result = result.filter((p) =>
          p.size?.some((s) => selectedSizes.includes(s))
        );
      }

      if (selectedColors.length > 0) {
        result = result.filter((p) =>
          p.color?.some((c) => selectedColors.includes(c))
        );
      }
    }

    setFiltered(result);
    setCurrentPage(1);
  };

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const visible = filtered.slice(start, start + PRODUCTS_PER_PAGE);

  return (
    <div className="pl-container">

      {/* ================= FILTER ================= */}

      <aside className="pl-filter sticky">
        <h3>Filters</h3>

        <div className="filter-box">
          <label>
            Price ₹{selectedMin} – ₹{selectedMax}
          </label>

          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={selectedMin}
            onChange={(e) => setSelectedMin(+e.target.value)}
          />

          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={selectedMax}
            onChange={(e) => setSelectedMax(+e.target.value)}
          />
        </div>

        {categoryName === POT_CATEGORY_NAME && (
          <>
            <div className="filter-box">
              <h4>Size</h4>

              {sizes.map((s) => (
                <label key={s} className="checkbox">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(s)}
                    onChange={() =>
                      toggleValue(s, selectedSizes, setSelectedSizes)
                    }
                  />
                  {s}
                </label>
              ))}
            </div>

            <div className="filter-box">
              <h4>Color</h4>

              {colors.map((c) => (
                <label key={c} className="checkbox">
                  <input
                    type="checkbox"
                    checked={selectedColors.includes(c)}
                    onChange={() =>
                      toggleValue(c, selectedColors, setSelectedColors)
                    }
                  />
                  {c}
                </label>
              ))}
            </div>
          </>
        )}

        <button className="apply-btn" onClick={applyFilter}>
          Apply Filters
        </button>
      </aside>

      {/* ================= PRODUCTS ================= */}

      <section className="pl-products">
        <div className="row">
          {visible.map((p) => (
            <div key={p.pid} className="col-md-3 mb-4">
              <div className="modern-product-card">

                {/* ❤️ WISHLIST */}

                <div
                  className="wishlist-btn hover-only"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(p.pid);
                  }}
                >
                  {wishlist.includes(p.pid) ? "❤️" : "♡"}
                </div>

                {/* IMAGE */}

                <div
                  className="image-slider"
                  onClick={() => navigate(`/productdetail/${p.pid}`)}
                >
                  <div className="image-track">
                    {p.images?.map((img, i) => (
                      <img
                        key={i}
                        src={`http://localhost:5000/uploads/${img}`}
                        alt={p.pname}
                      />
                    ))}
                  </div>
                </div>

                {/* PRODUCT INFO */}

                <div className="card-body">
                  <h6 className="product-name">{p.pname}</h6>

                  <div className="rating">
                    {Array.from({ length: 5 }, (_, index) => {
                      const rating = Math.round(p.avgRating || 0);
                      return <span key={index}>{index < rating ? "★" : "☆"}</span>;
                    })}
                  </div>

                  <div className="price">₹{p.price}</div>
                </div>

                {/* CART BAR */}

                <div className="cart-bar hover-only">
                  <button
                    className="qty-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      decreaseQty(p.pid);
                    }}
                  >
                    −
                  </button>

                  <span className="qty">{qty[p.pid] || 1}</span>

                  <button
                    className="qty-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      increaseQty(p.pid);
                    }}
                  >
                    +
                  </button>

                  <button
                    className="add-cart-btn"
                    disabled={p.stock === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                    }}
                  >
                    {p.stock === 0 ? "Out of Stock" : "Add To Cart"}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ================= PAGINATION ================= */}

        {totalPages > 1 && (
          <div className="pagination-modern">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              ◀
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              ▶
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductList;