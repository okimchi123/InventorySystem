import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import moment from "moment";

export default function AuditTrail() {
  const [assetLogs, setAssetLogs] = useState([]);

  const fetchLogs = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/audit-logs/assetLog",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAssetLogs(res.data);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  });

  return (
    <div className="pt-22 py-6 laptop:px-12 px-10 phone:px-4">
      <div className="flex flex-col gap-1 items-end justify-center w-full mx-auto">
        <div className="flex gap-3 mx-auto py-4 w-full">
          <h1 className="text-2xl font-bold">Asset History</h1>
          <input
            type="text"
            placeholder="Search User"
            className="h-10 py-4 px-3 border border-gray-700 shadow-sm sm:text-md outline-none rounded-2xl"
          />
        </div>
        <div class="w-full overflow-x-auto h-full border border-gray-300 rounded-lg shadow-md">
          <table class="w-full bg-white">
            <thead>
              <tr class="bg-gray-200 border-gray-400 text-md text-left px-4">
                <th class="py-3 px-4 whitespace-nowrap">Date</th>
                <th class="py-3 px-4 whitespace-nowrap">User</th>
                <th class="py-3 px-4 whitespace-nowrap">Role</th>
                <th class="py-3 px-4 whitespace-nowrap">Product</th>
                <th class="py-3 px-4 whitespace-nowrap">
                  Product Serial Number
                </th>
                <th class="py-3 px-4 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {assetLogs.map((log) => (
                <tr
                  key={log._id}
                  className="text-left border-gray-300 border-b-[1px]"
                >
                  <td class="py-4 px-4 whitespace-nowrap">
                    {moment(log.createdAt).format("MMMM D, YYYY h:mm A")}
                  </td>
                  <td class="py-4 px-4 whitespace-nowrap">{log.userEmail}</td>
                  <td class="py-4 px-4 whitespace-nowrap">{log.userRole}</td>
                  <td class="py-4 px-4 whitespace-nowrap">{log.productName}</td>
                  <td class="py-4 px-4 whitespace-nowrap">{log.productSN}</td>
                  <td class="py-4 px-4 whitespace-nowrap">{log.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
