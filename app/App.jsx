import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard";
import ProtectedRoute from "./routes/protectedRoute";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './assets/styles/output.css'
import Login from './pages/login/login'
import SetPassword from "./pages/SetPassword/SetPassword";

import AdminMain from "./components/Admin/dashboard/adminMain"
import AuditTrail from "./pages/admin/Audit-Trail/AdminAudit";
import UserManagement from "./pages/admin/User-Management/UserManagement"
import AssetManagement from "./pages/admin/Asset-Management/AssetManagement";
import DistributePage from "./pages/admin/Distribute-History/DistributePage";
import AssetConditionLogs from "./pages/admin/Asset-Condition/AssetConditionPage";
import EmployeeList from "./pages/admin/Employee-list/EmployeeList";

import ModeratorDashboard from "./pages/mod/Dashboard/ModDashboard";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChartSimple, faUpRightAndDownLeftFromCenter, faUserPlus, faCheckToSlot, faHandshake, faScrewdriverWrench, faTrashCan, faAngleLeft, faAngleRight, faShare, faBoxesPacking, faBoxArchive,faUpDown,faTrash,faPen,faCirclePlus,faCircleUser, faTachometerAlt, faListAlt, faWarehouse, faTools, faExclamationTriangle, faRecycle, faUsers, faUserTie, faUser, faBars, faAngleDown, faCircleCheck, faCircleXmark, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

library.add( faChartSimple, faUpRightAndDownLeftFromCenter, faUserPlus, faCheckToSlot, faHandshake, faScrewdriverWrench, faTrashCan, faAngleLeft, faAngleRight, faShare, faBoxesPacking, faBoxArchive,faUpDown,faTrash,faPen,faCirclePlus,faCircleUser, faTachometerAlt, faListAlt, faWarehouse, faTools, faExclamationTriangle, faRecycle, faUsers, faUserTie, faUser, faBars, faAngleDown, faCircleCheck, faCircleXmark, faTriangleExclamation)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/set-password" element={<SetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminDashboard />}>
            <Route path="/admin/Dashboard" element={<AdminMain />} />
            <Route path="/admin/Asset-Log" element={<AuditTrail />} />
            <Route path="/admin/User-Management" element={<UserManagement />} />
            <Route path="/admin/Asset-Management" element={<AssetManagement />} /> 
            <Route path="/admin/Distribute-History" element={<DistributePage />} /> 
            <Route path="/admin/Asset-Condition" element={<AssetConditionLogs />} /> 
            <Route path="/admin/Employee-List" element={<EmployeeList />} /> 
          </Route>
        </Route>

        <Route element={<ModeratorDashboard />}>
            <Route path="/moderator/Dashboard" element={<AdminMain />} />
          </Route>

      </Routes>
    </Router>
  );
}

export default App;
