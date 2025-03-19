import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPaginate from "react-paginate";

const USER_PER_PAGE = 10;

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
});

export default function UserAudit() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  const [currentPage, setCurrentPage] = useState(0);

  const fetchLogs = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/audit-logs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAuditLogs(res.data);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
  }, []);

  useEffect(() => {
    fetchLogs();

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socket.on("updateAuditLogs", (logs) => {
      setAuditLogs(logs);
    });

    return () => {
      socket.off("updateAuditLogs");
    };
  }, [fetchLogs]);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const sortedLogs = [...auditLogs].sort((a, b) => {
    return sortOrder === "asc"
      ? new Date(a.createdAt) - new Date(b.createdAt)
      : new Date(b.createdAt) - new Date(a.createdAt);
  });

  const pageCount = Math.ceil(sortedLogs.length / USER_PER_PAGE);
  const paginatedLogs = sortedLogs.slice(
    currentPage * USER_PER_PAGE,
    (currentPage + 1) * USER_PER_PAGE
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="rounded-lg flex flex-col items-end">
      <div className="top-part flex w-[100%] justify-between items-center pr-4">
        <h1 className="text-[22px] font-semibold mb-[6px]">History</h1>
      </div>

      <div className="w-full overflow-x-auto h-full rounded-lg shadow-md">
        <table className="w-full bg-white relative">
          <FontAwesomeIcon
            icon="up-down"
            className="select-none absolute right-3 top-1 cursor-pointer w-[30px] p-2 transition-transform duration-200 hover:scale-110"
            size="lg"
            onClick={toggleSortOrder}
          />
          <thead className="bg-gray-200">
            <tr className="bg-gray-200 border-gray-400 text-md text-left px-4">
              <th className="py-3 px-4 whitespace-nowrap">Target User</th>
              <th className="py-3 px-4 whitespace-nowrap">Performed By</th>
              <th className="py-3 px-4 whitespace-nowrap">Role</th>
              <th className="py-3 px-4 whitespace-nowrap">Action</th>
              <th className="py-3 px-4 whitespace-nowrap">Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.map((log) => (
              <tr
                key={log._id}
                className="text-left border-gray-300 border-b-[1px]"
              >
                <td className="py-4 px-4 whitespace-nowrap">{log.userEmail}</td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {log.performedBy ? log.performedBy.email : "Unknown"}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">{log.userRole}</td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <span
                    className={`font-medium rounded-lg p-2 
                     ${
                       log.action === "CREATE"
                         ? "text-green-900 bg-green-100"
                         : log.action === "UPDATE"
                         ? "text-yellow-900 bg-yellow-100"
                         : log.action === "DELETE"
                         ? "text-red-900 bg-red-100"
                         : "text-gray-900 bg-gray-200"
                     }`}
                  >
                    {log.action}
                  </span>
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {moment(log.createdAt).format("MMMM D, YYYY h:mm A")}
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
