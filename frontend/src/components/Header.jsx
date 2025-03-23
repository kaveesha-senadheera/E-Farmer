import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdAddShoppingCart } from "react-icons/md";


const Header = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleCartClick = () => {
        navigate('/cart'); // Navigate to cart page
    };
    return (
        <header>
            <div className="logo">
                <img src='./logo.png' alt="E farmer Logo" className="logo-img" />
                <h1>E-FARMER</h1>
            </div>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to=''>store</Link></li>
                    <li><Link to=''>about</Link></li>
                    <li><Link to='/delivery'>Delivery</Link></li>
                    <li><Link to='/orders'>Orders</Link></li>
                    <li><Link to=''>contact</Link></li>   
                </ul>
            </nav>
            <div className="search-login">
                <input type="text" placeholder="Search..." />
                <button classname="search-btn">Search</button>
                
                <MdAddShoppingCart
                className="cart-icon" 
                onClick={handleCartClick}  // Add onClick handler here  
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