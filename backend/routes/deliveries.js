const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery');

// Population strategy explanation:
// Using Mongoose populate() to join Order data through reference
// Note: This creates a LEFT JOIN equivalent between Delivery and Order collections
// Demonstrates document-based relationships vs relational JOINs
router.get('/', async (req, res) => {
  const deliveries = await Delivery.find().populate('orderId');
  res.json(deliveries);
});

// Security note: Direct body update pattern - allows any field modification
// CS306-Risk: Missing input validation and sanitization
// Compare to orders.js: lacks error handling middleware
// Improvement: Add status transition validation (PENDING -> IN_PROGRESS -> COMPLETED)
router.put('/:id', async (req, res) => {
  const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(delivery);
});

module.exports = router;