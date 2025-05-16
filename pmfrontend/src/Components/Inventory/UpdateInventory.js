import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, TextField, Button, Typography, Paper, Box } from "@mui/material";

const UpdateInventory = () => {
  const { id } = useParams();
  const [inventoryData, setInventoryData] = useState({
    productId: "",
    itemName: "",
    category: "",
    price: "",
    stock: "",
  });

  const navigate = useNavigate();

  const fetchInventoryData = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/inventory/${id}`);
      setInventoryData(res.data.inventory || {});
    } catch (error) {
      console.error("Error fetching inventory:", error);
      alert("Failed to load inventory details.");
    }
  }, [id]);

  useEffect(() => {
    fetchInventoryData();
  }, [fetchInventoryData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ Validate itemName: Only letters allowed
    if (name === "itemName") {
      const onlyLetters = /^[A-Za-z\s]+$/;
      if (!onlyLetters.test(value)) {
        alert("❌ Item Name can only contain letters.");
        return;
      }
    }

    setInventoryData({ ...inventoryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate Price
    if (parseFloat(inventoryData.price) <= 0) {
      alert("❌ Price must be greater than 0.");
      return;
    }

    // ✅ Validate Stock
    if (parseInt(inventoryData.stock) < 1) {
      alert("❌ Stock must be at least 1.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/inventory/${id}`, inventoryData);
      alert("Inventory updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating inventory:", error);
      alert("Failed to update inventory.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
          ✏️ Update Inventory
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Product ID"
            name="productId"
            value={inventoryData.productId}
            disabled
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
            label="Price per Unit"
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
            inputProps={{ min: 1 }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button variant="contained" color="error" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Update Inventory
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateInventory;
