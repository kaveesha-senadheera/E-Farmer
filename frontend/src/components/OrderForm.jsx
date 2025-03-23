import { useState } from "react";

function OrderForm({ order, onSave, onCancel }) {
  const [formData, setFormData] = useState(order || {
    firstName: '', lastName: '', address: '', province: '', city: '',
    postalCode: '', mobileNo: '', paymentMethod: 'CASH_ON_DELIVERY'
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};


    if (!formData.postalCode || !/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Postal code must be exactly 5 digits';
    }

    if (!formData.mobileNo || !/^\d{10}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = 'Phone number must be exactly 10 digits';
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Payment method is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted successfully', formData);
      if (order) onSave(order._id, formData);
      else onSave(formData);
    } else {
      console.log('Form has errors');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Fill Your Order Details</h2>
          <button className="close-button" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              className="form-input-half"
              placeholder="Receiver's Firstname"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            
            <input
              type="text"
              className="form-input-half"
              placeholder="Receiver's Lastname"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
            
          </div>

          <div className="form-row-full">
            <textarea
              className="form-textarea"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            ></textarea>
            
          </div>

          <div className="form-row">
            <input
              type="text"
              className="form-input-half"
              placeholder="Province"
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              required
            />
            
            <input
              type="text"
              className="form-input-half"
              placeholder="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
            
          </div>

          <div className="form-row">
            <input
              type="text"
              className="form-input-half"
              placeholder="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
            />
            {errors.postalCode && <span className="error">{errors.postalCode}</span>}
            <input
              type="text"
              className="form-input-half"
              placeholder="Phone Number"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
            />
            {errors.mobileNo && <span className="error">{errors.mobileNo}</span>}
          </div>

          <div className="form-row-full">
            <select
              className="form-select"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
            >
              <option value="">Select Payment Method</option>
              <option value="CASH_ON_DELIVERY">Cash on Delivery</option>
              <option value="PAY_ONLINE">Pay Online</option>
            </select>
            {errors.paymentMethod && <span className="error">{errors.paymentMethod}</span>}
          </div>

          <div className="button-group">
            <button type="submit" className="submit-button">Submit</button>
            <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OrderForm;