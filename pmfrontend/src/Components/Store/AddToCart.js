// Components/Store/AddToCart.js

import React from 'react';
import './AddToCart.css';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddToCart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const groupedCart = cart.reduce((acc, item) => {
    const existing = acc[item.Pid];
    if (existing) {
      existing.quantity += item.quantity || 1;
    } else {
      acc[item.Pid] = { ...item, quantity: item.quantity || 1 };
    }
    return acc;
  }, {});

  const handleCheckout = async () => {
    try {
      for (const item of Object.values(groupedCart)) {
        const res = await axios.get(`http://localhost:5000/api/inventory/${item.Pid}`);
        const currentStock = res.data.inventory.stock;

        if (currentStock >= item.quantity) {
          // ✅ Stock is enough, proceed
          await axios.put(`http://localhost:5000/api/inventory/${item.Pid}`, {
            stock: currentStock - item.quantity,
          });
        } else {
          alert(`❌ Not enough stock for ${item.name}. Available: ${currentStock}`);
          return; // Stop checkout if any item is insufficient
        }
      }

      // ✅ After stock update success, go to checkout form
      navigate('/checkout');

    } catch (error) {
      console.error("❌ Error during stock update:", error);
      alert("❌ Checkout failed. Please try again.");
    }
  };

  const groupedItems = Object.values(groupedCart);

  return (
    <div className="cart-container">
      <h2>🛒 Your Shopping Cart</h2>
      {groupedItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-grid">
            {groupedItems.map((item) => (
              <div className="cart-item" key={item.Pid}>
                <img src={`http://localhost:5000${item.imageUrl}`} alt={item.name} />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p><strong>Price:</strong> LKR {item.price}</p>
                  <p><strong>Weight:</strong> {item.weight}</p>
                  <p><strong>Description:</strong> {item.Description}</p>
                  <p className="quantity-display"><strong>Quantity:</strong> {item.quantity}</p>
                  <button onClick={() => removeFromCart(item.Pid)}>❌ Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-container">
            <button className="checkout-btn" onClick={handleCheckout}>
              🚀 Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddToCart;
