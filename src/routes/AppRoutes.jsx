import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Inventory from '../pages/Inventory.jsx';
import POS from '../pages/POS.jsx';
import Report from '../pages/Reports.jsx';
import Staff from '../pages/Staff.jsx';


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/pos" element={<POS />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/staff" element={<Staff />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;