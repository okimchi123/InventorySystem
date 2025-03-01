import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"], 
  reconnectionAttempts: 5,
});

export default function UserAudit() {
  const [auditLogs, setAuditLogs] = useState([]);

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

  return (
    <div className="rounded-lg">
      <h1 className="text-[22px] font-semibold mb-[6px]">History</h1>
      <div className="w-full overflow-x-auto h-full rounded-lg shadow-md">
        <table className="w-full bg-white">
          <thead className="bg-gray-200">
            <tr className="bg-gray-200 border-gray-400 text-sm text-left px-4">
              <th className="py-3 px-4 whitespace-nowrap">User</th>
              <th className="py-3 px-4 whitespace-nowrap">Performed By</th>
              <th className="py-3 px-4 whitespace-nowrap">Role</th>
              <th className="py-3 px-4 whitespace-nowrap">Status</th>
              <th className="py-3 px-4 whitespace-nowrap">Action</th>
              <th className="py-3 px-4 whitespace-nowrap">Date</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log) => (
              <tr key={log._id} className="text-left border-gray-300 border-b-[1px]">
                <td className="py-6 px-4 whitespace-nowrap">{log.userEmail}</td>
                <td className="py-6 px-4 whitespace-nowrap">
                  {log.performedBy ? log.performedBy.email : "Unknown"}
                </td>
                <td className="py-6 px-4 whitespace-nowrap">{log.userRole}</td>
                <td className="py-6 px-4 whitespace-nowrap">
                  {log.targetUser?.status === "active" ? (
                    <span className="text-green-900 bg-green-100 rounded-lg p-2 font-medium">Active</span>
                  ) : log.targetUser?.status === "inactive" ? (
                    <span className="text-red-900 bg-red-100 rounded-lg p-2 font-medium">Inactive</span>
                  ) : (
                    <span className="text-gray-900 bg-gray-200 rounded-lg p-2 font-medium">Deactivated</span>
                  )}
                </td>
                <td className="py-6 px-4 whitespace-nowrap">{log.action}</td>
                <td className="py-6 px-4 whitespace-nowrap">{moment(log.createdAt).format("MMMM D, YYYY h:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
