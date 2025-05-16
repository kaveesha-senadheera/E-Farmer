import React from 'react';
import './Footer.css';
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
    return (
      <footer>
      <div className="footer-section contact">
        <h3>Contact Us</h3>
        <p>Tel: 0765455918 / 0701025649</p>
        <div className="social-media">
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-whatsapp"></i></a>
        </div>
      </div>
    
      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/deliverys/create">Shipping & Delivery</a></li>
          <li><a href="#">Events</a></li>
          <li><a href="/feedbacks/full">Support</a></li>
          <li><a href="/records">Return & Refunds</a></li>
        </ul>
      </div>
    
      <div className="footer-section">
        <h3>Legal</h3>
        <ul>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Privacy Policies</a></li>
        </ul>
      </div>
    
      <div className="footer-section brand">
        <h1>E-FARMER</h1>
        <p>Powered by 100% renewable electricity</p>
      </div>
    </footer>
    
    );
};

export default Footer;
