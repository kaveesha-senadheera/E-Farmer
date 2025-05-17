import { useState, useEffect } from "react";
import axios from "axios";
import { MdAddShoppingCart } from "react-icons/md";
import OrderList from "../components/OrderList";
import OrderForm from "../components/OrderForm";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/orders")
      .then((res) => setOrders(res.data));
  }, []);

  const addOrder = (order) => {
    axios
      .post("http://localhost:8080/api/orders", order, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setOrders([...orders, res.data]);
        setShowForm(false);
      });
  };

  const updateOrder = (id, updatedOrder) => {
    axios
      .put(`http://localhost:8080/api/orders/${id}`, updatedOrder, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setOrders(orders.map((o) => (o._id === id ? res.data : o)));
        setShowForm(false);
        setEditingOrder(null);
      });
  };

  const deleteOrder = (id) => {
    axios
      .delete(`http://localhost:8080/api/orders/${id}`)
      .then(() => setOrders(orders.filter((o) => o._id !== id)));
  };

  return (
    <div>
      <h1>Order Delivery Details</h1>
      <div className="order-header">
        <h2 className="order-title">Order Delivery Details</h2>
        <button className="checkout-btn" onClick={() => setShowForm(true)}>CHECKOUT <MdAddShoppingCart className="checkout-icon" /></button>
      </div>
      
      <OrderList
        orders={orders}
        onEdit={(order) => {
          setEditingOrder(order);
          setShowForm(true);
        }}
        onDelete={deleteOrder}
      />
      
      {showForm && (
        <OrderForm
          order={editingOrder}
          onSave={editingOrder ? updateOrder : addOrder}
          onCancel={() => {
            setShowForm(false);
            setEditingOrder(null);
          }}
        />
      )}
    </div>
  );
}

export default Orders;
