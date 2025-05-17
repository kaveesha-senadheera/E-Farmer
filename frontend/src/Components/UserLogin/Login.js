import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './login.css';  // If you have separate styling for login
import Header from "./Header";
import Footer from "./Footer";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to login endpoint
      const response = await axios.post("http://localhost:5002/users/login", {
        gmail: formData.gmail,
        password: formData.password,
      });

      if (response && response.data && response.data.user) {
        // Store all user data in localStorage
        const userData = response.data.user;
        localStorage.setItem("userId", userData.nic);
        localStorage.setItem("userEmail", userData.gmail);
        localStorage.setItem("userName", userData.name);
        localStorage.setItem("userType", userData.userType);
        
        if (formData.gmail === "admin@gmail.com" && formData.password === "admin") {
          navigate("/users");
        } else {
          navigate("/profile"); // Redirect to profile page after successful login
        }
      }
    } catch (err) {
      console.error("Error during login:", err);
      if (err.response && err.response.data) {
        alert("Error: " + err.response.data.message);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
        <Header />
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="gmail"
          placeholder="Gmail"
          value={formData.gmail}
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
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
    <Footer />
    </div>
  );
};

export default Login;
