const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nic: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    gmail: { type: String, required: true },
    address: { type: String, required: true },
    occupation: { type: String, required: true },
    userType: { type: String, enum: ["retail", "wholesale"], required: true },
    companyName: { type: String },
    taxId: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" }, // ✅ Added role
});

module.exports = mongoose.model("User", userSchema);
