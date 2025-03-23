import { useState } from 'react';
import { Link } from 'react-router-dom';

function DeliveryForm({ onUpdate, deliveries }) {
  const [formData, setFormData] = useState({
    deliveryId: '',
    driverName: '',
    destination: '',
    deliveryDate: '',
    status: 'COMPLETED'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const delivery = deliveries.find(d => d._id === formData.deliveryId);
    if (delivery) {
      onUpdate(delivery._id, {
        driverName: formData.driverName,
        destination: formData.destination,
        deliveryDate: formData.deliveryDate,
        status: formData.status
      });
    }
    setFormData({ deliveryId: '', driverName: '', destination: '', deliveryDate: '', status: 'COMPLETED' });
  };

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
            onChange={e => setFormData({...formData, deliveryId: e.target.value})}
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
            onChange={e => setFormData({...formData, destination: e.target.value})}
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
            onChange={e => setFormData({...formData, driverName: e.target.value})}
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
              onChange={e => setFormData({...formData, deliveryDate: e.target.value})}
              onClick={e => e.target.showPicker}
              required
            />
            <span className="dm-calendar-icon">
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
              onChange={e => setFormData({...formData, status: e.target.value})}>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">COMPLETED</option>
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