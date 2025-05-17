import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserProfile.css';
import Header from './Header';
import Footer from './Footer';

const UserProfile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get(`http://localhost:5002/users/${userId}`);
                if (response.data && response.data.user) {
                    setUserData(response.data.user);
                } else {
                    setError('User data not found');
                }
                setIsLoading(false);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to load user data');
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    if (isLoading) {
        return (
            <div className="profile-loading">
                <div className="loading-spinner"></div>
                <p>Loading profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-error">
                <p>{error}</p>
                <button onClick={() => navigate('/login')}>Back to Login</button>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <Header />
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-avatar">
                        <i className="fas fa-user-circle"></i>
                    </div>
                    <h1>{userData?.name || 'User'}</h1>
                    <p className="user-type">{userData?.userType || 'User'}</p>
                </div>

                <div className="profile-content">
                    <div className="profile-section">
                        <h2>Personal Information</h2>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>NIC Number</label>
                                <p>{userData?.nic || 'Not provided'}</p>
                            </div>
                            <div className="info-item">
                                <label>Email</label>
                                <p>{userData?.gmail || 'Not provided'}</p>
                            </div>
                            <div className="info-item">
                                <label>Address</label>
                                <p>{userData?.address || 'Not provided'}</p>
                            </div>
                            <div className="info-item">
                                <label>Occupation</label>
                                <p>{userData?.occupation || 'Not provided'}</p>
                            </div>
                        </div>
                    </div>

                    {userData?.userType === 'retail' && (
                        <div className="profile-section">
                            <h2>Business Information</h2>
                            <div className="info-grid">
                                <div className="info-item">
                                    <label>Company Name</label>
                                    <p>{userData?.companyName || 'Not provided'}</p>
                                </div>
                                <div className="info-item">
                                    <label>Tax ID</label>
                                    <p>{userData?.taxId || 'Not provided'}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="profile-actions">
                        <button className="edit-profile-btn" onClick={() => navigate('/edit-profile')}>
                            <i className="fas fa-edit"></i> Edit Profile
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile; 