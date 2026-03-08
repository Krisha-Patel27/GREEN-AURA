import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

function ProductDetail() {
  const { pid } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const [wishlist, setWishlist] = useState([]);
  const [qtyMap, setQtyMap] = useState({}); // Track quantity per related product

  // ================= GET LOGGED-IN USER =================
  const fetchUserSession = async () => {
    try {
      const res = await axios.get("/api/user/check-session", { withCredentials: true });
      if (res.data.loggedIn) setUser(res.data.user);
      else setUser(null);
    } catch (err) {
      console.error("Session check error:", err);
      setUser(null);
    }
  };

  useEffect(() => { fetchUserSession(); }, []);

  // ================= LOAD WISHLIST =================
  const loadWishlist = async () => {
    if (!user) return;
    try {
      const res = await axios.get("/api/wishlist/user", { withCredentials: true });
      setWishlist(res.data.map((item) => item.pid));
    } catch (err) {
      console.error("Wishlist load error:", err);
      setWishlist([]);
    }
  };

  useEffect(() => { loadWishlist(); }, [user]);

  // ================= TOGGLE WISHLIST =================
  const toggleWishlist = async (pid) => {
    if (!user) {
      alert("Please login first");
      navigate("/user-login");
      return;
    }
    try {
      if (wishlist.includes(pid)) {
        await axios.delete(`/api/wishlist/remove/${pid}`, { withCredentials: true });
        setWishlist(wishlist.filter((id) => id !== pid));
      } else {
        await axios.post(`/api/wishlist/add/${pid}`, {}, { withCredentials: true });
        setWishlist([...wishlist, pid]);
      }
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (err) {
      console.error("Wishlist toggle error:", err);
      alert(err.response?.data?.message || "Wishlist error");
    }
  };

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/product/${pid}`);
        const foundProduct = res.data;
        if (!foundProduct) { navigate("/"); return; }
        setProduct(foundProduct);
        setSelectedImage(foundProduct.images?.[0]);

        // Related products
        const relatedRes = await axios.get(`/api/product/related/${foundProduct.cid}/${foundProduct.pid}`);
        setRelatedProducts(relatedRes.data);

        // Initialize qtyMap for related products
        const initialQty = {};
        relatedRes.data.forEach((p) => { initialQty[p.pid] = 1; });
        setQtyMap(initialQty);

        // Reviews
        const reviewRes = await axios.get(`/api/review/product/${pid}`);
        setReviews(reviewRes.data);
        window.scrollTo(0, 0);
      } catch (err) { console.error("Product detail error:", err); }
      finally { setLoading(false); }
    };
    if (pid) fetchProduct();
  }, [pid, navigate]);

  // ================= SUBMIT REVIEW =================
  const handleSubmit = async () => {
    if (!user) return alert("Please login first");
    if (rating === 0) return alert("Please select rating");
    if (!comment.trim()) return alert("Please write your review");

    try {
      await axios.post("/api/review/create", { uid: user.uid, pid, rating, comment }, { withCredentials: true });
      const reviewRes = await axios.get(`/api/review/product/${pid}`);
      setReviews(reviewRes.data);
      setComment("");
      setRating(0);
    } catch (err) { alert(err.response?.data?.message || "Error submitting review"); }
  };

  // ================= QUANTITY CONTROL =================
  const changeQty = (pid, delta) => {
    setQtyMap((prev) => ({ ...prev, [pid]: Math.max(1, (prev[pid] || 1) + delta) }));
  };

  // ================= ADD TO CART =================
  const addToCart = async () => {

  if (!user) {
    navigate("/user-login");
    return;
  }

  try {

    await axios.post("/api/cart/add", {
      uid: user.uid,
      pid: product.pid,
      qty: 1,
      totalPrice: product.price
    });

    alert("Added to cart");
    navigate("/addtocart");
  } catch (err) {
    console.error(err);
  }
};
  if (loading) return <p className="loading">Loading product...</p>;
  if (!product) return null;

  return (
    <div className="product-detail-container container">
      <div className="row product-main">
        {/* THUMBNAIL */}
        <div className="col-md-1 thumbnail-column">
          {product.images?.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:5000/uploads/${img}`}
              alt="thumb"
              className={`thumbnail-img ${selectedImage === img ? "active" : ""}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* MAIN IMAGE */}
        <div className="col-md-5">
          <img src={`http://localhost:5000/uploads/${selectedImage}`} alt={product.pname} className="product-main-img" />
        </div>

        {/* PRODUCT INFO */}
        <div className="col-md-6 product-info-section">
          <h2>{product.pname}</h2>
          <p className="price">₹{product.price}</p>
          <p className="description">{product.pdescription}</p>
          <p className={product.stock === 0 ? "out" : "in"}>{product.stock === 0 ? "Out of Stock" : "In Stock"}</p>

          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <button className="add-to-cart-btn" disabled={product.stock === 0} onClick={() => addToCart(product)}>
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            <div style={{ fontSize: "28px", cursor: "pointer" }} onClick={() => toggleWishlist(product.pid)}>
              {wishlist.includes(product.pid) ? "❤️" : "♡"}
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <section className="reviews-section">
        <h3>Customer Reviews</h3>
        {user && (
          <p>
            Reviewing as: <strong>{user.uname}</strong>
          </p>
        )}

        <div style={{ marginBottom: "10px" }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                cursor: "pointer",
                fontSize: "24px",
                color: star <= rating ? "#ffc107" : "#e4e5e9",
              }}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ width: "100%", height: "80px" }}
        />

        <button
          className="review-btn"
          onClick={handleSubmit}
          style={{ marginTop: "10px" }}
        >
          Submit
        </button>

        <hr />

        {reviews.length === 0 && <p>No reviews yet</p>}

        {reviews.map((rev) => (
          <div key={rev.rid}>
            <strong>{rev.uname}</strong>
            <p style={{ color: "#ffc107" }}>
              {"★".repeat(rev.rating)}
              {"☆".repeat(5 - rev.rating)}
            </p>
            <p>{rev.comment}</p>
            <small>{new Date(rev.createdAt).toLocaleString()}</small>
            <hr />
          </div>
        ))}
      </section>

      {/* RELATED PRODUCTS */}
      <section className="related-products-section">
        <h3>Related Products</h3>
        <div className="row">
          {relatedProducts.map((p) => (
            <div key={p.pid} className="col-md-3 mb-4" style={{ cursor: "pointer" }}>
              <div className="modern-product-card">
                <div className="wishlist-btn hover-only" onClick={(e) => { e.stopPropagation(); toggleWishlist(p.pid); }}>
                  {wishlist.includes(p.pid) ? "❤️" : "♡"}
                </div>

                <div className="image-slider" onClick={() => navigate(`/productdetail/${p.pid}`)}>
                  <div className="image-track">
                    {p.images?.map((img, i) => (
                      <img key={i} src={`http://localhost:5000/uploads/${img}`} alt={p.pname} />
                    ))}
                  </div>
                </div>

                <div className="card-body">
                  <h6 className="product-name">{p.pname}</h6>
                  <div className="rating">{Array.from({ length: 5 }, (_, index) => <span key={index}>{index < Math.round(p.avgRating || 0) ? "★" : "☆"}</span>)}</div>
                  <div className="price">₹{p.price}</div>
                </div>

                {/* Cart Section */}
                <div className="cart-bar hover-only">
                  <button className="qty-btn" onClick={() => changeQty(p.pid, -1)}>−</button>
                  <span className="qty">{qtyMap[p.pid]}</span>
                  <button className="qty-btn" onClick={() => changeQty(p.pid, 1)}>+</button>
                  <button className="add-cart-btn" disabled={p.stock === 0} onClick={() => addToCart(p)}>
                    {p.stock === 0 ? "Out of Stock" : "Add To Cart"}
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

export default ProductDetail;