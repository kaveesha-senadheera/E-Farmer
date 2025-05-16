import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SupplierDetails = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch suppliers
  const fetchSuppliers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/supplierroute');
      setSuppliers(res.data.suppliers);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Handle Delete
  const deleteSupplier = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await axios.delete(`http://localhost:5000/api/supplierroute/${id}`);
        fetchSuppliers();
      } catch (err) {
        console.error("Error deleting supplier:", err);
      }
    }
  };

  // Start Edit
  const startEdit = (supplier) => {
    setEditingId(supplier._id);
    setEditData(supplier);
  };

  // Handle Edit Change
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Save Edit
  const saveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/supplierroute/${editingId}`, editData);
      setEditingId(null);
      fetchSuppliers();
    } catch (err) {
      console.error("Error updating supplier:", err);
    }
  };

  // PDF Download
  const downloadPDFReport = () => {
    const doc = new jsPDF();
    doc.text("📄 Supplier Report", 14, 20);

    const headers = [["Name", "Company", "Email", "Contact", "Quantity (KG)", "Unit Price (RS)", "Total Price (RS)"]];
    const data = suppliers.map(supplier => [
      supplier.Suppliername,
      supplier.Supplier_company,
      supplier.Supplier_email,
      supplier.Supplier_contactnumber,
      supplier.Supplier_quantity,
      supplier.Supplier_unitprice,
      (supplier.Supplier_quantity * supplier.Supplier_unitprice).toFixed(2)
    ]);

    doc.autoTable({
      head: headers,
      body: data,
      startY: 30
    });

    doc.save('supplier_report.pdf');
  };

  // Filtered supplier list
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.Suppliername.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📦 Supplier Management</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Supplier Name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.searchInput}
      />

      {/* Download PDF Button */}
      <button onClick={downloadPDFReport} style={styles.pdfButton}>
        Download PDF Report
      </button>

      {/* Supplier Table */}
      <div style={{ overflowX: 'auto', marginTop: '20px' }}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Company</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Contact</th>
              <th style={styles.th}>Quantity (KG)</th>
              <th style={styles.th}>Unit Price (RS)</th>
              <th style={styles.th}>Total Price (RS)</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map((supplier) => (
              <tr key={supplier._id} style={styles.tr}>
                {editingId === supplier._id ? (
                  <>
                    <td><input name="Suppliername" value={editData.Suppliername} onChange={handleEditChange} style={styles.input} /></td>
                    <td><input name="Supplier_company" value={editData.Supplier_company} onChange={handleEditChange} style={styles.input} /></td>
                    <td><input name="Supplier_email" value={editData.Supplier_email} onChange={handleEditChange} style={styles.input} /></td>
                    <td><input name="Supplier_contactnumber" value={editData.Supplier_contactnumber} onChange={handleEditChange} style={styles.input} /></td>
                    <td><input type="number" name="Supplier_quantity" value={editData.Supplier_quantity} onChange={handleEditChange} style={styles.input} /></td>
                    <td><input type="number" name="Supplier_unitprice" value={editData.Supplier_unitprice} onChange={handleEditChange} style={styles.input} /></td>
                    <td style={styles.td}>
                      {(editData.Supplier_quantity * editData.Supplier_unitprice).toFixed(2)}
                    </td>
                    <td>
                      <button onClick={saveEdit} style={styles.saveButton}>Save</button>
                      <button onClick={() => setEditingId(null)} style={styles.cancelButton}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={styles.td}>{supplier.Suppliername}</td>
                    <td style={styles.td}>{supplier.Supplier_company}</td>
                    <td style={styles.td}>{supplier.Supplier_email}</td>
                    <td style={styles.td}>{supplier.Supplier_contactnumber}</td>
                    <td style={styles.td}>{supplier.Supplier_quantity}</td>
                    <td style={styles.td}>{supplier.Supplier_unitprice}</td>
                    <td style={styles.td}>{(supplier.Supplier_quantity * supplier.Supplier_unitprice).toFixed(2)}</td>
                    <td>
                      <button onClick={() => startEdit(supplier)} style={styles.editButton}>Edit</button>
                      <button onClick={() => deleteSupplier(supplier._id)} style={styles.deleteButton}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: '20px'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px'
  },
  searchInput: {
    padding: '10px',
    width: '100%',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  pdfButton: {
    marginBottom: '20px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
  },
  tableHeaderRow: {
    backgroundColor: '#FF7F50',
    color: '#fff'
  },
  th: {
    padding: '12px',
    textAlign: 'left'
  },
  tr: {
    borderBottom: '1px solid #ddd'
  },
  td: {
    padding: '10px'
  },
  input: {
    padding: '8px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  editButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    marginRight: '5px',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    marginRight: '5px',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  cancelButton: {
    backgroundColor: '#9E9E9E',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '4px'
  }
};

export default SupplierDetails;
