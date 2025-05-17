const mongoose = require('mongoose');

/**
 * Delivery model schema for tracking package deliveries
 * Designed by: [Student Name] | Course: CS305 - Database Systems
 * 
 * Key design choices:
 * - Optional fields (required:false) allow flexible data entry during development
 * - orderId reference enables linking to Order model (MongoDB population)
 * - Status enum covers basic lifecycle but lacks real-world states like CANCELLED
 * - Missing validation hooks that could ensure data integrity
 */
const deliverySchema = new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: false // Optional to allow standalone deliveries
    },
    driverName: {
        type: String,
        required: false // Should be required in production
    },
    destination: {
        type: String,
        required: false // Matches Order.province but should be validated
    },
    deliveryDate: {
        type: Date,
        required: false // Should have min/max validation
    },
    status: {
        type: String,
        enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'INCOMPLETE'],
        default: 'PENDING' // Simple state machine - consider adding transitions
    }
});

/**
 * Comparison with other models:
 * - User model has similar optional fields (phone/email)
 * - Order schema lacks delivery reference (one-way relationship)
 * - All models share Mongoose but have inconsistent validation approaches
 * 
 * Potential improvements:
 * 1. Add pre-save hook to validate deliveryDate > orderDate
 * 2. Implement driver license number validation
 * 3. Add geolocation tracking fields
 * 4. Create indexes for frequent status queries
 */

module.exports = mongoose.model('Delivery', deliverySchema);