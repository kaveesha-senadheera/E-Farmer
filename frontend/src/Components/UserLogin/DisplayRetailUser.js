import React, { useState, useEffect } from "react";
import axios from "axios";
import './displayuser.css';
import Header from "./Header";
import Footer from "./Footer";

const DisplayRetailUser = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5002/users");
      setUsers(response.data.users);
    } catch (err) {
      alert("Error fetching users: " + err.message);
    }
  };

  const handleDelete = async (nic) => {
    try {
      await axios.delete(`http://localhost:5002/users/${nic}`);
      alert("User deleted successfully");
      fetchUsers(); // Refresh list
    } catch (err) {
      alert("Error deleting user: " + err.message);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user.nic);
    setUpdatedData(user);
  };

  const handleUpdateChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5002/users/${editingUser}`, updatedData);
      alert("User updated successfully");
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      alert("Error updating user: " + err.message);
    }
  };

  return (
    <div>
      <Header/>
      <h2>Registered Users</h2>
      {users.length === 0 ? <p>No users found</p> : (
        <table border="1">
          <thead>
            <tr>
              <th>User Type</th>
              <th>NIC</th>
              <th>Name</th>
              <th>Gmail</th>
              <th>Address</th>
              <th>Occupation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.nic}>
                {editingUser === user.nic ? (
                  <>
                    <td>{user.userType === "retail" ? "Retail User" : "Wholesale User"}</td>
                    <td>{user.nic}</td>
                    <td><input type="text" name="name" value={updatedData.name} onChange={handleUpdateChange} /></td>
                    <td><input type="email" name="gmail" value={updatedData.gmail} onChange={handleUpdateChange} /></td>
                    <td><input type="text" name="address" value={updatedData.address} onChange={handleUpdateChange} /></td>
                    <td><input type="text" name="occupation" value={updatedData.occupation} onChange={handleUpdateChange} /></td>
                    <td>
                      <button onClick={handleUpdate}>Save</button>
                      <button onClick={() => setEditingUser(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{user.userType === "retail" ? "Retail User" : "Wholesale User"}</td>
                    <td>{user.nic}</td>
                    <td>{user.name}</td>
                    <td>{user.gmail}</td>
                    <td>{user.address}</td>
                    <td>{user.occupation}</td>
                    <td>
                      <button onClick={() => handleEdit(user)}>Edit</button>
                      <button onClick={() => handleDelete(user.nic)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Footer />
    </div>
  );
};

export default DisplayRetailUser;
