import { useState } from 'react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';

function DeliveryForm({ onUpdate, deliveries }) {
  const [formData, setFormData] = useState({
    deliveryId: '',
    driverName: '',
    destination: '',
    deliveryDate: '',
    status: 'COMPLETED'
  });

  const letterRegex = /^[A-Za-z\s]*$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    const deliveryIndex = parseInt(formData.deliveryId, 10) - 1;
    const delivery = deliveries[deliveryIndex];

    if (delivery) {
      onUpdate(delivery._id, {
        driverName: formData.driverName,
        destination: formData.destination,
        deliveryDate: formData.deliveryDate,
        status: formData.status
      });

      setFormData({ deliveryId: '', driverName: '', destination: '', deliveryDate: '', status: 'COMPLETED' });

      setTimeout(() => {
        if (window.confirm("Delivery report has been updated successfully! Do you want to download the PDF report?")) {
          downloadPDF();
        }
      }, 100);
    } else {
      alert("Invalid Delivery ID!");
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Convert deliveryDate from yyyy-mm-dd to dd/mm/yyyy
    const formattedDate = formatDate(formData.deliveryDate);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    doc.text('Delivery Report', 20, 20);
    doc.text(`Delivery ID: ${formData.deliveryId}`, 20, 40);
    doc.text(`Driver's Name: ${formData.driverName}`, 20, 50);
    doc.text(`Destination: ${formData.destination}`, 20, 60);
    doc.text(`Delivery Date: ${formattedDate}`, 20, 70); // Use formatted date
    doc.text(`Status: ${formData.status}`, 20, 80);

    doc.save(`delivery_report_${formData.deliveryId}.pdf`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleDriverNameChange = (e) => {
    const value = e.target.value;
    if (letterRegex.test(value)) {
      setFormData({
        ...formData,
        driverName: value
      });
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time portion

    if (selectedDate >= today) {
      setFormData({
        ...formData,
        deliveryDate: e.target.value
      });
    } else {
      alert("Delivery date cannot be in the past!");
      setFormData({
        ...formData,
        deliveryDate: ''
      });
    }
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="delivery-management-form">
      <div className="dm-header">
        <h2 className="dm-title">DELIVERY MANAGEMENT</h2>
        <Link to="/reports" type="button" className="dm-all-delivery-btn">ALL DELIVERY</Link>
      </div>

      <div className="dm-form-body">
        <div className="dm-form-group">
          <label className="dm-label">Delivery ID</label>
          <input
            className="dm-input"
            type="text"
            placeholder="Delivery ID"
            value={formData.deliveryId}
            onChange={e => setFormData({ ...formData, deliveryId: e.target.value })}
            required
          />
        </div>

        <div className="dm-form-group">
          <label className="dm-label">Destination</label>
          <input
            className="dm-input"
            type="text"
            placeholder="Destination"
            value={formData.destination}
            onChange={e => setFormData({ ...formData, destination: e.target.value })}
            required
          />
        </div>

        <div className="dm-form-group">
          <label className="dm-label">Driver's Name</label>
          <input
            className="dm-input"
            type="text"
            placeholder="Driver Name"
            value={formData.driverName}
            onChange={handleDriverNameChange}
            required
          />
        </div>

        <div className="dm-form-group">
          <label className="dm-label">Delivery Date</label>
          <div className="dm-date-container">
            <input
              className="dm-input dm-date-input"
              type="date"
              placeholder="dd/mm/yyyy"
              value={formData.deliveryDate}
              min={todayDate}
              onChange={handleDateChange}
              required
            />
            <span className="dm-calendar-icon" onClick={() => document.querySelector('input[type="date"]').showPicker()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </span>
          </div>
        </div>

        <div className="dm-form-group">
          <label className="dm-label">Status</label>
          <div className="dm-select-container">
            <select
              className="dm-select"
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="INCOMPLETE">Incomplete</option>
            </select>
          </div>
        </div>

        <button type="submit" className="dm-submit-btn">SUBMIT</button>
      </div>
    </form>
  );
}

export default DeliveryForm;
