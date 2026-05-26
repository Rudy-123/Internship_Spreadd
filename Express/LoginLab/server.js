const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // Parse JSON data from requests

const jwt = require("jsonwebtoken"); // Create JWT tokens
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = [
  {
    id: 1,
    username: "John",
    password: "John1234",
  },
  {
    id: 2,
    username: "Jane",
    password: "Jane6789",
  },
];

// Authentication middleware
const authMiddleware = (req, res, next) => {
  // Get token from authorization header and extract just the token part
  // .split(' ')[1] separates "Bearer <token>" and gets the token
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid Token" });
  }
};

// Login route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  const token = jwt.sign(
    { id: user.id, username: user.username }, // Data inside the token
    process.env.JWT_SECRET, // Secret key from .env
    { expiresIn: "1h" },
  );
  // Frontend receives this and stores the token
  res.json({
    message: "Login Successful",
    token: token,
    user: { id: user.id, username: user.username },
  });
});

// Protected route - Dashboard
app.get("/api/dashboard", authMiddleware, (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}!`,
    user: req.user,
  });
});

// Protected route - Profile
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Here is your profile",
    profile: {
      id: req.user.id,
      username: req.user.username,
    },
  });
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
