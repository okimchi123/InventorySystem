import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

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

    socket.on("updateAuditLogs", (logs) => {
      setAuditLogs(logs);
    });

    return () => {
      socket.removeAllListeners("updateAuditLogs"); 
    };
  }, [fetchLogs]);

  return (
    <div className="rounded-lg shadow-md">
      <div className="w-full overflow-x-auto h-full rounded-lg">
        <table className="w-full bg-white">
          <thead className="bg-gray-200">
            <tr className="bg-gray-200 border-b border-gray-400 text-sm text-left px-4">
              <th className="py-3 px-4 border-b whitespace-nowrap">User</th>
              <th className="py-3 px-4 border-b whitespace-nowrap">Performed By</th>
              <th className="py-3 px-4 border-b whitespace-nowrap">Role</th>
              <th className="py-3 px-4 border-b whitespace-nowrap">Status</th>
              <th className="py-3 px-4 border-b whitespace-nowrap">Action</th>
              <th className="py-3 px-4 border-b whitespace-nowrap">Date</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log) => (
              <tr key={log._id} className="border-b text-left">
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
