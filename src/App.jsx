import AdminDashboard from "./components/Admin/dashboard/AdminDashboard";
import ProtectedRoute from "./routes/protectedRoute";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './styles/output.css'
import Login from './components/login'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTachometerAlt, faListAlt, faWarehouse, faTools, faExclamationTriangle, faRecycle, faUsers, faUserTie, faUser, faBars, faAngleDown} from "@fortawesome/free-solid-svg-icons"

library.add(faTachometerAlt, faListAlt, faWarehouse, faTools, faExclamationTriangle, faRecycle, faUsers, faUserTie, faUser, faBars, faAngleDown)

  function App() {
    return (
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
      </Router>
    );
  }
  
  export default App;
