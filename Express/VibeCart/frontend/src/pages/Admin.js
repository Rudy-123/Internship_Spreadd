import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Admin.css";

const API_URL = "http://localhost:5000/api";

function Admin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    rating: "",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.stock ||
      !formData.category
    ) {
      setError("Please fill all required fields");
      return;
    }

    try {
      if (editingId) {
        // Update product
        await axios.put(`${API_URL}/products/${editingId}`, formData);
        setSuccess("Product updated successfully!");
      } else {
        // Create product
        await axios.post(`${API_URL}/products`, formData);
        setSuccess("Product created successfully!");
      }

      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: "",
        rating: "",
      });
      setShowForm(false);
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category._id,
      image: product.image,
      rating: product.rating,
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_URL}/products/${id}`);
        setSuccess("Product deleted successfully!");
        fetchProducts();
      } catch (err) {
        setError("Failed to delete product");
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      image: "",
      rating: "",
    });
  };

  if (loading) return <div className="loading">Loading admin panel...</div>;

  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <button className="add-btn" onClick={() => setShowForm(true)}>
        + Add New Product
      </button>

      {showForm && (
        <div className="form-container">
          <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                required
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  required
                />
              </div>

              <div className="form-group">
                <label>Stock *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="Enter stock quantity"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  placeholder="Enter rating (0-5)"
                  min="0"
                  max="5"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Image</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Enter image filename"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">
                {editingId ? "Update Product" : "Create Product"}
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="products-table">
        <h2>All Products ({products.length})</h2>
        {products.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.category.name}</td>
                  <td>₹{product.price}</td>
                  <td>{product.stock}</td>
                  <td>⭐ {product.rating}</td>
                  <td className="actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Admin;
