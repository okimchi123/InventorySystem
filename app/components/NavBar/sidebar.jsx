import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useLocation } from "react-router-dom";

export default function SideBar() {
    const location = useLocation();

    return (
        <div class="w-1/5 bg-blue-600 text-white h-screen px-[12px] py-[24px] fixed flex flex-col items-center">
            <h1 class="text-4xl mb-6 mt-2 font-medium font-russo">E-Inventory</h1>
            <ul class="font-monserat">
                <li class="mb-4">
                        <NavLink
                            to="/admin/Dashboard"
                            className={`flex items-center p-2 text-[18px] font-medium rounded-lg transition-all ${
                                location.pathname === "/admin/Dashboard"
                                  ? "bg-blue-500 text-white"
                                  : "hover:bg-blue-700"
                              }` }
                        >
                            <FontAwesomeIcon icon="tachometer-alt" className="mr-3" />
                            Dashboard
                        </NavLink>

                </li>
                <li class="mb-4">
                        <NavLink
                            to="/admin/Audit-Trail"
                            className={`flex items-center p-2 text-[18px] font-medium rounded-lg transition-all ${
                                location.pathname === "/admin/Audit-Trail"
                                  ? "bg-blue-500 text-white"
                                  : "hover:bg-blue-700"
                              }` }
                        >
                            <FontAwesomeIcon icon="list-alt" className="mr-3" />
                            Audit Trail
                        </NavLink>
                </li>
                <li class="mb-4">
                        <NavLink
                            to="/admin/dashboard"
                            className={`flex items-center p-2 text-[18px] font-medium rounded-lg transition-all ${
                                location.pathname === "/admin/Inventory-Management"
                                  ? "bg-blue-500 text-white"
                                  : "hover:bg-blue-700"
                              }` }
                        >
                            <FontAwesomeIcon icon="warehouse" className="mr-3" />
                            Inventory Management
                        </NavLink>
                </li>
                <li class="mb-4">
                        <NavLink
                            to="/admin/dashboard"
                            className={`flex items-center p-2 text-[18px] font-medium rounded-lg transition-all ${
                                location.pathname === "/admin/Asset-Management"
                                  ? "bg-blue-500 text-white"
                                  : "hover:bg-blue-700"
                              }` }
                        >
                            <FontAwesomeIcon icon="tools" className="mr-3" />
                            Asset Management
                        </NavLink>
                </li>
                <li class="mb-4">
                        <NavLink
                            to="/admin/dashboard"
                            className={`flex items-center p-2 text-[18px] font-medium rounded-lg transition-all ${
                                location.pathname === "/admin/Broken-Item-List"
                                  ? "bg-blue-500 text-white"
                                  : "hover:bg-blue-700"
                              }` }
                        >
                            <FontAwesomeIcon icon="exclamation-triangle" className="mr-3" />
                            Broken Item List
                        </NavLink>
                </li>
                <li class="mb-4">
                        <NavLink
                            to="/admin/dashboard"
                            className={`flex items-center p-2 text-[18px] font-medium rounded-lg transition-all ${
                                location.pathname === "/admin/Scrap-Item-List"
                                  ? "bg-blue-500 text-white"
                                  : "hover:bg-blue-700"
                              }` }
                        >
                            <FontAwesomeIcon icon="recycle" className="mr-3" />
                            Scrap Item List
                        </NavLink>
                </li>
                <li class="mb-4">
                        <NavLink
                            to="/admin/User-Management"
                            className={`flex items-center p-2 text-[18px] font-medium rounded-lg transition-all ${
                                location.pathname === "/admin/User-Management"
                                  ? "bg-blue-500 text-white"
                                  : "hover:bg-blue-700"
                              }` }
                        >
                            <FontAwesomeIcon icon="users" className="mr-3" />
                            User Management
                        </NavLink>
                </li>
                <li class="mb-4">
                        <NavLink
                            to="/admin/dashboard"
                            className={`flex items-center p-2 text-[18px] font-medium rounded-lg transition-all ${
                                location.pathname === "/admin/Employee"
                                  ? "bg-blue-500 text-white"
                                  : "hover:bg-blue-700"
                              }` }
                        >
                            <FontAwesomeIcon icon="user-tie" className="mr-3" />
                            Employee
                        </NavLink>
                </li>
            </ul>
        </div>
    )
}