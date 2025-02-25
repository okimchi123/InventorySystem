import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./routes/protectedRoute";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './assets/styles/output.css'
import Login from './pages/login/login'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTachometerAlt, faListAlt, faWarehouse, faTools, faExclamationTriangle, faRecycle, faUsers, faUserTie, faUser, faBars, faAngleDown} from "@fortawesome/free-solid-svg-icons"

library.add(faTachometerAlt, faListAlt, faWarehouse, faTools, faExclamationTriangle, faRecycle, faUsers, faUserTie, faUser, faBars, faAngleDown)

  function App() {
    return (
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
      </Router>
    );
  }
  
  export default App;
