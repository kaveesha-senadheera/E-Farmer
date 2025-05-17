import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const name = localStorage.getItem('userName');
        if (userId) {
            setIsLoggedIn(true);
            setUserName(name || 'User');
        }
    }, []);

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <h3>E-FARMER</h3>
                </div>
                
                <div className="footer-center">
                    <div className="newsletter">
                        <input type="email" placeholder="YOUR E-MAIL" />
                        <button>SUBSCRIBE</button>
                    </div>
                </div>

                <div className="footer-right">
                    <div className="social-links">
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                    </div>
                    {isLoggedIn && (
                        <div className="user-profile-footer" onClick={handleProfileClick}>
                            <div className="profile-icon-footer">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2025 E-FARMER. All Rights Reserved.</p>
                <a href="/privacy-policy">PRIVACY POLICY</a>
            </div>
        </footer>
    );
};

export default Footer;