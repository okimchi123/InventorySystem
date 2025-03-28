import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useLocation } from "react-router-dom";

export default function SideBar({ role }) {
    const location = useLocation();

    const isAdmin = role === "Admin";
    const isModerator = role === "Moderator";
    const isUser = role === "User";

    return (
        <div className="w-1/5 bg-blue-600 text-white h-screen px-[12px] py-[24px] sticky top-5 flex flex-col items-center">
            <h1 className="text-4xl mb-6 mt-2 font-medium font-russo">E-Inventory</h1>
            <ul className="font-monserat">
                <li className="mb-4">
                    <NavLink
                    to={`/${role?.toLowerCase()}/Dashboard`} 
                        className={`flex items-center select-none px-5 py-3 text-[18px] font-medium rounded-lg transition-all ${
                            location.pathname === "/admin/Dashboard" || location.pathname === "/moderator/Dashboard"
                            ? "bg-blue-500 text-white"
                            : "hover:bg-blue-700"
                        }`}
                    >
                        <FontAwesomeIcon icon="tachometer-alt" className="mr-3" />
                        Dashboard
                    </NavLink>
                </li>

                <li className="mb-4">
                    <NavLink
                        to={`/${role?.toLowerCase()}/Asset-Management`}
                        className={`flex items-center select-none px-5 py-3 text-[18px] font-medium rounded-lg transition-all ${
                            location.pathname === "/admin/Asset-Management" || location.pathname === "/moderator/Asset-Management"
                            ? "bg-blue-500 text-white"
                            : "hover:bg-blue-700"
                        }`}
                    >
                        <FontAwesomeIcon icon="box-archive" className="mr-3" />
                        Asset Management
                    </NavLink>
                </li>

                <li className="mb-4">
                    <NavLink
                        to="/admin/Asset-Log"
                        className={`flex items-center select-none px-5 py-3 text-[18px] font-medium rounded-lg transition-all ${
                            location.pathname === "/admin/Asset-Log"
                            ? "bg-blue-500 text-white"
                            : "hover:bg-blue-700"
                        }`}
                    >
                        <FontAwesomeIcon icon="list-alt" className="mr-3" />
                        Asset Log
                    </NavLink>
                </li>

                <li className="mb-4">
                    <NavLink
                        to="/admin/Distribute-History"
                        className={`flex items-center select-none px-5 py-3 text-[18px] font-medium rounded-lg transition-all ${
                            location.pathname === "/admin/Distribute-History"
                            ? "bg-blue-500 text-white"
                            : "hover:bg-blue-700"
                        }`}
                    >
                        <FontAwesomeIcon icon="list-alt" className="mr-3" />
                        Distribute History
                    </NavLink>
                </li>

                <li className="mb-4">
                    <NavLink
                        to="/admin/Asset-Condition"
                        className={`flex items-center select-none px-5 py-3 text-[18px] font-medium rounded-lg transition-all ${
                            location.pathname === "/admin/Asset-Condition"
                            ? "bg-blue-500 text-white"
                            : "hover:bg-blue-700"
                        }`}
                    >
                        <FontAwesomeIcon icon="list-alt" className="mr-3" />
                        Asset Condition Log
                    </NavLink>
                </li>

                <li className="mb-4">
                            <NavLink
                                to="/admin/Employee-List"
                                className={`flex items-center select-none px-5 py-3 text-[18px] font-medium rounded-lg transition-all ${
                                    location.pathname === "/admin/Employee-List"
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-blue-700"
                                }`}
                            >
                                <FontAwesomeIcon icon="users" className="mr-3" />
                                Employee List
                            </NavLink>
                        </li>
                {isAdmin && (
                    <>
                        <li className="mb-4">
                            <NavLink
                                to="/admin/User-Management"
                                className={`flex items-center select-none px-5 py-3 text-[18px] font-medium rounded-lg transition-all ${
                                    location.pathname === "/admin/User-Management"
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-blue-700"
                                }`}
                            >
                                <FontAwesomeIcon icon="user-plus" className="mr-3" />
                                User Management
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}
