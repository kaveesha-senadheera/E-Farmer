import React, { useState } from 'react';
import { GoCopy } from "react-icons/go";

function DeliveryStatusReportForm({ deliveries }) {
  const [copiedId, setCopiedId] = useState(null);
  const [searchId, setSearchId] = useState('');

  const deliveriesWithReadableId = deliveries.map((delivery, index) => ({
    ...delivery,
    readableId: index + 1,
  }));

  const filteredDeliveries = deliveriesWithReadableId.filter((delivery) =>
    delivery.readableId.toString().includes(searchId)
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedId(text);
        setTimeout(() => setCopiedId(null), 2000);
      })
      .catch((err) => console.error('Copy error: ', err));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="dsr-container">
      <div className="dsr-header">
        <h2>Delivery Status Report</h2>
        <input
          type="text"
          placeholder="Search by Delivery ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </div>

      <table className="dsr-table">
        <thead>
          <tr>
            <th>Delivery ID</th>
            <th>Driver Name</th>
            <th>Destination</th>
            <th>Delivery Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredDeliveries.length > 0 ? (
            filteredDeliveries.map((delivery) => (
              <tr key={delivery._id}>
                <td onClick={() => copyToClipboard(delivery.readableId.toString())} style={{ cursor: 'pointer' }}>
                  {delivery.readableId} <GoCopy />
                </td>
                <td>{delivery.driverName}</td>
                <td>{delivery.destination}</td>
                <td>{formatDate(delivery.deliveryDate)}</td>
                <td>{delivery.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>No deliveries found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DeliveryStatusReportForm;
