import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import moment from "moment";

export default function DistributeTable() {
  const [distributeLogs, setDistributeLogs] = useState([]);

  const fetchLogs = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/distribute/distributeLogs",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDistributeLogs(res.data);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="">
      <div className="flex flex-col items-end justify-center w-full mx-auto">
        <div className="flex gap-3 mx-auto py-4 w-full">
          <h1 className="text-2xl font-bold">Distribute History</h1>
          <input
            type="text"
            placeholder="Search email or product name"
            className="py-2 px-3 w-[240px] border border-gray-700 shadow-sm sm:text-md outline-none rounded-2xl"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full overflow-x-auto h-full border border-gray-300 rounded-lg shadow-md">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gray-200 border-gray-400 text-md text-left px-4">
                <th className="py-3 px-4 whitespace-nowrap">Date</th>
                <th className="py-3 px-4 whitespace-nowrap">Distributed By</th>
                <th className="py-3 px-4 whitespace-nowrap">Target User</th>
                <th className="py-3 px-4 whitespace-nowrap">Product</th>
                <th className="py-3 px-4 whitespace-nowrap">
                  Product Serial Number
                </th>
                <th className="py-3 px-4 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {distributeLogs.map((log) => (
                <tr
                  key={log._id}
                  className="text-left border-gray-300 border-b-[1px]"
                >
                  <td className="py-4 px-4 whitespace-nowrap">
                    {moment(log.createdAt).format("MMMM D, YYYY h:mm A")}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {log.fromUser}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">{log.toUser}</td>
                  <td className="py-4 px-4">
                    <div className="w-[180px] break-words whitespace-normal">
                      {log.productName.length > 1
                        ? log.productName.map((name, index) => (
                            <span key={index}>
                              {name}
                              {index !== log.productName.length - 1 && ", "}
                            </span>
                          ))
                        : log.productName}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-[200px] break-words whitespace-normal">
                      {log.productSN.length > 1
                        ? log.productSN.map((name, index) => (
                            <span key={index} className="">
                              {name}
                              {index !== log.productSN.length - 1 && ", "}
                            </span>
                          ))
                        : log.productSN}
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div
                      className={`py-[6px] rounded-lg text-center text-[18px] 
                      ${
                        log.action === "DEPLOYED"
                          ? "text-blue-900 bg-blue-100"
                          : "text-yellow-900 bg-yellow-100"
                      }`}
                    >
                      <span>{log.action}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
