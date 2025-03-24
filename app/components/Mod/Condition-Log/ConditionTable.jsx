import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import ReactPaginate from "react-paginate";

import laptop from "../../../assets/images/items/laptop.jpg";
import mouse from "../../../assets/images/items/mouse.jpg";
import phone from "../../../assets/images/items/phone.jpg";
import box from "../../../assets/images/items/box.jpg";
import charger from "../../../assets/images/items/charger.jpg";
import monitor from "../../../assets/images/items/monitor.jpg";
import printer from "../../../assets/images/items/printer.jpg";
import chair from "../../../assets/images/items/chair.jpg";
import table from "../../../assets/images/items/table.jpg";
import cable from "../../../assets/images/items/cable.jpg";

const ITEMS_PER_PAGE = 5;

export default function AssetCondition() {
  const [distributeLogs, setDistributeLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState(distributeLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const fetchLogs = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/audit-logs/userConditionLog",
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

  useEffect(() => {
    const filtered = distributeLogs.filter(
      (log) =>
        log.fromUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.productname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.serialnumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLogs(filtered);
  }, [searchQuery, distributeLogs]);

  const pageCount = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
  const paginatedLogs = filteredLogs.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="flex flex-col items-end justify-center w-full mx-auto">
      <div className="flex gap-3 mx-auto py-4 w-full">
        <input
          type="text"
          placeholder="Search"
          className="py-2 px-3 w-[240px] border border-gray-700 shadow-sm sm:text-md outline-none rounded-2xl"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="w-full overflow-x-auto h-full border border-gray-300 rounded-lg shadow-md">
        <table className="w-full bg-white">
          <thead>
            <tr className="bg-gray-200 border-gray-400 text-md text-left px-4">
              <th className="py-3 px-4 whitespace-nowrap">Altered by</th>
              <th className="py-3 px-4 whitespace-nowrap text-center">Product</th>
              <th className="py-3 px-4 whitespace-nowrap">
                Product Serial Number
              </th>
              <th className="py-3 px-4 whitespace-nowrap">Reason</th>
              <th className="py-3 px-4 whitespace-nowrap text-center">
                Action
              </th>
              <th className="py-3 px-4 whitespace-nowrap">Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.map((log) => (
              <tr
                key={log._id}
                className="text-left border-gray-300 border-b-[1px]"
              >
                <td className="py-4 px-4 whitespace-nowrap">{log.fromUser}</td>
                <td className="py-4 px-4">
                  <div className="flex gap-[12px]">
                    <img
                      alt="item image"
                      class="w-25 h-20"
                      src={
                        log.producttype === "Laptop"
                          ? laptop
                          : log.producttype === "Mouse"
                          ? mouse
                          : log.producttype === "Phone"
                          ? phone
                          : log.producttype === "Charger"
                          ? charger
                          : log.producttype === "Chair"
                          ? chair
                          : log.producttype === "Box"
                          ? box
                          : log.producttype === "Table"
                          ? table
                          : log.producttype === "Monitor"
                          ? monitor
                          : log.producttype === "Printer"
                          ? printer
                          : log.producttype === "Cable"
                          ? cable
                          : ""
                      }
                    />
                    <div className="flex flex-col mt-3">
                      <span className="text-[20px] font-medium">{log.productname} </span>
                      <span className="text-[16px] text-gray-500"> {log.producttype}</span>
                    </div>
                  </div>
                  
                </td>
                <td className="py-4 px-4">{log.serialnumber}</td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {log.condition === "Good"
                    ? "Fixed"
                    : log.condition === "Scrap"
                    ? "Scrapped"
                    : log.reason}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <div
                    className={`py-[6px] rounded-lg text-center text-[18px] 
                      ${
                        log.condition === "Good"
                          ? "text-green-900 bg-green-100"
                          : log.condition === "Broken"
                          ? "text-red-900 bg-red-100"
                          : "text-gray-900 bg-gray-200"
                      }`}
                  >
                    <span>{log.condition}</span>
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
