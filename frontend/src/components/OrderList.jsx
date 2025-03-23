import React from 'react';


function OrderList({ orders, onEdit, onDelete }) {
  return (
    <div className="order-container">
      
      
      <div className="orders-section">
        <h3 className="orders-heading">ALL ORDERS</h3>
        
        <table className="orders-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Province</th>
              <th>City</th>
              <th>Postal Code</th>
              <th>Mobile No</th>
              <th>Payment Method</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.firstName}</td>
                <td>{order.lastName}</td>
                <td>{order.address}</td>
                <td>{order.province}</td>
                <td>{order.city}</td>
                <td>{order.postalCode}</td>
                <td>{order.mobileNo}</td>
                <td className={order.paymentMethod === 'CASH_ON_DELIVERY' ? 'payment-cash' : 'payment-online'}>
                  {order.paymentMethod}
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn" onClick={() => onEdit(order)}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button className="delete-btn" onClick={() => onDelete(order._id)}>
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;