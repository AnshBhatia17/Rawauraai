const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config()

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files (optional)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.static('public'));

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// Load routes (if any)
const routes = require("./app/routes");
// app.use("/", routes);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
