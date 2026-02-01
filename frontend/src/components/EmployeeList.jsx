import { useEffect, useState } from 'react';
import { api } from '../api';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees/');
      setEmployees(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch employees. Is backend running?');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this employee?')) {
      try {
        await api.delete(`/employees/${id}`);
        setEmployees(employees.filter((emp) => emp.id !== id));
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container" style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Employee List</h2>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Dept</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.employee_id}</td>
              <td>{emp.full_name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDelete(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
             <tr><td colSpan="5">No employees found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
