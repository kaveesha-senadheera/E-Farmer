
const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  productId: { type: String, required: true },  
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  stock: { 
    type: Number, 
    required: true, 
    min: [0, "Stock cannot be negative!"] 
  },
  price: { 
    type: Number, 
    required: true, 
    min: [0, "Price cannot be negative!"] 
  },
  restockThreshold: { type: Number, default: 10 },
  lastUpdated: { type: Date, default: Date.now },
});
 
inventorySchema.pre("save", function (next) {
    this.lastUpdated = Date.now();
    next();
});

module.exports = mongoose.model("Inventory", inventorySchema);
