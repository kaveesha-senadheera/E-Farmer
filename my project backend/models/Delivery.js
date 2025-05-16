// models/Delivery.js

const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  driverName: { type: String, required: true },
  destination: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
  status: { type: String, enum: ["PENDING", "IN_PROGRESS", "COMPLETED", "INCOMPLETE"], default: "PENDING" }
}, { timestamps: true });

module.exports = mongoose.model('Delivery', deliverySchema);
