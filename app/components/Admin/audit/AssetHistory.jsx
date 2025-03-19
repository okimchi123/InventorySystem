import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import ReactPaginate from "react-paginate";

const ITEMS_PER_PAGE = 5;

export default function AssetHistory() {
  const [assetLogs, setAssetLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState(assetLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

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

  const pageCount = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
  const paginatedLogs = filteredLogs.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  
  useEffect(() => {
    fetchLogs();
  }, []); 
  
  useEffect(() => {
    const filtered = assetLogs.filter((log) =>
      log.productName.some((name) => name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      log.productSN.some((SN) => SN.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredLogs(filtered);
  }, [searchQuery, assetLogs]);

  return (
      <div className="flex flex-col items-end justify-center w-full mx-auto">
        <div className="flex gap-3 mx-auto py-4 w-full">
          <h1 className="text-2xl font-bold">Asset Log</h1>
          <input
            type="text"
            placeholder="Search product name or SN"
            className="py-2 px-3 w-[240px] border border-gray-700 shadow-sm sm:text-md outline-none rounded-2xl"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full overflow-x-auto h-full border border-gray-300 rounded-lg shadow-md">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gray-200 border-gray-400 text-md text-left px-4">
                <th className="py-3 px-4 whitespace-nowrap">User</th>
                <th className="py-3 px-4 whitespace-nowrap">Role</th>
                <th className="py-3 px-4 whitespace-nowrap">Product</th>
                <th className="py-3 px-4 whitespace-nowrap">
                  Product Serial Number
                </th>
                <th className="py-3 px-4 whitespace-nowrap text-center">Action</th>
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
                  <td className="py-4 px-4 whitespace-nowrap">{log.userRole}</td>
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
                        log.action === "CREATE"
                          ? "text-green-900 bg-green-100"
                          : log.action === "UPDATE"
                          ? "text-yellow-900 bg-yellow-100"
                          : "text-red-900 bg-red-200"
                      }`}
                    >
                      <span>{log.action}</span>
                    </div>
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
