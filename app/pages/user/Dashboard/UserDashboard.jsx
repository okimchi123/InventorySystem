import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBar from "../../../components/NavBar/sidebar"
import TopBar from "../../../components/NavBar/topbar"

const UserDashboard = () => {

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

  return (
    <div className="flex flex-col">
        <TopBar
          name={adminData?.email}
          role={adminData?.role}
        />
        <Outlet />
    </div>
  );
};

export default UserDashboard;
