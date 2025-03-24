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
      // Send GET request to backend with email and password as query params
      const response = await axios.get("http://localhost:5002/users", {
        params: {
          gmail: formData.gmail,
          password: formData.password,
        },
      });

      if (response && response.data) {
        // On successful login, you can store user details in localStorage
        localStorage.setItem("userEmail", formData.gmail);  // Save the user's email for later use
        if (formData.gmail === "admin@gmail.com" && formData.password === "admin") {
            // Redirect to users page if admin
            navigate("/users");
          } else {
            // Redirect to homepage or dashboard for other users
            navigate("/");  
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
