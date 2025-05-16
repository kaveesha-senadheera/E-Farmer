const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  Pid: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: String, required: true },
  Description: { type: String, required: true },
  imageUrl: { type: String, required: false }
});

module.exports = mongoose.model("Product", productSchema);
