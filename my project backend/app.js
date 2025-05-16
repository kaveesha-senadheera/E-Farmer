require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const productRoutes = require("./routes/productRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const Supplierroutes = require("./routes/Supplierroutes");
const orderRoutes = require("./routes/orderRoutes"); 
const deliveryRoutes = require("./routes/deliveryRoutes");


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/inventory", inventoryRoutes);
app.use("/api/supplierroute", Supplierroutes);
app.use("/api/orders", orderRoutes);
app.use("/api/deliveries", deliveryRoutes);


mongoose
  .connect("mongodb+srv://sahankusal:Lec2WszISelU190w@cluster0.nlfhk.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
  require('./utils/sendLowStockAlert');

