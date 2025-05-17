import React from 'react';
import './Header.css'; // Add CSS in separate file
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.jpg';
import cartIcon from '../images/cart.png'

const Header = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleCartClick = () => {
        navigate('/cart'); // Navigate to cart page
    };
    return (
        <header>
            <div className="logo">
                <img src={logo} alt="E farmer Logo" className="logo-img" />
                <h1>E-FARMER</h1>
            </div>
            <nav>
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">store</a></li>
                    <li><a href="">about</a></li>
                    <li><a href="">contact</a></li>
                    
                </ul>
            </nav>
            <div className="search-login">
                <input type="text" placeholder="Search..." />
                <button classname="search-btn">Search</button>
                <img 
                    src={cartIcon} 
                    alt="Cart" 
                    className="cart-icon" 
                    onClick={handleCartClick} // Add onClick handler here
                />             
            </div>
            <button
              className='login'
              onClick={() => navigate('/login')}
            >
               LogOut
            </button>
        </header>
    );
};

export default Header;
