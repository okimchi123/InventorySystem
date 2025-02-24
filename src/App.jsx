import AdminDashboard from "./components/Admin/AdminDashboard";
import ProtectedRoute from "./routes/protectedRoute";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './styles/output.css'
import Login from './components/login'

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
