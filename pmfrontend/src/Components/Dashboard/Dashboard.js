import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");
  const [outOfStockOpen, setOutOfStockOpen] = useState(false); // ✅ For Dialog
  const navigate = useNavigate();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/inventory");
      setInventory(res.data.inventory || []);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:5000/api/inventory/${productId}`);
        fetchInventory();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const outOfStockItems = inventory.filter(item => parseInt(item.stock) === 0);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Container sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" sx={{ my: 3, textAlign: "center" }}>
          📦 Inventory Management
        </Typography>

        {/* Inventory Stats */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, bgcolor: "#8e44ad", color: "white" }}>
              <Typography>Total Products</Typography>
              <Typography variant="h5">{inventory.length}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, bgcolor: "#27ae60", color: "white" }}>
              <Typography>Total Store Value</Typography>
              <Typography variant="h5">
                LKR {inventory.reduce((sum, item) => {
                  const price = parseFloat(item.price) || 0;
                  const stock = parseInt(item.stock) || 0;
                  return sum + price * stock;
                }, 0).toFixed(2)}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {/* ✅ Made it clickable */}
            <Paper 
              sx={{ p: 2, bgcolor: "#e74c3c", color: "white", cursor: "pointer" }}
              onClick={() => setOutOfStockOpen(true)}
            >
              <Typography>Out of Stock</Typography>
              <Typography variant="h5">
                {outOfStockItems.length}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, bgcolor: "#f39c12", color: "white" }}>
              <Typography>All Categories</Typography>
              <Typography variant="h5">
                {[...new Set(inventory.map((item) => item.category))].length}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Search Bar */}
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Search by Product ID..."
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        {/* Inventory Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#ecf0f1" }}>
              <TableRow>
                <TableCell><strong>Product ID</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>Price per Unit</strong></TableCell>
                <TableCell><strong>Stock</strong></TableCell>
                <TableCell><strong>Total Value</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory
                .filter((item) => item.productId.toString().includes(search))
                .map((item) => (
                  <TableRow key={item.productId}>
                    <TableCell>{item.productId}</TableCell>
                    <TableCell>{item.itemName}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>LKR {parseFloat(item.price) || 0}</TableCell>
                    <TableCell>{parseInt(item.stock) || 0}</TableCell>
                    <TableCell>LKR {(parseFloat(item.price) || 0) * (parseInt(item.stock) || 0)}</TableCell>
                    <TableCell>
                      <IconButton
                        color="warning"
                        onClick={() => navigate(`/update-inventory/${item.productId}`)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(item.productId)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* ✅ Out of Stock Dialog */}
        <Dialog open={outOfStockOpen} onClose={() => setOutOfStockOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ bgcolor: "#e74c3c", color: "white" }}>
            🚨 Out of Stock Items
          </DialogTitle>
          <DialogContent dividers>
            {outOfStockItems.length === 0 ? (
              <Typography>No out of stock items!</Typography>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Product ID</strong></TableCell>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Category</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {outOfStockItems.map((item) => (
                    <TableRow key={item.productId}>
                      <TableCell>{item.productId}</TableCell>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>{item.category}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOutOfStockOpen(false)} color="primary" variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Dashboard;
