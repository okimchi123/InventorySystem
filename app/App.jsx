import ProtectedRoute from "./routes/protectedRoute";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './assets/styles/output.css'
import Login from './pages/login/login'
import SetPassword from "./pages/SetPassword/SetPassword";

import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard";
import AdminMain from "./components/Admin/dashboard/adminMain"
import AuditTrail from "./pages/admin/Audit-Trail/AdminAudit";
import UserManagement from "./pages/admin/User-Management/UserManagement"
import AssetManagement from "./pages/admin/Asset-Management/AssetManagement";
import DistributePage from "./pages/admin/Distribute-History/DistributePage";
import AssetConditionLogs from "./pages/admin/Asset-Condition/AssetConditionPage";
import EmployeeList from "./pages/admin/Employee-list/EmployeeList";
import ReturnRequest from "./pages/admin/Return-Request/ReturnRequest";

import ModeratorDashboard from "./pages/mod/Dashboard/ModDashboard";
import ModAssetManagement from "./pages/mod/Asset-Management/AssetManagement";
import ModAssetLog from "./pages/mod/Asset-Log/AssetLogPage";
import ModDistributeLog from "./pages/mod/Distribute-History/DistributeHistoryPage";
import ModConditionLog from "./pages/mod/Condition-Log/ConditionLog";
import ModEmployeeList from "./pages/mod/Employee-List/EmployeeList";
import ModReturnRequest from "./pages/mod/Return-Request/ReturnRequest";

import UserDashboard from "./pages/user/Dashboard/UserDashboard";
import UserMain from "./components/User/Dashboard/Dashboard";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faClockRotateLeft, faFileExport,faRotateLeft, faLock, faChartSimple, faUpRightAndDownLeftFromCenter, faUserPlus, faCheckToSlot, faHandshake, faScrewdriverWrench, faTrashCan, faAngleLeft, faAngleRight, faShare, faBoxesPacking, faBoxArchive,faUpDown,faTrash,faPen,faCirclePlus,faCircleUser, faTachometerAlt, faListAlt, faWarehouse, faTools, faExclamationTriangle, faRecycle, faUsers, faUserTie, faUser, faBars, faAngleDown, faCircleCheck, faCircleXmark, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

library.add( faClockRotateLeft, faFileExport,faRotateLeft, faLock, faChartSimple, faUpRightAndDownLeftFromCenter, faUserPlus, faCheckToSlot, faHandshake, faScrewdriverWrench, faTrashCan, faAngleLeft, faAngleRight, faShare, faBoxesPacking, faBoxArchive,faUpDown,faTrash,faPen,faCirclePlus,faCircleUser, faTachometerAlt, faListAlt, faWarehouse, faTools, faExclamationTriangle, faRecycle, faUsers, faUserTie, faUser, faBars, faAngleDown, faCircleCheck, faCircleXmark, faTriangleExclamation)

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
            <Route path="/admin/Return-Request" element={<ReturnRequest />} /> 
          </Route>
        </Route>

        <Route element={<ModeratorDashboard />}>
            <Route path="/moderator/Dashboard" element={<AdminMain />} />
            <Route path="/moderator/Asset-Management" element={<ModAssetManagement />} />
            <Route path="/moderator/Asset-Log" element={<ModAssetLog />} />
            <Route path="/moderator/Distribute-History" element={<ModDistributeLog />} />
            <Route path="/moderator/Asset-Condition" element={<ModConditionLog />} />
            <Route path="/moderator/Employee-List" element={<ModEmployeeList />} />
            <Route path="/moderator/Return-Request" element={<ModReturnRequest />} />
          </Route>

          <Route element={<UserDashboard />}>
            <Route path="/user/Dashboard" element={<UserMain />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
