const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Add Product 
router.post("/add", upload.single("image"), productController.addProduct);

// Get All Products
router.get("/", productController.getAllProducts);

// Get Product by Pid
router.get("/:Pid", productController.getProductById);

// Update Product
router.put("/:Pid", upload.single("image"), productController.updateProduct);

// Delete Product by Pid
router.delete("/:Pid", productController.deleteProduct);

module.exports = router;
