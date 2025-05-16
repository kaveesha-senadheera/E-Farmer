const mongoose = require("mongoose");
const Inventory = require("../models/Inventory");
const { Parser } = require("json2csv");
const sendLowStockAlert = require("../utils/sendLowStockAlert");


exports.addInventoryItem = async (req, res) => {
    try {
        const { productId, itemName, category, price, stock, restockThreshold } = req.body;

        if (!productId || typeof productId !== "string") {
            return res.status(400).json({ message: "❌ productId must be a valid string" });
        }

        if (stock < 0) {
            return res.status(400).json({ message: "❌ Stock cannot be negative!" });
        }

        if (price < 0) {
            return res.status(400).json({ message: "❌ Price cannot be negative!" });
        }

        const newInventoryItem = new Inventory({
            productId, 
            itemName,
            category,
            price,
            stock,
            restockThreshold,
        });

        await newInventoryItem.save();
        res.status(201).json({ message: "✅ Inventory item added", inventory: newInventoryItem });
    } catch (error) {
        res.status(500).json({ message: "❌ Error adding inventory item", error: error.message });
    }
};

// Update Inventory Item by Product ID 
exports.updateInventoryByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        console.log("📌 Updating inventory for:", productId);

        const { stock, price } = req.body;

        if (stock !== undefined && stock < 0) {
            return res.status(400).json({ message: "❌ Stock cannot be negative!" });
        }

        if (price !== undefined && price < 0) {
            return res.status(400).json({ message: "❌ Price cannot be negative!" });
        }

        const updatedInventory = await Inventory.findOneAndUpdate(
            { productId },  
            req.body,
            { new: true }
        );

        if (!updatedInventory) {
            return res.status(404).json({ message: "❌ Inventory item not found" });
        }
        // 📧 Check for low stock and send alert if necessary
        if (updatedInventory.stock < updatedInventory.restockThreshold) {
            await sendLowStockAlert(updatedInventory);
        }

        res.status(200).json({ message: "✅ Inventory item updated", inventory: updatedInventory });
    } catch (error) {
        res.status(500).json({ message: "❌ Error updating inventory", error: error.message });
    }
};

// Get All Inventory Items
exports.getAllInventory = async (req, res) => {
    try {
        const inventory = await Inventory.find(); 
        res.status(200).json({ message: "✅ Inventory list", inventory });
    } catch (error) {
        res.status(500).json({ message: "❌ Error fetching inventory", error: error.message });
    }
};

// Get Inventory Item by Product ID
exports.getInventoryByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        console.log("📌 Searching for productId:", productId);

        const inventory = await Inventory.findOne({ productId });

        if (!inventory) {
            return res.status(404).json({ message: "❌ Inventory item not found" });
        }

        res.status(200).json({ message: "✅ Inventory item found", inventory });
    } catch (error) {
        res.status(500).json({ message: "❌ Error retrieving inventory item", error: error.message });
    }
};

// Delete Inventory Item by Product ID
exports.deleteInventoryByProductId = async (req, res) => {
    try {
        const { productId } = req.params;
        console.log("📌 Deleting inventory for:", productId);

        const deletedInventory = await Inventory.findOneAndDelete({ productId });

        if (!deletedInventory) {
            return res.status(404).json({ message: "❌ Inventory item not found" });
        }

        res.status(200).json({ message: "✅ Inventory item deleted" });
    } catch (error) {
        res.status(500).json({ message: "❌ Error deleting inventory", error: error.message });
    }
};

// Function to Update Product Stock Based on Inventory Changes
exports.updateStock = async (productID, quantity) => {
    try {
        let product = await Product.findOne({ productID });
        if (product) {
            product.stock += quantity;
            await product.save();
        }
    } catch (error) {
        console.error("Error updating stock:", error.message);
    }
};

// Generate Inventory Report
exports.getInventoryReport = async (req, res) => {
    try {
        const inventory = await Inventory.find();

        const reportData = inventory.map(item => ({
            productId: item.productId,
            itemName: item.itemName,
            category: item.category,
            pricePerUnit: item.price,
            totalValue: item.price * item.stock,
            lastUpdated: item.lastUpdated.toISOString().split('T')[0],
        }));

        if (req.query.format === "csv") {
            const fields = ["productId", "itemName", "category", "pricePerUnit", "totalValue", "lastUpdated"];
            const json2csv = new Parser({ fields });
            const csv = json2csv.parse(reportData);
            res.header("Content-Type", "text/csv");
            res.attachment("InventoryReport.csv");
            return res.send(csv);
        } else {
            return res.status(200).json(reportData);
        }
    } catch (error) {
        res.status(500).json({ message: "❌ Error generating report", error: error.message });
    }
};
