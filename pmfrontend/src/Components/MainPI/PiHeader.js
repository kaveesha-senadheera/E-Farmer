import React, { useState, useEffect, useRef } from 'react';
import './PiHeader.css';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const PiHeader = () => {
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);
  const navigate = useNavigate();

  const inventoryRef = useRef();
  const salesRef = useRef();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inventoryRef.current &&
        !inventoryRef.current.contains(event.target)
      ) {
        setInventoryOpen(false);
      }
      if (
        salesRef.current &&
        !salesRef.current.contains(event.target)
      ) {
        setSalesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="pi-header">
      <div className="nav-left">
        {/* Inventory Dropdown */}
        <div className="dropdown-wrapper" ref={inventoryRef}>
          <span
            className="nav-link"
            onClick={() => {
              setInventoryOpen(!inventoryOpen);
              setSalesOpen(false);
            }}
          >
            Inventory ▾
          </span>
          {inventoryOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => navigate('/add-inventory')}>Add Inventory</div>
              <div className="dropdown-item" onClick={() => navigate('/product-inventory')}>View Inventory</div>
            </div>
          )}
        </div>

        {/* Product Listing */}
        <span className="nav-link" onClick={() => navigate('/product-listing')}>Product Listing</span>

        {/* Suppliers */}
        <span className="nav-link" onClick={() => navigate('/suppliers')}>Suppliers</span>

        {/* Sales Dropdown */}
        <div className="dropdown-wrapper" ref={salesRef}>
          <span
            className="nav-link"
            onClick={() => {
              setSalesOpen(!salesOpen);
              setInventoryOpen(false);
            }}
          >
            Sales Trends & Reports ▾
          </span>
          {salesOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => navigate('/sales-trends')}>Sales Trends</div>
              <div className="dropdown-item" onClick={() => navigate('/reports')}>Reports</div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Icon */}
      <div className="profile-icon" onClick={() => navigate('/profile')}>
        <FaUserCircle size={28} />
      </div>
    </header>
  );
};

export default PiHeader;
