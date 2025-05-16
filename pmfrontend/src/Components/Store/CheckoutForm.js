// Components/Store/CheckoutForm.js

import React, { useState } from 'react';
import './CheckoutForm.css';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutForm = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: '',
    customerAddress: '',
    province: '',
    city: '',
    postalCode: '',
    customerPhone: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^\d{10}$/;
    const postalRegex = /^\d{5,}$/;

    if (!nameRegex.test(formData.customerName)) {
      alert("❌ Name should only contain letters and spaces.");
      return false;
    }
    if (!phoneRegex.test(formData.customerPhone)) {
      alert("❌ Phone number must be exactly 10 digits.");
      return false;
    }
    if (!postalRegex.test(formData.postalCode)) {
      alert("❌ Postal code must be at least 5 digits.");
      return false;
    }
    return true;
  };

  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const orderDetails = {
        customerName: formData.customerName,
        customerAddress: formData.customerAddress,
        province: formData.province,
        city: formData.city,
        postalCode: formData.postalCode,
        customerPhone: formData.customerPhone,
        orderedProducts: cart.map(item => ({
          productId: item.Pid,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: totalAmount,
      };

      const response = await axios.post("http://localhost:5000/api/orders", orderDetails);

      if (response.status === 201) {
        alert("✅ Order placed successfully!");
        clearCart();
        navigate('/payment', { state: { totalAmount: orderDetails.totalAmount } }); // ✅ Correctly send totalAmount
      }
    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("❌ Failed to place order. Try again.");
    }
  };

  return (
    <div className="checkout-form-container">
      <h2>🛒 Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <input type="text" name="customerName" placeholder="Enter your name" value={formData.customerName} onChange={handleChange} required />
        <input type="text" name="customerAddress" placeholder="Enter your full address" value={formData.customerAddress} onChange={handleChange} required />
        <input type="text" name="province" placeholder="Enter your province" value={formData.province} onChange={handleChange} required />
        <input type="text" name="city" placeholder="Enter your city" value={formData.city} onChange={handleChange} required />
        <input type="text" name="postalCode" placeholder="Enter your postal code" value={formData.postalCode} onChange={handleChange} required />
        <input type="text" name="customerPhone" placeholder="Enter your phone number" value={formData.customerPhone} onChange={handleChange} required />

        <div style={{ 
          textAlign: "center", 
          margin: "20px 0", 
          fontWeight: "bold", 
          fontSize: "20px",
          color: "#27ae60"
        }}>
          Total Amount: LKR {totalAmount.toFixed(2)}
        </div>

        <button type="submit" className="submit-btn">🚀 Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
