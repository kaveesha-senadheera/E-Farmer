const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // User reference (currently disabled) - uncomment and require once user system is implemented
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Frontend-required fields marked optional in backend (data consistency risk)
    firstName: { type: String, required: false }, // Frontend enforces required but backend allows null
    lastName: { type: String, required: false }, // Should match frontend validation if data integrity needed
    address: { type: String, required: false }, // Consider adding length validation
    province: { type: String, required: false }, // Could implement enum for valid provinces
    city: { type: String, required: false }, // Coordinate with frontend's city selection
    postalCode: { type: String, required: false }, // Add regex validation for postal format
    mobileNo: { type: String, required: false }, // Add phone number format validation

    // Payment method enum matches frontend options but has empty default state
    paymentMethod: {
        type: String,
        enum: ['CASH_ON_DELIVERY', 'PAY_ONLINE'], // Frontend has empty default option not in enum
        required: false // Should be required if payment is mandatory
    }
});

module.exports = mongoose.model('Order', orderSchema);