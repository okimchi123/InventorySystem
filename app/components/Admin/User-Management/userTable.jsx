import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserTable({ openModal }) {
    const [users, setUsers] = useState([]);

    // Fetch users from backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/auth", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(res.data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="rounded-lg">
            {/* Filter Section */}
            <div className="flex laptop:flex-row phone:flex-col gap-1 w-full mb-[8px]">
                <h1 className="text-[22px] font-semibold mr-[8px]">Users</h1>
                <div className="flex justify-start">
                    <form className="flex flex-row items-center">
                        <select className="px-2 py-2 h-10 w-48 text-sm border border-gray-700 rounded-l-lg outline-none">
                            <option value="">ID</option>
                            <option value="Moderator">Moderator</option>
                            <option value="User">User</option>
                        </select>
                        <input type="text" placeholder="Search" className="w-full h-10 p-2 border border-gray-700 shadow-sm sm:text-sm outline-none rounded-r-lg" />
                    </form>
                </div>
                <div className="flex ml-auto">
                    <button onClick={openModal} className="cursor-pointer border flex items-center gap-[4px] bg-blue-800 hover:bg-blue-900 transition-all text-white px-3 py-2 rounded-lg">
                        <FontAwesomeIcon icon="circle-plus" />
                        <span>Add New User</span>
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="w-full overflow-x-auto h-full rounded-lg shadow-md">
                <table className="w-full bg-white">
                    <thead className="bg-gray-200">
                        <tr className="bg-gray-200 border-gray-400 text-sm text-left px-4">
                            <th className="py-3 px-4 whitespace-nowrap">ID</th>
                            <th className="py-3 px-4 whitespace-nowrap">Name</th>
                            <th className="py-3 px-4 whitespace-nowrap">Role</th>
                            <th className="py-3 px-4 whitespace-nowrap">Email</th>
                            <th className="py-3 px-4 whitespace-nowrap">Contact Number</th>
                            <th className="py-3 px-4 whitespace-nowrap">Status</th>
                            <th className="py-3 px-4 whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="text-left border-gray-300 border-b-[1px]">
                                <td className="py-6 px-4 whitespace-nowrap">{user._id.slice(0, 6)}</td>
                                <td className="py-6 px-4 whitespace-nowrap">{`${user.firstname} ${user.lastname}`}</td>
                                <td className="py-6 px-4 whitespace-nowrap">{user.role}</td>
                                <td className="py-6 px-4 whitespace-nowrap">{user.email}</td>
                                <td className="py-6 px-4 whitespace-nowrap">{user.phone}</td>
                                <td className="py-6 px-4 whitespace-nowrap">
                                    {user.status === "active" ? (
                                        <span className="text-green-900 bg-green-100 rounded-lg p-2 font-medium">Active</span>
                                    ) : user.status === "inactive" ? (
                                        <span className="text-red-900 bg-red-100 rounded-lg p-2 font-medium">Inactive</span>
                                      ) : (
                                        <span className="text-gray-900 bg-gray-200 rounded-lg p-2 font-medium">Deactivated</span>
                                      )}
                                </td>
                                <td class="text-center space-x-2">
                                    <div class="flex flex-row py-2 gap-1">
                                        <button class="flex flex-row gap-2 cursor-pointer items-center border border-white bg-amber-400 hover:bg-amber-600 text-white px-3 py-1.5 rounded-full transition-all">
                                            <FontAwesomeIcon icon="pen" />Edit
                                        </button>
                                        <button class="flex flex-row gap-2 cursor-pointer items-center border border-white shadow-md bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-full transition-all">
                                            <FontAwesomeIcon icon="trash" />Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
