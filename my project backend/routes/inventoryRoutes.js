const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

console.log("Inventory Routes Loaded");

// Add a new inventory item (this was missing)
router.post("/", (req, res) => {
    console.log("POST /api/inventory called with:", req.body);
    inventoryController.addInventoryItem(req, res);
});

// Get all inventory items
router.get("/", inventoryController.getAllInventory);

// Get inventory item by productId
router.get("/:productId", (req, res) => {
    console.log("GET /api/inventory/:productId called with:", req.params);
    inventoryController.getInventoryByProductId(req, res);
});

// Update inventory item by productId
router.put("/:productId", (req, res) => {
    console.log("PUT /api/inventory/:productId called with:", req.params);
    inventoryController.updateInventoryByProductId(req, res);
});

// Delete inventory item by productId
router.delete("/:productId", (req, res) => {
    console.log("DELETE /api/inventory/:productId called with:", req.params);
    inventoryController.deleteInventoryByProductId(req, res);
});

// Route to Generate Report
router.get("/report/inventory", inventoryController.getInventoryReport);

module.exports = router;
