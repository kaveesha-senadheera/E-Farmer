import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";

const InsertInventory = () => {
  const [inventoryData, setInventoryData] = useState({
    productId: "",
    itemName: "",
    category: "",
    price: "",
    stock: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "itemName") {
      // ❗ Allow only letters and spaces for Item Name
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) {
        return; // If not valid, ignore the typing
      }
    }

    setInventoryData({ ...inventoryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Additional Validations before sending
    if (!inventoryData.productId.trim()) {
      alert("❌ Product ID is required.");
      return;
    }

    if (!inventoryData.itemName.trim()) {
      alert("❌ Item Name is required.");
      return;
    }

    if (!inventoryData.category.trim()) {
      alert("❌ Category is required.");
      return;
    }

    if (inventoryData.price === "" || parseFloat(inventoryData.price) <= 1) {
      alert("❌ Price must be a positive number.");
      return;
    }

    if (inventoryData.stock === "" || parseInt(inventoryData.stock) < 1) {
      alert("❌ Stock must be zero or a positive number.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/inventory", inventoryData);
      alert("✅ Inventory added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding inventory:", error);
      alert("❌ Failed to add inventory.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
          ➕ Add New Inventory
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Product ID"
            name="productId"
            value={inventoryData.productId}
            onChange={handleChange}
            required
            margin="dense"
          />
          <TextField
            fullWidth
            label="Item Name"
            name="itemName"
            value={inventoryData.itemName}
            onChange={handleChange}
            required
            margin="dense"
            helperText="Only letters and spaces allowed"
          />
          <TextField
            fullWidth
            label="Category"
            name="category"
            value={inventoryData.category}
            onChange={handleChange}
            required
            margin="dense"
          />
          <TextField
            fullWidth
            label="Price per Unit (LKR)"
            name="price"
            type="number"
            value={inventoryData.price}
            onChange={handleChange}
            required
            margin="dense"
            inputProps={{ min: 1 }}
          />
          <TextField
            fullWidth
            label="Stock"
            name="stock"
            type="number"
            value={inventoryData.stock}
            onChange={handleChange}
            required
            margin="dense"
            inputProps={{ min: 0 }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button variant="contained" color="error" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Add Inventory
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default InsertInventory;
