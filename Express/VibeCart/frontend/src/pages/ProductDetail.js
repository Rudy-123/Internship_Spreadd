import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ProductDetail.css";

const API_URL = "http://localhost:5000/api";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        setProduct(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Product not found");
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/reviews`);
        const productReviews = response.data.data.filter(
          (r) => r.product === id,
        );
        setReviews(productReviews);
      } catch (err) {
        console.log("Failed to load reviews");
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-detail">
      <button onClick={() => navigate("/")} className="back-btn">
        ← Back
      </button>

      <div className="detail-container">
        <div className="detail-image">
          <div className="image-placeholder">{product.image}</div>
        </div>

        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="category">Category: {product.category.name}</p>

          <div className="pricing-section">
            <p className="price">Price: ₹{product.price}</p>
            <p className="stock">Stock: {product.stock}</p>
            <p className="rating">Rating: ⭐ {product.rating}/5</p>
          </div>

          <div className="description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Reviews ({reviews.length})</h2>
        {reviews.length > 0 ? (
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review._id} className="review-item">
                <div className="review-header">
                  <span className="reviewer-name">{review.userName}</span>
                  <span className="review-rating">⭐ {review.rating}/5</span>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-reviews">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
