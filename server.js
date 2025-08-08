const express = require("express");
const cors = require("cors");
const path = require("path");
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

// Routes
const routes = require("./app/routes");
app.use("/api", routes); // mount all API routes here

// Start server
const PORT = 6123;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
