// controllers/orderController.js

const Order = require('../models/Order');

// Place a new order
exports.placeOrder = async (req, res) => {
  try {
    const { customerName, customerAddress, customerPhone, province, city, postalCode, orderedProducts, totalAmount } = req.body;

    if (!customerName || !customerAddress || !customerPhone || !province || !city || !postalCode || !orderedProducts || !totalAmount) {
      return res.status(400).json({ message: "❌ Missing required order fields" });
    }

    const newOrder = new Order({
      customerName,
      customerAddress,
      customerPhone,
      province,
      city,
      postalCode,
      orderedProducts,
      totalAmount,
    });

    await newOrder.save();

    res.status(201).json({ message: "✅ Order placed successfully!", order: newOrder });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    res.status(500).json({ message: "❌ Error placing order", error: error.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ message: "✅ Orders fetched successfully", orders });
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching orders", error: error.message });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: "❌ Order not found" });
    }

    res.status(200).json({ message: "✅ Order updated successfully", order: updatedOrder });
  } catch (error) {
    console.error("❌ Error updating order:", error);
    res.status(500).json({ message: "❌ Error updating order", error: error.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "❌ Order not found" });
    }

    res.status(200).json({ message: "✅ Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error deleting order", error: error.message });
  }
};

