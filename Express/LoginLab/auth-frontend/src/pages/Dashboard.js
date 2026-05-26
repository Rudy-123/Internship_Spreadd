import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Get token from localStorage

  useEffect(() => {
    if (!token) {
      navigate("/login"); // If no token, redirect to login
      return;
    }
    fetch("http://localhost:5000/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data)) // Update state with fetched data
      .catch((err) => console.log("Error", err)); // Log any errors
  }, [token, navigate]);

  if (!data) {
    return <p>Loading...</p>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
        <h2>{data.message}</h2>
        <p>
          <strong>User ID:</strong> {data.user.id}
        </p>
        <p>
          <strong>Username:</strong> {data.user.username}
        </p>
      </div>
    </div>
  );
}
