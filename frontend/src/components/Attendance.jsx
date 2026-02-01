import { useEffect, useState } from 'react';
import { api } from '../api';

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchEmployees();
    fetchRecords();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/employees/');
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employees');
    }
  };

  const fetchRecords = async () => {
    try {
      const res = await api.get('/attendance/');
      setRecords(res.data);
    } catch (err) {
      console.error('Error fetching attendance');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/attendance/', formData);
      setMessage('Attendance marked successfully');
      fetchRecords(); 
    } catch (err) {
      setMessage('Failed to mark attendance');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Mark Attendance</h2>
        {message && <div style={{ color: 'blue', marginBottom: '1rem' }}>{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select Employee</label>
            <select
              value={formData.employee_id}
              onChange={(e) => setFormData({...formData, employee_id: e.target.value})}
              required
            >
              <option value="">-- Select --</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.employee_id}>
                  {emp.full_name} ({emp.employee_id})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>

      <div className="card">
        <h2>Attendance History</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Employee ID</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.date}</td>
                <td style={{ color: rec.status === 'Absent' ? 'red' : 'green', fontWeight: 'bold' }}>
                  {rec.status}
                </td>
                <td>{rec.employee_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;
