const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nic: { 
        type: String, 
        required: true, 
        unique: true 
    },
    name: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^[A-Za-z ]+$/.test(v);
            },
            message: 'Name should only contain letters and spaces'
        }
    },
    gmail: { 
        type: String, 
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: 'Please enter a valid email address'
        }
    },
    address: { 
        type: String, 
        required: true 
    },
    occupation: { 
        type: String, 
        required: true 
    },
    userType: { 
        type: String, 
        enum: ["retail", "wholesale", "admin"], 
        required: true 
    },
    companyName: { 
        type: String,
        required: function() {
            return this.userType === "retail" || this.userType === "wholesale";
        }
    },
    taxId: { 
        type: String,
        required: function() {
            return this.userType === "retail" || this.userType === "wholesale";
        }
    },
    password: { 
        type: String, 
        required: true,
        minlength: 6
    },
    role: { 
        type: String, 
        enum: ["admin", "user"], 
        default: "user"
    }
});

module.exports = mongoose.model("User", userSchema);
