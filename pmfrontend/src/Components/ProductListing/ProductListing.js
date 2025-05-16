import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from "@mui/material";

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [newProduct, setNewProduct] = useState({
        Pid: "",
        name: "",
        weight: "",
        price: "",
        Description: "",
        imageUrl: null,
    });

    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
            setProducts(res.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setNewProduct({ ...newProduct, imageUrl: file });

        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const validateProduct = () => {
        if (!newProduct.Pid || !newProduct.name || !newProduct.weight || !newProduct.price || !newProduct.Description) {
            setSnackbar({ open: true, message: "All fields are required!", severity: "error" });
            return false;
        }
    
        // ✅ Product Name should NOT contain numbers or symbols
        const namePattern = /^[A-Za-z\s]+$/;
        if (!namePattern.test(newProduct.name)) {
            setSnackbar({ open: true, message: "Product name must contain only letters.", severity: "error" });
            return false;
        }
    
        // ✅ Weight should be something like "500g", "1kg" (basic pattern check)
        const weightPattern = /^[0-9]+(g|kg|G|KG)$/;
        if (!weightPattern.test(newProduct.weight)) {
            setSnackbar({ open: true, message: "Weight must be a number followed by 'g' or 'kg' (e.g., 500g, 1kg).", severity: "error" });
            return false;
        }
    
        // ✅ Price must be a positive number
        if (parseFloat(newProduct.price) <= 0) {
            setSnackbar({ open: true, message: "Price must be a positive number.", severity: "error" });
            return false;
        }
    
        return true;
    };
    

    const handleSave = async () => {
        if (!validateProduct()) return;

        const formData = new FormData();
        formData.append("Pid", newProduct.Pid);
        formData.append("name", newProduct.name);
        formData.append("weight", newProduct.weight);
        formData.append("price", newProduct.price);
        formData.append("Description", newProduct.Description);
        if (newProduct.imageUrl) formData.append("image", newProduct.imageUrl);

        try {
            if (editingProduct) {
                await axios.put(`http://localhost:5000/api/products/${editingProduct.Pid}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                setSnackbar({ open: true, message: "Product updated successfully!", severity: "success" });
            } else {
                await axios.post("http://localhost:5000/api/products/add", formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                setSnackbar({ open: true, message: "Product added successfully!", severity: "success" });
            }
            setOpen(false);
            fetchProducts();
        } catch (error) {
            setSnackbar({ open: true, message: "Error saving product!", severity: "error" });
            console.error("Error saving product:", error);
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setNewProduct({
            Pid: product.Pid,
            name: product.name,
            weight: product.weight,
            price: product.price,
            Description: product.Description,
            imageUrl: null
        });
        setImagePreview(`http://localhost:5000${product.imageUrl}`);
        setOpen(true);
    };

    const handleAdd = () => {
        setEditingProduct(null);
        setNewProduct({ Pid: "", name: "", weight: "", price: "", Description: "", imageUrl: null });
        setImagePreview(null);
        setOpen(true);
    };

    const handleDelete = async (Pid) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${Pid}`);
            setSnackbar({ open: true, message: "Product deleted successfully!", severity: "success" });
            fetchProducts();
        } catch (error) {
            setSnackbar({ open: true, message: "Error deleting product!", severity: "error" });
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", color: "#333" }}>📦 Product Listing</h2>
            <Button variant="contained" color="primary" onClick={handleAdd} style={{ marginBottom: "10px" }}>
                ➕ Add Product
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#f2f2f2" }}>
                            <TableCell><b>Product ID</b></TableCell>
                            <TableCell><b>Image</b></TableCell>
                            <TableCell><b>Name</b></TableCell>
                            <TableCell><b>Weight</b></TableCell>
                            <TableCell><b>Price</b></TableCell>
                            <TableCell><b>Description</b></TableCell>
                            <TableCell><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.Pid}>
                                <TableCell>{product.Pid}</TableCell>
                                <TableCell>
                                    <img src={`http://localhost:5000${product.imageUrl}`} alt={product.name} width="50" height="50" style={{ borderRadius: "5px" }} />
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.weight}</TableCell>
                                <TableCell>LKR {product.price}</TableCell>
                                <TableCell>{product.Description}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleEdit(product)}>
                                        ✏️ Edit
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(product.Pid)} style={{ marginLeft: "5px" }}>
                                        🗑️ Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle style={{ backgroundColor: "#1976d2", color: "white", textAlign: "center" }}>
                    {editingProduct ? "Edit Product" : "Add New Product"}
                </DialogTitle>
                <DialogContent style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <TextField fullWidth label="Product ID" value={newProduct.Pid} onChange={(e) => setNewProduct({ ...newProduct, Pid: e.target.value })} disabled={!!editingProduct} />
                    <TextField fullWidth label="Product Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                    <TextField fullWidth label="Weight" value={newProduct.weight} onChange={(e) => setNewProduct({ ...newProduct, weight: e.target.value })} />
                    <TextField fullWidth label="Price" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                    <TextField fullWidth label="Description" value={newProduct.Description} onChange={(e) => setNewProduct({ ...newProduct, Description: e.target.value })} />

                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: "100px", height: "100px", borderRadius: "5px", margin: "auto" }} />}

                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">{editingProduct ? "Update" : "Add"}</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </div>
    );
};

export default ProductListing;
