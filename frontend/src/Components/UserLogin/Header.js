import React, { useState } from 'react';
import './Header.css'; // Add CSS in separate file
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <h1>E-FARMER</h1>
                </div>
                
                <button className="mobile-menu-btn" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/store">Store</a></li>
                        <li><a href="/support">Support</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/register">Register</a></li>
                    </ul>
                </nav>

                <div className="header-right">
                    <div className="search-login">
                        <input type="text" placeholder="Search..." />
                        <button className="search-btn">Search</button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;