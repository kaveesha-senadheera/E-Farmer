import React, { useState } from 'react';

function OrderList({ orders, onEdit, onDelete }) {
  const [searchPhone, setSearchPhone] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 1500);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  const filteredOrders = orders.filter(order =>
    order.mobileNo.includes(searchPhone)
  );

  return (
    <div
      style={{
        backgroundImage: "url('/it food.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* MAIN CONTENT */}
      <main
        style={{
          flex: 1,
          padding: "30px",
          backgroundColor: "rgba(255, 255, 255, 0.6)", // lighter transparent background
          margin: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <div className="orders-section">
          <h3 className="orders-heading" style={{ textAlign: 'center', marginBottom: '20px', color: 'black' }}>
            ALL ORDERS
          </h3>

          {/* Search Bar */}
          <div className="search-bar" style={{ marginBottom: '20px', textAlign: 'center' }}>
            <label htmlFor="searchPhone" style={{ color: "black", fontWeight: "bold" }}>
              Search by Mobile Number: 
            </label>
            <input
              type="text"
              id="searchPhone"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              placeholder="Enter phone number"
              style={{ padding: '8px', width: '250px', marginLeft: '10px' }}
            />
          </div>

          <table className="orders-table" style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "rgba(255, 255, 255, 0.4)", borderRadius: "8px", overflow: "hidden" }}>
            <thead>
              <tr>
                <th style={{ padding: "10px", border: "1px solid #ddd", color: "black", backgroundColor: "rgba(255,255,255,0.7)" }}>First Name</th>
                <th style={{ padding: "10px", border: "1px solid #ddd", color: "black", backgroundColor: "rgba(255,255,255,0.7)" }}>Last Name</th>
                <th style={{ padding: "10px", border: "1px solid #ddd", color: "black", backgroundColor: "rgba(255,255,255,0.7)" }}>Address</th>
                <th style={{ padding: "10px", border: "1px solid #ddd", color: "black", backgroundColor: "rgba(255,255,255,0.7)" }}>Province</th>
                <th style={{ padding: "10px", border: "1px solid #ddd", color: "black", backgroundColor: "rgba(255,255,255,0.7)" }}>City</th>
                <th style={{ padding: "10px", border: "1px solid #ddd", color: "black", backgroundColor: "rgba(255,255,255,0.7)" }}>Postal Code</th>
                <th style={{ padding: "10px", border: "1px solid #ddd", color: "black", backgroundColor: "rgba(255,255,255,0.7)" }}>Mobile No</th>
                <th style={{ padding: "10px", border: "1px solid #ddd", color: "black", backgroundColor: "rgba(255,255,255,0.7)" }}>Payment Method</th>
                <th style={{ padding: "10px", border: "1px solid #ddd", color: "black", backgroundColor: "rgba(255,255,255,0.7)" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <tr key={order._id}>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>{order.firstName}</td>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>{order.lastName}</td>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                      {order.address}
                      <button
                        style={{
                          marginLeft: '10px',
                          cursor: 'pointer',
                          background: 'none',
                          border: 'none',
                          fontSize: '16px',
                        }}
                        onClick={() => handleCopy(order.address, order._id)}
                        title="Copy Address"
                      >
                        {copiedId === order._id ? '✅' : '📋'}
                      </button>
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>{order.province}</td>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>{order.city}</td>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>{order.postalCode}</td>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>{order.mobileNo}</td>
                    <td
                      style={{
                        padding: "8px",
                        border: "1px solid #ddd",
                        backgroundColor: order.paymentMethod === 'CASH_ON_DELIVERY' ? '#28a745' : '#17a2b8',
                        color: "white",
                      }}
                    >
                      {order.paymentMethod}
                    </td>
                    <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                      <div className="action-buttons" style={{ display: "flex", gap: "5px" }}>
                        <button
                          className="edit-btn"
                          onClick={() => onEdit(order)}
                          style={{
                            backgroundColor: "#ffc107",
                            color: "black",
                            border: "none",
                            padding: "5px 8px",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => onDelete(order._id)}
                          style={{
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            padding: "5px 8px",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: "20px" }}>
                    No orders found for this mobile number
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          color: "white",
          textAlign: "center",
          padding: "15px",
          fontSize: "16px",
        }}
      >
        © 2025 IT Food Delivery | All Rights Reserved
      </footer>
    </div>
  );
}

export default OrderList;
