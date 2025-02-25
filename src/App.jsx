import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard";
import ProtectedRoute from "./routes/protectedRoute";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './assets/styles/output.css'
import Login from './pages/login/login'
import AdminMain from "./components/Admin/dashboard/adminMain"
import AuditTrail from "./pages/admin/Audit Trail/AdminAudit";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTachometerAlt, faListAlt, faWarehouse, faTools, faExclamationTriangle, faRecycle, faUsers, faUserTie, faUser, faBars, faAngleDown } from "@fortawesome/free-solid-svg-icons"

library.add(faTachometerAlt, faListAlt, faWarehouse, faTools, faExclamationTriangle, faRecycle, faUsers, faUserTie, faUser, faBars, faAngleDown)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Admin Layout: Sidebar & TopBar remain the same */}
          <Route element={<AdminDashboard />}>
            <Route path="/admin/Dashboard" element={<AdminMain />} />
            <Route path="/admin/Audit-Trail" element={<AuditTrail />} /> 
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
