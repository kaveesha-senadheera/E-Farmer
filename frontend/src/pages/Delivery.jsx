import { useState, useEffect } from "react";
import axios from "axios";
import DeliveryForm from "../components/DeliveryForm";
import { Link } from "react-router-dom";

function Delivery() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/deliveries")
      .then((res) => setDeliveries(res.data));
  }, []);

  const updateDelivery = (id, updatedDelivery) => {
    axios
      .put(`http://localhost:8080/api/deliveries/${id}`, updatedDelivery)
      .then((res) => {
        setDeliveries(deliveries.map((d) => (d._id === id ? res.data : d)));
      });
  };

  return (
    <div className="container">
      <h1>Delivery Management</h1>
      
      <DeliveryForm onUpdate={updateDelivery} deliveries={deliveries} />
    </div>
  );
}

export default Delivery;