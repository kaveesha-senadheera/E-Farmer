import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import heroImage from '../../assets/hero.jpg';
import farmerImage from '../../assets/farmer.jpg';
import productsImage from '../../assets/products.jpg';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      
      <section className="hero">
        <img src={heroImage} alt="Farm" className="hero-image" />
        <div className="hero-text">
          <h1>Welcome to E-FARMER</h1>
          <p>Your trusted online marketplace supporting local farmers</p>
          <button onClick={() => navigate('/store')}>Shop Now</button>
        </div>
      </section>

      {/* About Us */}
      <section className="about">
        <div className="about-content">
          <img src={farmerImage} alt="Local Farmer" />
          <div>
            <h2>About Us</h2>
            <p>
              E-FARMER connects local farmers directly with both retail and wholesale customers.
              Our mission is to empower farmers, ensure fresh products, and create a sustainable 
              marketplace for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Products Highlights */}
      <section className="products-highlight">
        <h2>Our Products</h2>
        <div className="products-content">
          <img src={productsImage} alt="Farm Products" />
          <p>
            Explore a wide range of fresh vegetables, fruits, grains, and organic products
            grown by local farmers. Guaranteed farm-fresh quality delivered to your door.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us">
        <h2>Why Choose E-FARMER?</h2>
        <ul>
          <li>✅ 100% Farm Fresh Products</li>
          <li>✅ Direct from Local Farmers</li>
          <li>✅ Wholesale & Retail Options</li>
          <li>✅ Eco-friendly and Sustainable</li>
          <li>✅ Easy Online Shopping & Delivery</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Support Local Farmers Today!</h2>
        <button onClick={() => navigate('/store')}>Visit Store</button>
      </section>
    </div>
  );
};

export default HomePage;
