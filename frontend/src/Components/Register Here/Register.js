import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";  
import Footer from "./Footer";  
import "./Register.css";  

const Register = () => {
  const [role, setRole] = useState("buyer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    businessName: "",
    licenseNumber: "",
    businessLocation: "",
    preferredProducts: "",
    address: "",
    contactNumber: "",
  });

  // Function to handle the name input validation and block '@' symbol
  const handleNameChange = (e) => {
    const { name, value } = e.target;

    // If '@' is present in the name field, prevent the input
    if (value.includes("@")) {
      alert("Name cannot contain '@'.");
      return; // Stops updating state if '@' is typed
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Proceed to update state for other fields except name
    if (name !== "name") {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Final validation: No '@' allowed in name, and name should contain only letters and spaces
    if (!/^[A-Za-z ]+$/.test(formData.name)) {
      alert("Name should only contain letters and spaces (No '@' allowed).");
      return;
    }
    
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        ...formData,
        role,
      });

      if (response.data.success) {
        alert("Registration Successful!");
      } else {
        alert(response.data.message || "Error during registration.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Error registering user.");
    }
  };

  return (
    <div>
      <Header />  {/* Include Header */}
      <div className="register-container">
        <h2>Register</h2>
        <select onChange={(e) => setRole(e.target.value)} value={role}>
          <option value="buyer">Buyer</option>
          <option value="retailer">Retailer</option>
        </select>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleNameChange}  
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 chars)"
            onChange={handleChange}
            required
          />
          
          {role === "retailer" && (
            <>
              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="licenseNumber"
                placeholder="License Number"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="businessLocation"
                placeholder="Business Location"
                onChange={handleChange}
                required
              />
            </>
          )}

          {role === "buyer" && (
            <>
              <input
                type="text"
                name="preferredProducts"
                placeholder="Preferred Products"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                onChange={handleChange}
                required
              />
            </>
          )}

          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
      <Footer />  {/* Include Footer */}
    </div>
  );
};

export default Register;
