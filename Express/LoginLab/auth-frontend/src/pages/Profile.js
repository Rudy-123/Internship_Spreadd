import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetch("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.log("Error:", err));
  }, [token, navigate]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Profile</h1>
        <p>
          <strong>Message:</strong> {profile.message}
        </p>
        <p>
          <strong>ID:</strong> {profile.profile.id}
        </p>
        <p>
          <strong>Username:</strong> {profile.profile.username}
        </p>
      </div>
    </div>
  );
}
