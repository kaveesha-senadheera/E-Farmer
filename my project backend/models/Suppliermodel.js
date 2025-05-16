// models/Suppliermodel.js

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    Supplier_ID: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    },
    Suppliername: { type: String, required: true },
    Supplier_company: { type: String, required: true },
    Supplier_email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return v != null && v.trim() !== "";
            },
            message: "Supplier_email cannot be null or empty"
        }
    },
    Supplier_contactnumber: { type: String, required: true },
    Supplier_quantity: { type: Number, required: true, min: 1 },
    Supplier_unitprice: { type: Number, required: true, min: 0 },
    Supplier_totalprice: { type: Number, required: true, min: 0 }
}, { timestamps: true });

// Automatically calculate total price
supplierSchema.pre("save", function (next) {
    this.Supplier_totalprice = this.Supplier_quantity * this.Supplier_unitprice;
    next();
});

module.exports = mongoose.model("Supplier", supplierSchema);
