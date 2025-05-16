// Components/OrderManager/OrderList.js

import React, { useEffect, useState } from 'react';
import './OrderList.css'; // ✅ keep your clean css
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [searchPhone, setSearchPhone] = useState('');
  const [editingOrder, setEditingOrder] = useState(null);
  const [updatedOrder, setUpdatedOrder] = useState({});

  // ✅ Fetch orders from backend
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setUpdatedOrder({
      customerName: order.customerName,
      customerAddress: order.customerAddress,
      province: order.province,
      city: order.city,
      postalCode: order.postalCode,
      customerPhone: order.customerPhone,
      orderStatus: order.orderStatus
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`http://localhost:5000/api/orders/${id}`);
        fetchOrders();
        alert('✅ Order deleted successfully!');
      } catch (error) {
        console.error('❌ Error deleting order:', error);
        alert('❌ Failed to delete order.');
      }
    }
  };

  const handleSaveUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${editingOrder._id}`, updatedOrder);
      setEditingOrder(null);
      fetchOrders();
      alert('✅ Order updated successfully!');
    } catch (error) {
      console.error('❌ Error updating order:', error);
      alert('❌ Failed to update order.');
    }
  };

  const filteredOrders = orders.filter(order =>
    order.customerPhone && order.customerPhone.includes(searchPhone)
  );

  return (
    <div className="order-container">
      <div className="orders-section">
        <h3 className="orders-heading">ALL ORDERS</h3>

        {/* Search Bar */}
        <div className="search-bar" style={{ marginBottom: '20px' }}>
          <label htmlFor="searchPhone">Search by Mobile Number: </label>
          <input
            type="text"
            id="searchPhone"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            placeholder="Enter phone number"
            style={{ padding: '8px', width: '250px', marginLeft: '10px' }}
          />
        </div>

        {/* Orders Table */}
        <table className="orders-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Province</th>
              <th>City</th>
              <th>Postal Code</th>
              <th>Phone No</th>
              <th>Total Amount</th>
              <th>Order Status</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <tr key={order._id}>
                  <td>{order.customerName}</td>
                  <td>{order.customerAddress}</td>
                  <td>{order.province}</td>
                  <td>{order.city}</td>
                  <td>{order.postalCode}</td>
                  <td>{order.customerPhone}</td>
                  <td>LKR {order.totalAmount}</td>
                  <td>{order.orderStatus}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleEdit(order)} className="edit-btn">✏️ Edit</button>
                    <button onClick={() => handleDelete(order._id)} className="delete-btn">🗑️ Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center' }}>
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Edit Form */}
        {editingOrder && (
          <div className="edit-order-form">
            <h3>Edit Order</h3>
            <input type="text" placeholder="Customer Name" value={updatedOrder.customerName} onChange={(e) => setUpdatedOrder({ ...updatedOrder, customerName: e.target.value })} />
            <input type="text" placeholder="Address" value={updatedOrder.customerAddress} onChange={(e) => setUpdatedOrder({ ...updatedOrder, customerAddress: e.target.value })} />
            <input type="text" placeholder="Province" value={updatedOrder.province} onChange={(e) => setUpdatedOrder({ ...updatedOrder, province: e.target.value })} />
            <input type="text" placeholder="City" value={updatedOrder.city} onChange={(e) => setUpdatedOrder({ ...updatedOrder, city: e.target.value })} />
            <input type="text" placeholder="Postal Code" value={updatedOrder.postalCode} onChange={(e) => setUpdatedOrder({ ...updatedOrder, postalCode: e.target.value })} />
            <input type="text" placeholder="Phone" value={updatedOrder.customerPhone} onChange={(e) => setUpdatedOrder({ ...updatedOrder, customerPhone: e.target.value })} />
            <input type="text" placeholder="Order Status" value={updatedOrder.orderStatus} onChange={(e) => setUpdatedOrder({ ...updatedOrder, orderStatus: e.target.value })} />
            <button onClick={handleSaveUpdate} className="save-btn">✅ Save</button>
            <button onClick={() => setEditingOrder(null)} className="cancel-btn">❌ Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
