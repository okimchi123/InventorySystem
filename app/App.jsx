import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard";
import ProtectedRoute from "./routes/protectedRoute";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './assets/styles/output.css'
import Login from './pages/login/login'
import AdminMain from "./components/Admin/dashboard/adminMain"
import AuditTrail from "./pages/admin/Audit-Trail/AdminAudit";
import AddUser from "./pages/admin/User-Management/AddUser"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash,faPen,faCirclePlus,faCircleUser, faTachometerAlt, faListAlt, faWarehouse, faTools, faExclamationTriangle, faRecycle, faUsers, faUserTie, faUser, faBars, faAngleDown, faCircleCheck, faCircleXmark, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

library.add( faTrash,faPen,faCirclePlus,faCircleUser, faTachometerAlt, faListAlt, faWarehouse, faTools, faExclamationTriangle, faRecycle, faUsers, faUserTie, faUser, faBars, faAngleDown, faCircleCheck, faCircleXmark, faTriangleExclamation)

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
            <Route path="/admin/User-Management" element={<AddUser />} /> 
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
