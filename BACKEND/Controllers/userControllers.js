const User = require("../Model/userModel");
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get User by NIC
const getUserByNIC = async (req, res) => {
    const { nic } = req.params;
    try {
        const user = await User.findOne({ nic });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getUserRole = async (req, res) => {
    const { email } = req.query; // Get email from query parameter

    try {
        // Find user by email
        const user = await User.findOne({ gmail: email });

        // If user not found, send error message
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Return the user's role
        res.status(200).json({ role: user.role });
    } catch (err) {
        console.error("Error fetching user role:", err);
        res.status(500).json({ message: "Server error: " + err.message });
    }
};


const createUser = async (req, res) => {
    const { nic, name, gmail, address, occupation, userType, password } = req.body;

    try {
        // Check if the user already exists by NIC
        const existingUser = await User.findOne({ nic });
        if (existingUser) {
            return res.status(400).json({ message: "User with this NIC already exists" });
        }

        // Hash the password before saving it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user with the hashed password
        const newUser = new User({
            nic,
            name,
            gmail,
            address,
            occupation,
            userType,
            password: password,
        });

        await newUser.save();

        return res.status(201).json({ message: "User created successfully", newUser });
    } catch (err) {
        return res.status(500).json({ message: "Server error: " + err.message });
    }
};

const loginUser = async (req, res) => {
    if (!gmail || !password) {
        return res.status(400).json({ message: "Gmail and password are required" });
      }
    
      try {
        // Find the user by Gmail
        const user = await User.findOne({ gmail });
        if (!user) {
          return res.status(400).json({ message: "User not found" });
        }
    
        // Check if the entered password matches the one in the database (Plain text comparison)
        if (user.password !== password) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
    
        // If login is successful
        res.status(200).json({ message: "Login successful", user });
      } catch (err) {
        return res.status(500).json({ message: "Server error: " + err.message });
      }
    };
  
  


const updateUserByNIC = async (req, res) => {
    const { nic } = req.params;
    const updates = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate({ nic }, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", updatedUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const deleteUserByNIC = async (req, res) => {
    const { nic } = req.params;
    try {
        const deletedUser = await User.findOneAndDelete({ nic });
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllUsers,
    getUserByNIC,
    createUser,
    updateUserByNIC,
    deleteUserByNIC,
    getUserRole,
    loginUser
};
