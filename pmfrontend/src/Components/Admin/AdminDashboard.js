import React from 'react';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaTruck, FaUsers, FaMoneyBillWave, FaStar } from 'react-icons/fa';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Product & Inventory',
      icon: <FaBox />,
      description: 'Manage products, stock levels and inventory updates.',
      link: '/product-inventory'
    },
    {
      title: 'Order & Delivery',
      icon: <FaTruck />,
      description: 'View orders and assign deliveries to drivers.',
      link: '/order-management'
    },
    {
      title: 'User & Login',
      icon: <FaUsers />,
      description: 'Manage user roles, accounts and logins.',
      link: '/user-management'
    },
    {
      title: 'Payment Management',
      icon: <FaMoneyBillWave />,
      description: 'Track and verify payments, transactions and refunds.',
      link: '/payment-management'
    },
    {
      title: 'Review & Rating',
      icon: <FaStar />,
      description: 'Moderate customer reviews and ratings.',
      link: '/review-management'
    }
  ];

  return (
    <div className="admin-dashboard">
      <h1>📊 Admin Dashboard</h1>
      <p className="subtitle">Manage everything from one place.</p>
      <div className="dashboard-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className="dashboard-card"
            onClick={() => navigate(card.link)}
          >
            <div className="card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
