import React from 'react';
import './Header.css'; // Add CSS in separate file
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleCartClick = () => {
        navigate('/cart'); // Navigate to cart page
    };
    return (
        <header>
            <div className="logo">
                <h1>E-FARMER</h1>
            </div>
            <nav>
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">store</a></li>
                    <li><a href="">about</a></li>
                    <li><a href="">contact</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/Register">Register</a></li>
                </ul>
            </nav>
            <div className="search-login">
                <input type="text" placeholder="Search..." />
                <button classname="search-btn">Search</button>          
            </div>
            <button
              className='login'
              onClick={() => navigate('/login')}
            >
               Logout
            </button>
        </header>
    );
};

export default Header;