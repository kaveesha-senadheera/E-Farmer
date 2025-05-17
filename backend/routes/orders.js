const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Delivery = require('../models/Delivery');

router.get('/', async (req, res) => {
  // Basic GET implementation - missing pagination and error handling
  const orders = await Order.find();
  res.json(orders);
});

// Order creation with linked delivery (note: transaction would be better here)
// CS305 Learning: This creates two separate documents without atomicity
router.post('/', async (req, res) => {
  // No input validation - security risk (CS306 Security Fundamentals)
  const order = new Order(req.body);
  await order.save();

  // Delivery creation should be in transaction with order creation
  const delivery = new Delivery({
    orderId: order._id,
    destination: order.address,
    status: 'PENDING'
  });
  await delivery.save();

  res.status(201).json(order);
});

// Basic update operation - consider adding validation middleware
// DBMS Note: findByIdAndUpdate bypasses Mongoose validation
router.put('/:id', async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(order);
});

// Cascade delete pattern - ensure DB consistency
// Improvement: Add error handling for missing documents
router.delete('/:id', async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  await Delivery.deleteOne({ orderId: req.params.id });
  res.status(204).send();
});

module.exports = router;