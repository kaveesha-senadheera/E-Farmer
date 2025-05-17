import React, { useState } from 'react';
import { GoCopy } from "react-icons/go";

function DeliveryStatusReport({ deliveries }) {
  const [copiedId, setCopiedId] = useState(null);
  const [searchId, setSearchId] = useState('');

  // Create a new array with readable IDs assigned (1, 2, 3, ...)
  const deliveriesWithReadableId = deliveries.map((delivery, index) => ({
    ...delivery,
    readableId: index + 1,
  }));

  // Filter deliveries by readableId
  const filteredDeliveries = deliveriesWithReadableId.filter((delivery) =>
    delivery.readableId.toString().includes(searchId)
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedId(text);
        setTimeout(() => setCopiedId(null), 2000);
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  };

  // Format deliveryDate to DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Build destination string from order fields
  const buildDestination = (delivery) => {
    if (delivery.destination && delivery.destination.trim() !== '') {
      return delivery.destination;
    }
    
    const parts = [];
    if (delivery.order) {
      if (delivery.order.address) parts.push(delivery.order.address);
      if (delivery.order.city) parts.push(delivery.order.city);
      if (delivery.order.province) parts.push(delivery.order.province);
    }
    return parts.join(', ');
  };

  return (
    <div className="dsr-container">
      <div className="dsr-header">
        <h2 className="dsr-title">Delivery Status Report</h2>

        {/* Search input for Delivery ID */}
        <div className="dsr-search">
          <label htmlFor="searchId">Search by Delivery ID:</label>
          <input
            type="text"
            id="searchId"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Delivery ID"
          />
        </div>
      </div>

      <div className="dsr-table-container">
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
                  <td className="dsr-id-cell">
                    <div 
                      className="copyable-id"
                      onClick={() => copyToClipboard(delivery.readableId.toString())}
                      style={{
                        cursor: 'pointer',
                        position: 'relative',
                        display: 'inline-flex',
                        alignItems: 'center'
                      }}
                    >
                      {delivery.readableId}
                      <span 
                        style={{ 
                          marginLeft: '8px',
                          fontSize: '16px',
                          color: '#666'
                        }}
                      >
                        {copiedId === delivery.readableId.toString() ? "✓ Copied!" : <GoCopy />}
                      </span>
                    </div>
                  </td>

                  <td>{delivery.driverName}</td>

                  <td>{buildDestination(delivery)}</td>

                  <td>{formatDate(delivery.deliveryDate)}</td>

                  <td>
                    <span className={`dsr-status-badge ${delivery.status.toLowerCase()}`}>
                      {delivery.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No deliveries found for this ID</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeliveryStatusReport;
