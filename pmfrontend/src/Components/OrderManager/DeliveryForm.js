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
        if (window.confirm("Delivery report updated successfully! Download PDF?")) {
          downloadPDF();
        }
      }, 100);
    } else {
      alert("Invalid Delivery ID!");
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const formattedDate = formatDate(formData.deliveryDate);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);

    doc.text('Delivery Report', 20, 20);
    doc.text(`Delivery ID: ${formData.deliveryId}`, 20, 40);
    doc.text(`Driver Name: ${formData.driverName}`, 20, 50);
    doc.text(`Destination: ${formData.destination}`, 20, 60);
    doc.text(`Delivery Date: ${formattedDate}`, 20, 70);
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
      setFormData({ ...formData, driverName: value });
    }
  };

  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="delivery-management-form">
      <div className="dm-header">
        <h2 className="dm-title">DELIVERY MANAGEMENT</h2>
        <Link to="/delivery-reports" className="dm-all-delivery-btn">ALL DELIVERIES</Link>
      </div>

      <div className="dm-form-body">
        <input type="text" placeholder="Delivery ID" value={formData.deliveryId} onChange={e => setFormData({ ...formData, deliveryId: e.target.value })} required />
        <input type="text" placeholder="Destination" value={formData.destination} onChange={e => setFormData({ ...formData, destination: e.target.value })} required />
        <input type="text" placeholder="Driver Name" value={formData.driverName} onChange={handleDriverNameChange} required />
        <input type="date" value={formData.deliveryDate} min={todayDate} onChange={e => setFormData({ ...formData, deliveryDate: e.target.value })} required />
        <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="INCOMPLETE">Incomplete</option>
        </select>

        <button type="submit">SUBMIT</button>
      </div>
    </form>
  );
}

export default DeliveryForm;
