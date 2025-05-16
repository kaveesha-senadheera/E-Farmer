import React, { useState } from "react";
import axios from "axios";

function SupplierForm() {
  const [supplierData, setSupplierData] = useState({
    Suppliername: "",
    Supplier_company: "",
    Supplier_email: "",
    Supplier_contactnumber: "",
    Supplier_quantity: "",
    Supplier_unitprice: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!/^[A-Za-z ]+$/.test(supplierData.Suppliername)) {
      newErrors.Suppliername = "Name can only contain letters.";
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(supplierData.Supplier_email)) {
      newErrors.Supplier_email = "Please enter a valid email.";
    }
    if (!/^\d{10}$/.test(supplierData.Supplier_contactnumber)) {
      newErrors.Supplier_contactnumber = "Phone number must be 10 digits.";
    }
    if (supplierData.Supplier_quantity <= 0) {
      newErrors.Supplier_quantity = "Quantity must be greater than zero.";
    }
    if (supplierData.Supplier_unitprice <= 0) {
      newErrors.Supplier_unitprice = "Unit price must be greater than zero.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplierData({ ...supplierData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formattedData = {
      ...supplierData,
      Supplier_quantity: parseFloat(supplierData.Supplier_quantity),
      Supplier_unitprice: parseFloat(supplierData.Supplier_unitprice),
    };

    try {
      // Update the URL to match the correct backend route
      const response = await axios.post("http://localhost:5000/api/supplierroute", formattedData);
      alert(response.data.message);
      setSupplierData({
        Suppliername: "",
        Supplier_company: "",
        Supplier_email: "",
        Supplier_contactnumber: "",
        Supplier_quantity: "",
        Supplier_unitprice: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error adding supplier:", error);
      alert("Failed to add supplier");
    }
  };

  return (
    <div style={{ backgroundImage: "url('/spices.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ maxWidth: "600px", width: "100%", padding: "30px", backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "10px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", fontFamily: "Arial, sans-serif", color: "#333" }}>
        <h2 style={{ textAlign: "center", fontSize: "26px", marginBottom: "20px", color: "#8B4513" }}>Add a New Supplier</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {Object.keys(supplierData).map((field, index) => (
            <div key={index} style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor={field} style={{ marginBottom: "8px", fontSize: "15px", fontWeight: "bold", color: "#6B4226" }}>
                {field.replace("Supplier_", "").replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type={field.includes("quantity") || field.includes("unitprice") ? "number" : "text"}
                name={field}
                value={supplierData[field]}
                onChange={handleInputChange}
                required
                style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "6px", fontSize: "15px", outline: "none", boxSizing: "border-box", backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              />
              {errors[field] && (
                <span style={{ color: "red", fontSize: "13px" }}>{errors[field]}</span>
              )}
            </div>
          ))}
          <button
            type="submit"
            style={{ padding: "14px", backgroundColor: "#D2691E", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "17px", transition: "background-color 0.3s ease" }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#A0522D"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#D2691E"}
          >
            Add Supplier
          </button>
        </form>
      </div>
    </div>
  );
}

export default SupplierForm;
