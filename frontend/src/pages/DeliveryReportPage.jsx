import { useState, useEffect } from "react";
import axios from "axios";
import DeliveryStatusReport from "../components/DeliveryStatusReport";
import { Link } from "react-router-dom";

function DeliveryReportPage() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/deliveries")
      .then((res) => setDeliveries(res.data));
  }, []);

  return (
    <div className="container">
      <h1>Delivery Status Reports</h1>
      <Link to="/delivery" className="back-nav-button">
        ← Back 
      </Link>
      <DeliveryStatusReport deliveries={deliveries} />
    </div>
  );
}

export default DeliveryReportPage;