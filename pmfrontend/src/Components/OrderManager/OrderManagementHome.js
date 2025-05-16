import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderManagementHome.css'; // ✅ Correctly imported CSS

// ✅ Optional: Set image link safely
import backgroundImage from '../../assets/farming.jpg'; 

const OrderManagementHome = () => {
  const navigate = useNavigate();

  const backgroundStyle = backgroundImage ? {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    textAlign: 'center',
  } : {};

  return (
    <div className="order-management-home" style={backgroundStyle}>
      <div className="content-container">
        <h1>🚚 Order & Delivery Management</h1>
        <p>
          Welcome to the Order and Delivery Management System. Here you can manage customer orders, assign deliveries to drivers, and track the delivery statuses efficiently.
        </p>

        <div className="button-group">
          <button onClick={() => navigate('/orders')} className="home-button">📋 View Orders</button>
          <button onClick={() => navigate('/delivery-form')} className="home-button">🚚 Assign Delivery</button>
          <button onClick={() => navigate('/delivery-status')} className="home-button">📈 Delivery Status</button>
        </div>
      </div>
    </div>
  );
};

export default OrderManagementHome;
