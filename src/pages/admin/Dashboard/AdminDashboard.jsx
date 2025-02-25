import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "../../../components/Admin/sidebar"
import TopBar from "../../../components/topbar"
import AdminMain from "../../../components/Admin/dashboard/adminMain"
import AuditTrail from "../Audit Trail/AdminAudit";

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found, redirecting to login...");
      navigate("/login");
      return;
    }

    const response = await fetch("http://localhost:5000/api/admin", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 401 || response.status === 403) {
      console.error("Unauthorized access, logging out...");
      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch admin data");
    }

    const data = await response.json();
    setAdminData(data);
  } catch (error) {
    console.error("Error fetching admin data:", error);
    navigate("/login");
  }
};

    fetchAdminData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="w-4/5 ml-auto">
        <TopBar 
          name={adminData?.email}
          role={adminData?.role}
          onLogout={handleLogout}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
