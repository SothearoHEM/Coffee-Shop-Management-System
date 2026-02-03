import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Inventory from '../pages/Inventory.jsx';
import POS from '../pages/POS.jsx';
import Report from '../pages/Reports.jsx';
import Staff from '../pages/Staff.jsx';
import Navbar from '../components/common/Navbar.jsx';
import Header from '../components/common/Header.jsx';
import Menu from '../pages/Menu.jsx';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';


function AppRoutes() {
  const {currentUser, isLoggedIn} = useContext(AuthContext);
  if (!currentUser || !isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/*" element={<Login />} />
        </Routes>
      </Router>
    );
  }else{
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/pos" element={<POS />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/staff" element={<Staff />} />
      </Routes>
    </Router>
  );
}
}
export default AppRoutes;