import React from 'react';
import './Footer.css'; // Add CSS in separate file

const Footer = () => {
    return (
        <footer>
            <div className="contact-info">
                <h3>Contact Us</h3>
                <div className="social-media">
                    <a href="#"><img  alt="Instagram" /></a>
                    <a href="#"><img  alt="Facebook" /></a>
                    <a href="#"><img  alt="WhatsApp" /></a>
                </div>
                <p>Tel: 0765455918 / 0701025649</p>
            </div>
            <div className="powered-by">
                <p>E-farmer powerd by 100% reneawble electricity</p>
            </div>
            <div className="footer-links">

            <ul>
    <li><a href="/deliverys/create">Shipping & Delivery</a></li>
    <li><a href="#">Events</a></li>
    <li><a href="/feedbacks/full">Support</a></li>
    <li><a href="/records">Return & Refunds</a></li>
</ul>

            </div>
            <div>
                <h1>E framer</h1>
                <br/>
            <div className="legal-links">
                
                <ul>
                    <li><a href="#">Terms of Use</a></li>
                    <li><a href="#">Privacy Policies</a></li>
                </ul>
                
                
            </div>
            </div>
        </footer>
    );
};

export default Footer;