// controllers/deliveryController.js

const Delivery = require('../models/Delivery');

// Add Delivery
exports.addDelivery = async (req, res) => {
  try {
    const { driverName, destination, deliveryDate, status } = req.body;

    const newDelivery = new Delivery({
      driverName,
      destination,
      deliveryDate,
      status
    });

    await newDelivery.save();

    res.status(201).json({ message: "✅ Delivery added successfully", delivery: newDelivery });
  } catch (error) {
    console.error("❌ Error adding delivery:", error);
    res.status(500).json({ message: "❌ Error adding delivery", error: error.message });
  }
};

// Get all deliveries
exports.getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.status(200).json({ message: "✅ Deliveries fetched successfully", deliveries });
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching deliveries", error: error.message });
  }
};

// Update Delivery
exports.updateDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDelivery = await Delivery.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedDelivery) {
      return res.status(404).json({ message: "❌ Delivery not found" });
    }

    res.status(200).json({ message: "✅ Delivery updated successfully", delivery: updatedDelivery });
  } catch (error) {
    res.status(500).json({ message: "❌ Error updating delivery", error: error.message });
  }
};
