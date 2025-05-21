import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { SuccessModal, AreYouSureModal } from "../modal/success";

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

const ITEMS_PER_PAGE = 8;

export default function ReturnTable() {
  const [asset, setAsset] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState(asset);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const [isAreYouSureModal, setIsAreYouSureModal] = useState(false);
  const [onConfirmAction, setOnConfirmAction] = useState(() => () => {});
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmTitle, setConfirmTitle] = useState("");

  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const openConfirmModal = (confirmAction, message, title) => {
    setOnConfirmAction(() => confirmAction);
    setIsAreYouSureModal(true);
    setConfirmMessage(message);
    setConfirmTitle(title);
  };

  const fetchAsset = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://inventorysystem-lfak.onrender.com/api/distribute/returningAssets",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAsset(res.data);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
  }, []);

  const pageCount = Math.ceil(filteredAssets.length / ITEMS_PER_PAGE);
  const paginatedLogs = filteredAssets.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    fetchAsset();
  }, [fetchAsset]);

  useEffect(() => {
    console.log("Updated asset:", asset);
  }, [asset]);

  useEffect(() => {
    const filtered = asset.filter(
      (item) =>
        item.productname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.distributedToName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAssets(filtered);
  }, [searchQuery, asset]);

  const handleCancelRequest = async (assetId) => {
    try {
      if (!assetId) {
        alert("Asset ID is required");
        return;
      }
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "https://inventorysystem-lfak.onrender.com/api/distribute/cancel-request",
        {
          assetId,
        },{
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(`Request Cancelled successfully!`);
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);

      setIsAreYouSureModal(false);
    } catch (error) {
      console.error("Error cancelling request return:", error);
    }
  };

  const handleAcceptRequest = async (assetId) => {
    try {
      if (!assetId) {
        alert("Asset ID is required");
        return;
      }
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "https://inventorysystem-lfak.onrender.com/api/distribute/accept-return",
        {
          assetId,
        },{
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(`Request Accepted successfully!`);
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);

      setIsAreYouSureModal(false);
    } catch (error) {
      console.error("Error cancelling request return:", error);
    }
  };

  return (
    <div className="flex flex-col items-end justify-center w-full mx-auto">
      <AreYouSureModal
        isOpen={isAreYouSureModal}
        onClose={() => setIsAreYouSureModal(false)}
        onConfirm={onConfirmAction}
        message={confirmMessage}
        title={confirmTitle}
      />
      <SuccessModal message={message} isVisible={showSuccessModal} />
      <div className="flex gap-3 mx-auto py-4 w-full">
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
              <th className="py-3 px-4 whitespace-nowrap">Asset From</th>
              <th className="py-3 px-4 whitespace-nowrap text-center">
                Product
              </th>
              <th className="py-3 px-4 whitespace-nowrap">Condition</th>
              <th className="py-3 px-4 whitespace-nowrap">
                Product Serial Number
              </th>
              <th className="py-3 px-4 whitespace-nowrap text-center">
                Action
              </th>
              <th className="py-3 px-4 whitespace-nowrap">Request Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.map((item) => (
              <tr
                key={item._id}
                className="text-left border-gray-300 border-b-[1px]"
              >
                <td className="py-4 px-4 whitespace-nowrap">
                  {item.distributedToName}
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex gap-[12px]">
                    <img
                      alt="item image"
                      className="w-25 h-20"
                      src={
                        item.producttype === "Laptop"
                          ? laptop
                          : item.producttype === "Mouse"
                          ? mouse
                          : item.producttype === "Phone"
                          ? phone
                          : item.producttype === "Charger"
                          ? charger
                          : item.producttype === "Chair"
                          ? chair
                          : item.producttype === "Box"
                          ? box
                          : item.producttype === "Table"
                          ? table
                          : item.producttype === "Monitor"
                          ? monitor
                          : item.producttype === "Printer"
                          ? printer
                          : item.producttype === "Cable"
                          ? cable
                          : ""
                      }
                    />
                    <div className="flex flex-col mt-3">
                      <span className="text-[20px] font-medium">
                        {item.productname}{" "}
                      </span>
                      <span className="text-[16px] text-gray-500">
                        {" "}
                        {item.producttype}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <div
                    className={`w-[80px] py-1 rounded-lg text-center select-none
                      ${
                        item.condition === "Good"
                          ? "text-green-900 bg-green-100"
                          : item.condition === "Broken"
                          ? "text-red-900 bg-red-100"
                          : "text-gray-900 bg-gray-200"
                      }`}
                  >
                    <span className="font-medium rounded-lg">
                      {item.condition}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">{item.serialnumber}</td>
                <td className="py-4 px-4 whitespace-nowrap">
                  <div className="flex flex-row justify-center py-2 gap-2">
                    <button 
                     onClick={() =>
                      openConfirmModal(
                        () => handleAcceptRequest(item._id),
                        `Accept ${item.distributedToName} Return Asset Request?`,
                        "Accept"
                      )
                    }
                    className="flex flex-row gap-2 cursor-pointer transition-all items-center border border-white  text-white px-4 py-2 rounded-full bg-green-400 hover:bg-green-600">
                      Accept Request
                    </button>
                    <button
                      onClick={() =>
                        openConfirmModal(
                          () => handleCancelRequest(item._id),
                          `Cancel ${item.distributedToName} Return Request?`,
                          "Return"
                        )
                      }
                      className="flex flex-row gap-2 cursor-pointer transition-all items-center border border-white  text-white px-4 py-2 rounded-full bg-red-400 hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
                <td className="py-4 px-4 whitespace-nowrap">
                  {moment(item.requestDate).format("MMMM D, YYYY h:mm A")}
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
