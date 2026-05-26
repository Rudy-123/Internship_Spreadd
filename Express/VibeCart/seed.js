require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("./models/category");
const Product = require("./models/product");
const Review = require("./models/review");
const Order = require("./models/order");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding");
  } catch (error) {
    console.log("DB Connection Error", error.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Review.deleteMany({});
    await Order.deleteMany({});
    console.log("Cleared existing data");

    // Create Categories
    const categories = await Category.insertMany([
      {
        name: "Electronics",
        description: "Electronic gadgets and devices",
      },
      {
        name: "Fashion",
        description: "Clothing and accessories",
      },
      {
        name: "Home & Garden",
        description: "Home decor and garden items",
      },
      {
        name: "Sports",
        description: "Sports equipment and gear",
      },
    ]);
    console.log("✅ Categories created:", categories.length);

    // Create Products
    const products = await Product.insertMany([
      {
        name: "Wireless Headphones",
        description: "High-quality noise-canceling headphones",
        price: 2999,
        stock: 50,
        category: categories[0]._id,
        image: "headphones.jpg",
        rating: 4.5,
      },
      {
        name: "Smart Watch",
        description: "Advanced fitness tracking smartwatch",
        price: 5999,
        stock: 30,
        category: categories[0]._id,
        image: "smartwatch.jpg",
        rating: 4.8,
      },
      {
        name: "USB-C Cable",
        description: "Fast charging USB-C cable",
        price: 499,
        stock: 200,
        category: categories[0]._id,
        image: "usbc.jpg",
        rating: 4.2,
      },
      {
        name: "Cotton T-Shirt",
        description: "Comfortable cotton t-shirt in various colors",
        price: 599,
        stock: 150,
        category: categories[1]._id,
        image: "tshirt.jpg",
        rating: 4.3,
      },
      {
        name: "Denim Jeans",
        description: "Classic blue denim jeans",
        price: 1499,
        stock: 80,
        category: categories[1]._id,
        image: "jeans.jpg",
        rating: 4.6,
      },
      {
        name: "Running Shoes",
        description: "Lightweight running shoes with good grip",
        price: 3499,
        stock: 60,
        category: categories[1]._id,
        image: "shoes.jpg",
        rating: 4.7,
      },
      {
        name: "Table Lamp",
        description: "Modern LED table lamp with adjustable brightness",
        price: 1299,
        stock: 40,
        category: categories[2]._id,
        image: "lamp.jpg",
        rating: 4.4,
      },
      {
        name: "Wall Clock",
        description: "Stylish wall clock for living room",
        price: 899,
        stock: 70,
        category: categories[2]._id,
        image: "clock.jpg",
        rating: 4.1,
      },
      {
        name: "Coffee Maker",
        description: "Automatic coffee maker with timer",
        price: 2499,
        stock: 35,
        category: categories[2]._id,
        image: "coffee.jpg",
        rating: 4.5,
      },
      {
        name: "Yoga Mat",
        description: "Non-slip yoga mat for exercise",
        price: 799,
        stock: 100,
        category: categories[3]._id,
        image: "yogamat.jpg",
        rating: 4.3,
      },
      {
        name: "Dumbbells Set",
        description: "Adjustable dumbbells set (10kg)",
        price: 4999,
        stock: 25,
        category: categories[3]._id,
        image: "dumbbells.jpg",
        rating: 4.6,
      },
      {
        name: "Water Bottle",
        description: "Insulated water bottle - keeps cold for 24 hours",
        price: 649,
        stock: 120,
        category: categories[3]._id,
        image: "bottle.jpg",
        rating: 4.4,
      },
    ]);
    console.log("✅ Products created:", products.length);

    // Create Reviews
    const reviews = await Review.insertMany([
      {
        rating: 5,
        comment: "Amazing quality! Highly recommended.",
        product: products[0]._id,
        userName: "Rudra",
      },
      {
        rating: 4,
        comment: "Good product, delivery was fast.",
        product: products[1]._id,
        userName: "John",
      },
      {
        rating: 5,
        comment: "Best headphones I have ever used!",
        product: products[0]._id,
        userName: "Jane",
      },
      {
        rating: 4,
        comment: "Great fit and comfortable.",
        product: products[3]._id,
        userName: "Mike",
      },
      {
        rating: 5,
        comment: "Perfect running shoes, very comfortable!",
        product: products[5]._id,
        userName: "Sarah",
      },
    ]);
    console.log("Reviews created:", reviews.length);

    // Create Orders
    const orders = await Order.insertMany([
      {
        orderNumber: 1001,
        products: [
          {
            product: products[0]._id,
            quantity: 1,
            price: 2999,
          },
        ],
        totalprice: 2999,
        customerName: "Rudra Patel",
        customerEmail: "rudra@gmail.com",
        status: "Delivered",
      },
      {
        orderNumber: 1002,
        products: [
          {
            product: products[3]._id,
            quantity: 2,
            price: 599,
          },
          {
            product: products[2]._id,
            quantity: 1,
            price: 499,
          },
        ],
        totalprice: 1697,
        customerName: "John Doe",
        customerEmail: "john@example.com",
        status: "Shipped",
      },
      {
        orderNumber: 1003,
        products: [
          {
            product: products[5]._id,
            quantity: 1,
            price: 3499,
          },
        ],
        totalprice: 3499,
        customerName: "Jane Smith",
        customerEmail: "jane@example.com",
        status: "Pending",
      },
    ]);
    console.log("✅ Orders created:", orders.length);

    console.log("\n✅ Database seeded successfully!");
    console.log(`
    Summary:
    - Categories: ${categories.length}
    - Products: ${products.length}
    - Reviews: ${reviews.length}
    - Orders: ${orders.length}
    `);

    process.exit(0);
  } catch (error) {
    console.log("Error seeding database:", error.message);
    process.exit(1);
  }
};

// Run the seed
connectDB().then(() => seedDatabase());
