const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'public'))); // includes /processed

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");

  // Load routes AFTER DB connection
  const routes = require("./app/routes");
  app.use("/", routes);

  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
  process.exit(1);
});
