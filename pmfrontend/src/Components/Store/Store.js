import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import './Store.css';
import { Snackbar, Alert } from '@mui/material';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);  // ✅ Inventory fetched separately
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
    fetchInventory();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
      setFilteredProducts(res.data);
      const initialQuantities = {};
      res.data.forEach(p => initialQuantities[p.Pid] = 1);
      setQuantities(initialQuantities);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchInventory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/inventory");
      setInventory(res.data.inventory);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    }
  };

  const getStockForProduct = (Pid) => {
    const item = inventory.find(inv => inv.productId === Pid);
    return item ? item.stock : null; // If found, return stock, else null
  };

  useEffect(() => {
    let updatedProducts = products;

    if (selectedCategory !== "All") {
      updatedProducts = updatedProducts.filter(p => p.category && p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (searchQuery.trim() !== "") {
      updatedProducts = updatedProducts.filter(p => 
        p.name && p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  }, [searchQuery, selectedCategory, products]);

  const handleAddToCart = (product) => {
    const quantity = quantities[product.Pid] || 1;
    addToCart({ ...product, quantity });
    setSnackbar({ open: true, message: `${product.name} x${quantity} added to cart!` });
  };

  const handleProductClick = (product) => {
    navigate(`/store/product/${product.Pid}`, { state: { product } });
  };

  const increaseQty = (id) => {
    setQuantities(prev => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const decreaseQty = (id) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) - 1) }));
  };

  return (
    <div>
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="store-container">
        <h2 className="section-title">🌾 Our Fresh Products 🌾</h2>
        <div className="product-grid">
          {filteredProducts.map((product) => {
            const stock = getStockForProduct(product.Pid); // ✅ Get stock for this product

            return (
              <div className="product-card" key={product.Pid}>
                <img
                  src={`http://localhost:5000${product.imageUrl}`}
                  alt={product.name}
                  onClick={() => handleProductClick(product)}
                />
                <h3>{product.name}</h3>
                <p><strong>Weight:</strong> {product.weight}</p>
                <p><strong>Price:</strong> LKR {product.price}</p>
                <p className="description">{product.Description}</p>

                {/* ✅ Show Out of Stock */}
                {stock === 0 && (
                  <p style={{ color: "red", fontWeight: "bold" }}>Out of Stock</p>
                )}

                <div className="qty-control">
                  <button onClick={() => decreaseQty(product.Pid)} disabled={stock === 0}>-</button>
                  <span>{quantities[product.Pid] || 1}</span>
                  <button onClick={() => increaseQty(product.Pid)} disabled={stock === 0}>+</button>
                </div>

                <button
                  className="buy-btn"
                  onClick={() => handleAddToCart(product)}
                  disabled={stock === 0}
                >
                  🛒 Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity="success">{snackbar.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default Store;
