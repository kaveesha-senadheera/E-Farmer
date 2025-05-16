import React, { useState } from 'react';
import './PaymentPage.css'; 
import { useNavigate, useLocation } from 'react-router-dom';
import visaImage from '../../assets/Visa.png'; 
import masterCardImage from '../../assets/master.png'; 

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalAmount = location.state?.totalAmount || 0;

  const [paymentData, setPaymentData] = useState({
    cardType: '',
    email: '',
    cardNumber: '',
    cvv: '',
  });

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { cardType, email, cardNumber, cvv } = paymentData;
    if (!cardType || !email || !cardNumber || !cvv) {
      alert('❌ Please fill all fields!');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('❌ Invalid Email!');
      return false;
    }
    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
      alert('❌ Card number must be 16 digits!');
      return false;
    }
    if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
      alert('❌ CVV must be 3 digits!');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("✅ Payment Successful! Thank you!");
      navigate('/store');
    }
  };

  return (
    <div className="payment-page-container">
      <h2>💳 Payment Gateway</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        
        <div className="card-selection">
          <label>Select Card Type:</label>
          <select name="cardType" value={paymentData.cardType} onChange={handleChange} required>
            <option value="">-- Select Card Type --</option>
            <option value="Visa">Visa</option>
            <option value="MasterCard">MasterCard</option>
          </select>
          <div className="card-images">
            <img src={visaImage} alt="Visa" />
            <img src={masterCardImage} alt="MasterCard" />
          </div>
        </div>

        <input type="email" name="email" placeholder="Email Address" value={paymentData.email} onChange={handleChange} required />

        <input type="text" name="cardNumber" placeholder="Card Number (16 digits)" maxLength="16" value={paymentData.cardNumber} onChange={handleChange} required />

        <input type="text" name="cvv" placeholder="CVV (3 digits)" maxLength="3" value={paymentData.cvv} onChange={handleChange} required />

        <div className="total-amount">
          <strong>Total Amount: </strong> LKR {totalAmount.toFixed(2)}
        </div>

        <button type="submit" className="pay-btn">💳 Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentPage;
