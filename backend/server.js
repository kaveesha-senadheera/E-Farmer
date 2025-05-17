// Main server configuration file
// CS305 Course Project - Express Server Setup

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// Configure middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing (needed for frontend/backend communication)
app.use(express.json()); // Parse incoming JSON requests (body-parser alternative)

// Database connection setup 
mongoose.connect(
  "mongodb+srv://admin:5BwHv76h3cq8V3Ed@cluster0.wuvf6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)

  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

// API Route organization
// Route structure follows RESTful conventions:
// - /api/:resource for core data entities
// - Routes delegated to separate files for maintainability
app.use("/api/users", require("./routes/users"));  // User management endpoints
app.use("/api/orders", require("./routes/orders"));  // Order processing endpoints
app.use("/api/deliveries", require("./routes/deliveries"));  // Delivery tracking endpoints

// Server port configuration
// process.env.PORT allows deployment platforms to set port (e.g., Heroku)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
