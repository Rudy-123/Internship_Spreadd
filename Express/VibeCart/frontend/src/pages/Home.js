import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";

const API_URL = "http://localhost:5000/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load products");
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data.data);
    } catch (err) {
      console.log("Failed to load categories");
    }
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category._id === selectedCategory);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="home">
      <h1>Our Products</h1>

      <div className="filter-section">
        <h3>Filter by Category:</h3>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="product-card-link"
          >
            <div className="product-card">
              <div className="product-image">{product.image}</div>
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              <p className="stock">Stock: {product.stock}</p>
              <p className="rating">⭐ {product.rating}</p>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="no-products">No products found in this category.</p>
      )}
    </div>
  );
}

export default Home;
