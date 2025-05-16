// routes/deliveryRoutes.js

const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');

console.log("Delivery Routes Loaded");

router.post('/', deliveryController.addDelivery);
router.get('/', deliveryController.getAllDeliveries);
router.put('/:id', deliveryController.updateDelivery);

module.exports = router;
