const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/userRoutes");

const app = express();
const cors = require("cors");
const session = require("express-session");
const PORT = process.env.PORT || 5002;

// Middleware
app.use(express.json()); 
app.use(cors());
app.use("/users", router);

// Connect to MongoDB
mongoose.connect("mongodb+srv://DininduNimantha:hQYSOi4qM3w4TLAN@cluster0.che43.mongodb.net/")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.log("MongoDB Connection Error:", err));
