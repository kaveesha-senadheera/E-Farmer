import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // Import the CSS file

const Admin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nic: "",
    name: "",
    gmail: "",
    address: "",
    occupation: "",
    password: "",
    userType: "admin",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Prevent @ symbol in name
    if (!/^[A-Za-z ]+$/.test(formData.name) || formData.name.includes("@")) {
      alert("Name should only contain letters and spaces (No '@' allowed).");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5002/users", formData);
      if (response && response.data) {
        alert(response.data.message);
        setFormData({
          nic: "",
          name: "",
          gmail: "",
          address: "",
          occupation: "",
          password: "",
          userType: "admin",
        });
        navigate("/login");  
      } else {
        alert("Unexpected response format. Please check the backend.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      if (err.response && err.response.data) {
        alert("Error: " + err.response.data.message);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register Admin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nic"
          placeholder="NIC"
          value={formData.nic}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="gmail"
          placeholder="Gmail"
          value={formData.gmail}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          value={formData.occupation}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

export default Admin;
