import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SuccessModal, ConfirmModal } from "../modal/success";
import EditUserModal from "./editUserModal";
import { io } from "socket.io-client";
import ReactPaginate from "react-paginate";

const USER_PER_PAGE = 10;

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
});

export default function UserTable({ openModal }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsConfirmModalOpen(true);
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/auth", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setMessage("Failed to fetch users.");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    }
  };

  useEffect(() => {
    fetchUsers();
    socket.on("updateUserLogs", (logs) => {
      setUsers(logs);
      setFilteredUsers(logs);
    });
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(0);
  }, [searchQuery, users]);

  const handleUpdateUser = async (updatedUser) => {
    if (
      !updatedUser.email ||
      !updatedUser.firstname ||
      !updatedUser.lastname ||
      !updatedUser.phone ||
      !updatedUser.role
    ) {
      setMessage("Please input all the fields");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/auth/${updatedUser._id}`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("User updated successfully!");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);

      setIsEditModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Can't Update User");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/auth/${selectedUser._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("User deleted successfully!");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
      setIsConfirmModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Can't Delete User");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    }
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
    if (role === "All") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(users.filter((user) => user.role === role));
    }
    setCurrentPage(0);
  };

  const handleSort = () => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      return sortOrder === "desc" ? dateA - dateB : dateB - dateA;
    });

    setFilteredUsers(sortedUsers);
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  const pageCount = Math.ceil(filteredUsers.length / USER_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    currentPage * USER_PER_PAGE,
    (currentPage + 1) * USER_PER_PAGE
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="rounded-lg flex flex-col items-end">
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
        onUpdateUser={handleUpdateUser}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDeleteUser}
        message="Are you sure you want to delete this user?"
        user={selectedUser ? selectedUser.email : ""}
      />
      <SuccessModal message={message} isVisible={showSuccessModal} />

      <div className="flex laptop:flex-row items-center phone:flex-col gap-1 w-full mb-[8px]">
        <h1 className="text-[22px] font-semibold mr-[8px]">Users</h1>
        <div className="flex justify-start">
          <form className="flex flex-row gap-[8px] items-center">
            <input
              type="text"
              placeholder="Search by Name or Email"
              className="w-full h-10 p-4 border border-gray-700 shadow-sm sm:text-md outline-none rounded-2xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="buttons flex p-[4px] gap-[4px]">
              <button
                type="button"
                className={`px-3 py-[4px] rounded-lg transition-all cursor-pointer border ${
                  selectedRole === "All"
                    ? "bg-gray-400 text-white"
                    : "text-gray-500 hover:bg-gray-400 hover:text-white"
                }`}
                onClick={() => handleRoleFilter("All")}
              >
                All
              </button>
              <button
                type="button"
                className={`px-3 py-[4px] rounded-lg transition-all cursor-pointer border ${
                  selectedRole === "Moderator"
                    ? "bg-gray-400 text-white"
                    : "text-gray-500 hover:bg-gray-400 hover:text-white"
                }`}
                onClick={() => handleRoleFilter("Moderator")}
              >
                Moderator
              </button>
              <button
                type="button"
                className={`px-3 py-[4px] rounded-lg transition-all cursor-pointer border ${
                  selectedRole === "User"
                    ? "bg-gray-400 text-white"
                    : "text-gray-500 hover:bg-gray-400 hover:text-white"
                }`}
                onClick={() => handleRoleFilter("User")}
              >
                User
              </button>
            </div>
          </form>
        </div>
        <div className="flex ml-auto">
          <button
            onClick={openModal}
            className="cursor-pointer border flex items-center gap-[4px] bg-blue-800 hover:bg-blue-900 transition-all text-white px-3 py-2 rounded-lg"
          >
            <FontAwesomeIcon icon="circle-plus" />
            <span>Add New User</span>
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto h-full rounded-lg shadow-md">
        <table className="w-full bg-white relative">
          <FontAwesomeIcon
            icon="up-down"
            className="select-none absolute right-3 top-1 cursor-pointer w-[30px] p-2 transition-transform duration-200 hover:scale-110"
            size="lg"
            onClick={handleSort}
          />
          <thead className="bg-gray-200">
            <tr className="bg-gray-200 border-gray-400 text-md text-left px-4">
              <th className="py-3 px-4 whitespace-nowrap">Name</th>
              <th className="py-3 px-4 whitespace-nowrap">Role</th>
              <th className="py-3 px-4 whitespace-nowrap">Email</th>
              <th className="py-3 px-4 whitespace-nowrap">Contact Number</th>
              <th className="py-3 px-4 whitespace-nowrap">Status</th>
              <th className="py-3 px-4 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user._id}
                className="text-left border-gray-300 border-b-[1px]"
              >
                <td className="py-4 px-4 whitespace-nowrap">{`${user.firstname} ${user.lastname}`}</td>
                <td className="py-4 px-4 whitespace-nowrap">{user.role}</td>
                <td className="py-4 px-4 whitespace-nowrap">{user.email}</td>
                <td className="py-4 px-4 whitespace-nowrap">{user.phone}</td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <div
                    className={`w-[75px] py-[6px] rounded-lg text-center text-[18px]
                      ${
                        user.status === "active"
                          ? "text-green-900 bg-green-100"
                          : user.status === "inactive"
                          ? "text-red-900 bg-red-100"
                          : "text-gray-900 bg-gray-200"
                      }`}
                  >
                    <span>{user.status}</span>
                  </div>
                </td>
                <td className="text-center space-x-2">
                  {user.role !== "Admin" && (
                    <div className="flex flex-row py-2 gap-1">
                      <button
                        onClick={() => openEditModal(user)}
                        className="flex flex-row gap-2 cursor-pointer items-center border border-white bg-amber-400 hover:bg-amber-600 text-white px-3 py-1.5 rounded-full transition-all"
                      >
                        <FontAwesomeIcon icon="pen" />
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(user)}
                        className="flex flex-row gap-2 cursor-pointer items-center border border-white shadow-md bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-full transition-all"
                      >
                        <FontAwesomeIcon icon="trash" />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={"< Previous"}
          nextLabel={"Next >"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName="flex items-center justify-center space-x-2 mt-3"
          pageClassName="rounded-md border text-blue-600 transition"
          pageLinkClassName="inline-block select-none px-3 py-2 w-full h-full cursor-pointer hover:bg-blue-500 hover:text-white rounded-md transition-all"
          activeClassName="bg-blue-500 text-white font-bold"
          previousClassName="rounded-md border-gray-400 font-semibold border select-none text-gray-600 transition"
          previousLinkClassName="inline-block select-none px-3 py-2 transition-all cursor-pointer hover:bg-gray-400 hover:text-white rounded-md"
          nextClassName="rounded-md border-gray-400 font-semibold border select-none text-gray-600 transition"
          nextLinkClassName="inline-block select-none px-3 py-2 transition-all cursor-pointer hover:bg-gray-400 hover:text-white rounded-md"
          breakClassName="text-gray-500"
          breakLinkClassName="inline-block px-3 py-2"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      )}
    </div>
  );
}
