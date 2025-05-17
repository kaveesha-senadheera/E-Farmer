import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // Import the CSS file
import Header from "./Header";
import Footer from "./Footer";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nic: "",
    name: "",
    gmail: "",
    address: "",
    occupation: "",
    password: "",
    userType: "retail",
    companyName: "",
    taxId: "",
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

    // Password validation
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5002/users", formData);
      
      if (response.data && response.data.message === "User created successfully") {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(response.data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      if (err.response && err.response.data) {
        alert(err.response.data.message || "Registration failed. Please try again.");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="register-container">
        <h2>Register New User</h2>
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
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="taxId"
            placeholder="Tax ID"
            value={formData.taxId}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
