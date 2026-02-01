import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './styles.css'; // Import our professional styles

// We will create these components in the next step
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import Attendance from './components/Attendance';

function App() {
  return (
    <Router>
      {/* Navigation Bar - Always visible */}
      <div className="navbar">
        <h2>HRMS Lite</h2>
        <div>
          <Link to="/">Employees</Link>
          <Link to="/add">Add Employee</Link>
          <Link to="/attendance">Attendance</Link>
        </div>
      </div>

      {/* Main Content Area - Changes based on URL */}
      <div className="container">
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
