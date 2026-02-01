import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

function AddEmployee() {
  const navigate = useNavigate();
  // We use a single object to store all form data
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: '',
  });
  const [error, setError] = useState(null);

  // This function updates the state whenever you type in ANY input field
  const handleChange = (e) => {
    setFormData({
      ...formData, // Keep existing data (like name) while updating email
      [e.target.name]: e.target.value, // Update the specific field being typed in
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop the page from reloading
    setError(null);
    try {
      // Send the data to the Python Backend
      await api.post('/employees/', formData);
      // If successful, redirect user to the Employee List
      navigate('/');
    } catch (err) {
      // If backend sends an error (like "Email already exists"), show it
      if (err.response && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Failed to add employee');
      }
    }
  };

  return (
    <div className="card">
      <h2>Add New Employee</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee ID (Unique)</label>
          <input
            type="text"
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            placeholder="e.g. EMP001"
            required
          />
        </div>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Add Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;
