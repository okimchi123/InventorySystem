import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Admin Dashboard</h1>
      {adminData ? (
        <div>
          <p>Welcome, {adminData.name}</p>
          <p>Email: {adminData.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminDashboard;
