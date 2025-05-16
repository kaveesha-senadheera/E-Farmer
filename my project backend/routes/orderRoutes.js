// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

console.log("Order Routes Loaded");

router.post('/', orderController.placeOrder);
router.get('/', orderController.getAllOrders);
router.put('/:id', orderController.updateOrder);    // ✅ Update order
router.delete('/:id', orderController.deleteOrder);  // ✅ Delete order

module.exports = router;
