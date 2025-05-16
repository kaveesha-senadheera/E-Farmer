import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpeg';
import { FaShoppingCart, FaHeart, FaUser } from 'react-icons/fa';
import { useCart } from './CartContext';

const Header = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) => {
  const navigate = useNavigate();
  const { cart } = useCart();

  return (
    <header className="store-header">
      <div className="left-section" onClick={() => navigate('/home')}>
        <img src={logo} alt="Logo" className="logo-img" />
        <h1 className="brand-name">E-FARMER</h1>
      </div>

      <nav className="nav-links">
        <span onClick={() => navigate('/home')}>Home</span>
        <span onClick={() => navigate('/store')}>Store</span>
        <span>About</span>
        <span>Contact</span>
      </nav>

      <div className="right-section">
        <select 
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option>All</option>
          <option>Vegetables</option>
          <option>Fruits</option>
          <option>Grains</option>
        </select>

        <input 
          type="text" 
          placeholder="Search..." 
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-btn">Search</button>

        <FaHeart className="icon-btn" />
        
        <div className="cart-icon-container" onClick={() => navigate('/cart')}>
          <FaShoppingCart className="icon-btn" />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </div>

        <FaUser className="icon-btn" onClick={() => navigate('/profile')} />
      </div>
    </header>
  );
};

export default Header;
