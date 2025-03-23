import React, { useState } from 'react';
import { GoCopy } from "react-icons/go";

function DeliveryStatusReport({ deliveries }) {
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedId(text);
        setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  };

  return (
    <div className="dsr-container">
      <div className="dsr-header">
        <h2 className="dsr-title">Delivery Status Report</h2>
      </div>
      <div className="dsr-table-container">
        <table className="dsr-table">
          <thead>
            <tr>
              <th>Delivery ID</th>
              <th>Driver Name</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {deliveries && deliveries.map(delivery => (
              <tr key={delivery._id}>
                <td className="dsr-id-cell">
                  <div 
                    className="copyable-id"
                    onClick={() => copyToClipboard(delivery._id)}
                    style={{
                      cursor: 'pointer',
                      position: 'relative',
                      display: 'inline-flex',
                      alignItems: 'center'
                    }}
                  >
                    {delivery._id}
                    <span 
                      style={{ 
                        marginLeft: '8px',
                        fontSize: '16px',
                        color: '#666'
                      }}
                    >
                      {copiedId === delivery._id ? "✓ Copied!" : <GoCopy />}
                    </span>
                  </div>
                </td>
                <td>{delivery.driverName}</td>
                <td>{delivery.destination}</td>
                <td>{new Date(delivery.deliveryDate).toLocaleString()}</td>
                <td>
                  <span className={`dsr-status-badge ${delivery.status.toLowerCase()}`}>
                    {delivery.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DeliveryStatusReport;