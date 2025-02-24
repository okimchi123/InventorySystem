import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Store role in localStorage after login

  if (!token) return <Navigate to="/login" />;
  if (!allowedRoles.includes(userRole)) return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export default ProtectedRoute;
