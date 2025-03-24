import React, { useState } from "react";
import axios from "axios";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        ...formData,
        role,
      });
      alert("Registration Successful!");
    } catch (error) {
      alert("Error registering user");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <select onChange={(e) => setRole(e.target.value)} value={role}>
        <option value="buyer">Buyer</option>
        <option value="retailer">Retailer</option>
      </select>
      <form onSubmit={handleRegister}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        {role === "retailer" && (
          <>
            <input type="text" name="businessName" placeholder="Business Name" onChange={handleChange} />
            <input type="text" name="licenseNumber" placeholder="License Number" onChange={handleChange} />
            <input type="text" name="businessLocation" placeholder="Business Location" onChange={handleChange} />
          </>
        )}
        {role === "buyer" && (
          <>
            <input type="text" name="preferredProducts" placeholder="Preferred Products" onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" onChange={handleChange} />
            <input type="text" name="contactNumber" placeholder="Contact Number" onChange={handleChange} />
          </>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;