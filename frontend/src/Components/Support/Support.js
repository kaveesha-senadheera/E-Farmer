import React, { useState } from 'react';
import './Support.css';
import Header from '../UserLogin/Header';
import Footer from '../UserLogin/Footer';

const Support = () => {
    const [activeTab, setActiveTab] = useState('faq');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const faqs = [
        {
            question: "How do I get started with E-Farmer?",
            answer: "Getting started is easy! Simply register an account, complete your profile, and start exploring our agricultural services and products."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept various payment methods including credit/debit cards, bank transfers, and mobile payments."
        },
        {
            question: "How can I track my orders?",
            answer: "Once your order is placed, you can track it through your user dashboard or using the tracking number provided in your confirmation email."
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for most products. Please check our returns page for specific details and conditions."
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
        alert('Thank you for your message. We will get back to you soon!');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="support-page">
            <Header />
            <div className="support-container">
                <div className="support-header">
                    <h1>How Can We Help You?</h1>
                    <p>We're here to help and answer any question you might have</p>
                </div>

                <div className="support-tabs">
                    <button 
                        className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
                        onClick={() => setActiveTab('faq')}
                    >
                        <i className="fas fa-question-circle"></i> FAQs
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
                        onClick={() => setActiveTab('contact')}
                    >
                        <i className="fas fa-envelope"></i> Contact Us
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'help' ? 'active' : ''}`}
                        onClick={() => setActiveTab('help')}
                    >
                        <i className="fas fa-hands-helping"></i> Help Center
                    </button>
                </div>

                <div className="support-content">
                    {activeTab === 'faq' && (
                        <div className="faq-section">
                            {faqs.map((faq, index) => (
                                <div key={index} className="faq-item">
                                    <h3>{faq.question}</h3>
                                    <p>{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'contact' && (
                        <div className="contact-section">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="submit-btn">Send Message</button>
                            </form>
                        </div>
                    )}

                    {activeTab === 'help' && (
                        <div className="help-section">
                            <div className="help-card">
                                <i className="fas fa-phone"></i>
                                <h3>Call Us</h3>
                                <p>+94 765455918</p>
                                <p>Available 24/7</p>
                            </div>
                            <div className="help-card">
                                <i className="fas fa-envelope"></i>
                                <h3>Email Us</h3>
                                <p>support@efarmer.com</p>
                                <p>Response within 24 hours</p>
                            </div>
                            <div className="help-card">
                                <i className="fas fa-comments"></i>
                                <h3>Live Chat</h3>
                                <p>Chat with our support team</p>
                                <button className="chat-btn">Start Chat</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Support; 