const Product = require("../models/product");
const multer = require("multer");
const path = require("path");

// Add a New Product 
exports.addProduct = async (req, res) => {
  try {
      const { Pid, name, price, weight, Description } = req.body;
      let imageUrl = "";

      
      if (req.file) {
          imageUrl = `/uploads/${req.file.filename}`;
      }

      
      const existingProduct = await Product.findOne({ Pid });
      if (existingProduct) {
          return res.status(400).json({ message: "Product ID already exists!" });
      }

      const newProduct = new Product({
          Pid,
          name,
          price,
          weight,
          Description,
          imageUrl
      });

      await newProduct.save();
      res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
      res.status(500).json({ message: "Error adding product", error });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

// Get a Single Product by Pid
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ Pid: req.params.Pid });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
};

// Update Product 
exports.updateProduct = async (req, res) => {
  try {
      const { name, price, weight, Description } = req.body;
      let imageUrl = req.body.imageUrl;

      
      if (req.file) {
          imageUrl = `/uploads/${req.file.filename}`;
      }

      const updatedProduct = await Product.findOneAndUpdate(
          { Pid: req.params.Pid },
          { name, price, weight, Description, imageUrl },
          { new: true }
      );

      if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product updated successfully!", product: updatedProduct });
  } catch (error) {
      res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete Product by Pid
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ Pid: req.params.Pid });

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};
