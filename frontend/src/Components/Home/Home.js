import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Header from '../UserLogin/Header';
import Footer from '../UserLogin/Footer';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <Header />
            <main className="hero-section">
                <div className="hero-content">
                    <h1>Smarter Harvests,<br />Greater Yields</h1>
                    <p>Transforming Farming for a Sustainable Tomorrow with Innovative AGV Robotics Solutions</p>
                    <button 
                        className="get-started-btn"
                        onClick={() => navigate('/register')}
                    >
                        Get Started
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
