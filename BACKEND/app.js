const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/userRoutes");

const app = express();
const cors = require("cors");
const session = require("express-session");
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use("/users", router);

// MongoDB connection
mongoose.connect("mongodb+srv://DininduNimantha:hQYSOi4qM3w4TLAN@cluster0.che43.mongodb.net/")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error("MongoDB connection error:", err));
