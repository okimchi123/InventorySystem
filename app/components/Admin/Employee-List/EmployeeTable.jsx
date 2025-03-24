import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ViewAsset from "./ViewAsset";
import AssetTable from "../Asset-Management/AssetTable";

const ITEMS_PER_PAGE = 8;

export default function EmployeeTable() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  function handleViewAssets(user) {
    setSelectedUser(user);
    setModalOpen(true);
  }

  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/distribute/getUserWithAssets",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      setUsers(res.data.users || []);
    } catch (error) {
      console.error("Failed to fetch Users:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col items-end justify-center w-full mx-auto" style={{paddingTop: '4rem'}}>
      <ViewAsset
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        user={selectedUser}
      />

      <div className="flex gap-3 mx-auto py-4 w-full">
        <input
          type="text"
          placeholder="Search User"
          className="py-2 px-3 w-[240px] border border-gray-700 shadow-sm sm:text-md outline-none rounded-2xl"
        />
      </div>
      <div className="w-full overflow-x-auto h-full border border-gray-300 rounded-lg shadow-md">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-gray-200 border-gray-400 text-md text-left px-4">
              <th className="py-3 px-4 whitespace-nowrap">Email</th>
              <th className="py-3 px-4 whitespace-nowrap">Name</th>
              <th className="py-3 px-4 whitespace-nowrap">Role</th>
              <th className="py-3 px-4 whitespace-nowrap">Phone</th>
              <th className="py-3 px-4 whitespace-nowrap">Assets</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) => user.handlingAssets != 0)
              .map((user) => (
                <tr
                  key={user._id}
                  className="text-left border-gray-300 border-b-[1px]"
                >
                  <td className="py-4 px-4 whitespace-nowrap">{user.email}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {user.firstname} {user.lastname}
                  </td>
                  <td className="py-4 px-4">{user.role}</td>
                  <td className="py-4 px-4">
                    {user.phone?.toString().padStart(11, "0")}
                  </td>
                  <td className="py-4 px-0 whitespace-nowrap">
                    <button
                      onClick={() => handleViewAssets(user)}
                      className="text-[18px] bg-blue-900 text-white py-2 px-4 rounded-2xl cursor-pointer font-semibold hover:bg-blue-700 transition-all"
                    >
                      <FontAwesomeIcon
                        icon="up-right-and-down-left-from-center"
                        className="mr-2.5"
                      />
                      view assets
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
