import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  SuccessModal,
  ConfirmModal,
  AreYouSureModal,
} from "../../Admin/modal/success";
import EditAssetModal from "../../Admin/Asset-Management/editAssetModal";
import DistributeModal from "../../Admin/Asset-Management/distributeModal";
import Description from "../../Admin/modal/description";
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

const ITEMS_PER_PAGE = 10;

export default function AssetTable() {
  const [isAreYouSureModal, setIsAreYouSureModal] = useState(false);
  const [onConfirmAction, setOnConfirmAction] = useState(() => () => {});
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmTitle, setConfirmTitle] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDistributeOpen, setIsDistributeModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [asset, setAsset] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [conditionFilter, setConditionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);

  const handleCheckboxChange = (assetId) => {
    setSelectedAssets((prevSelected) =>
      prevSelected.includes(assetId)
        ? prevSelected.filter((id) => id !== assetId)
        : [...prevSelected, assetId]
    );
  };

  const openConfirmModal = (confirmAction, message, title) => {
    setOnConfirmAction(() => confirmAction);
    setIsAreYouSureModal(true);
    setConfirmMessage(message);
    setConfirmTitle(title)
  };

  const handleConditionChange = (event) => {
    setConditionFilter(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSelectAll = () => {
    if (selectedAssets.length === filteredAssets.length) {
      setSelectedAssets([]);
    } else {
      setSelectedAssets(filteredAssets.map((item) => item._id));
    }
  };

  const openDescriptionModal = (item) => {
    setSelectedAsset(item);
    setDescriptionModalOpen(true);
  };

  const openEditModal = (item) => {
    setSelectedAsset(item);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user) => {
    setSelectedAsset(user);
    setIsConfirmModalOpen(true);
  };

  const fetchAsset = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/asset/handling-assets`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAsset(res.data.handlingAssets);
      setFilteredAssets(res.data.handlingAssets);
    } catch (error) {
      console.error("Failed to fetch handling assets:", error);
      setMessage("Failed to fetch handling assets.");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    }
  };

  useEffect(() => {
    let updatedAssets = asset;

    if (conditionFilter !== "all") {
      updatedAssets = updatedAssets.filter(
        (item) => item.condition.toLowerCase() === conditionFilter
      );
    }

    if (statusFilter !== "all") {
      updatedAssets = updatedAssets.filter((item) => {
        return statusFilter === "undistributed"
          ? item.status === "just_added"
          : item.status.toLowerCase() === statusFilter;
      });
    }

    if (searchTerm) {
      updatedAssets = updatedAssets.filter(
        (item) =>
          item.productname.toLowerCase().includes(searchTerm) ||
          item.serialnumber.toLowerCase().includes(searchTerm) ||
          item.producttype.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredAssets(updatedAssets);
    setCurrentPage(0);
  }, [conditionFilter, statusFilter, searchTerm, asset]);

  const pageCount = Math.ceil(filteredAssets.length / ITEMS_PER_PAGE);
  const paginatedAssets = filteredAssets.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    fetchAsset();
  }, []);

  const handleUpdateAsset = async (updatedAsset) => {
    if (
      !updatedAsset.description ||
      !updatedAsset.productname ||
      !updatedAsset.producttype ||
      !updatedAsset.serialnumber ||
      !updatedAsset.condition
    ) {
      setMessage("Please input all the fields");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/asset/${updatedAsset._id}`,
        updatedAsset,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Item updated successfully!");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);

      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Can't Update User");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    }
  };

  const handleDeleteAsset = async () => {
    if (!selectedAsset) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/asset/${selectedAsset._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Item deleted successfully!");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage("Can't Delete Item");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    }
  };

  const submitDistribute = () => {
    setSelectedAssets([]);
  };

  const handleDeleteMultiple = async () => {
    if (!selectedAssets.length) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete("http://localhost:5000/api/asset/delete-multiple", {
        headers: { Authorization: `Bearer ${token}` },
        data: { ids: selectedAssets },
      });

      setMessage(`${selectedAssets.length} assets deleted successfully!`);
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);

      setIsAreYouSureModal(false);

      setSelectedAssets([]);
    } catch (error) {
      console.error("Error deleting assets:", error);
      setMessage("Can't delete selected assets.");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    }
  };

  const handleRequestReturn = async (assetId) => {
    try {
      if (!assetId) {
        alert("Asset ID is required");
        return;
      }
  
      const response = await axios.put("http://localhost:5000/api/distribute/request-return", {
        assetId, 
      });

      setMessage(`Request Submitted successfully!`);
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);

      setIsAreYouSureModal(false);
    } catch (error) {
      console.error("Error requesting return:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };
  

  return (
    <div class="flex flex-col gap-1 items-end justify-center w-full mx-auto">
      <EditAssetModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        item={selectedAsset}
        onUpdateAsset={handleUpdateAsset}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleDeleteAsset}
        message="Are you sure you want to delete this item?"
        user={selectedAsset ? selectedAsset.productname : ""}
      />

      <AreYouSureModal
        isOpen={isAreYouSureModal}
        onClose={() => setIsAreYouSureModal(false)}
        onConfirm={onConfirmAction}
        message={confirmMessage}
        title={confirmTitle}
      />

      <DistributeModal
        isOpen={isDistributeOpen}
        onClose={() => setIsDistributeModalOpen(false)}
        selectedAssets={asset.filter((item) =>
          selectedAssets.includes(item._id)
        )}
        onSubmit={submitDistribute}
      />

      <SuccessModal message={message} isVisible={showSuccessModal} />
      <Description
        isOpen={descriptionModalOpen}
        onClose={() => setDescriptionModalOpen(false)}
        item={selectedAsset}
      />
      <div class="flex flex-col gap-3 mx-auto py-4 w-full">
        {/* <!-- Filter --> */}
        <div class="flex items-center laptop:flex-row phone:flex-col gap-2 w-full">
          <h1 className="text-[22px] font-semibold mb-[6px]"> Assets </h1>
          <div class="flex justify-start w-[23%]">
            <input
              type="text"
              placeholder="Search Name | Serial | Product Type"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full h-10 py-4 px-3 border border-gray-700 shadow-sm sm:text-md outline-none rounded-2xl"
            />
          </div>
          <select
            className="px-1 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
            onChange={handleConditionChange}
            value={conditionFilter}
          >
            <option value="all">Condition</option>
            <option value="all">All</option>
            <option value="good">Good</option>
            <option value="broken">Broken</option>
            <option value="scrap">Scrap</option>
          </select>
          <select
            className="px-1 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
            onChange={handleStatusChange}
            value={statusFilter}
          >
            <option value="all">Status</option>
            <option value="all">All</option>
            <option value="undistributed">Undistributed</option>
            <option value="distributed">Distributed</option>
          </select>
          <div class="flex ml-auto gap-2">
            <div class="flex flex-row gap-2">
              {selectedAssets.length ? (
                <button
                  onClick={() => openConfirmModal(handleDeleteMultiple, "Are you sure to delete all these assets?", "Delete")}
                  class="border transition-all cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  <FontAwesomeIcon icon="trash" className="mr-2" />
                  Delete
                </button>
              ) : (
                <></>
              )}
              <button
                disabled={
                  !selectedAssets.length ||
                  selectedAssets.some((id) => {
                    const item = asset.find((item) => item._id === id);
                    return (
                      item?.condition === "Broken" ||
                      item?.condition === "Scrap"
                    );
                  })
                }
                onClick={() => setIsDistributeModalOpen(true)}
                class={`border-3 transition-all cursor-pointer font-semibold px-4 py-2 rounded-lg hover:text-white ${
                  !selectedAssets.length ||
                  selectedAssets.some((id) => {
                    const item = asset.find((item) => item._id === id);
                    return (
                      item?.condition === "Broken" ||
                      item?.condition === "Scrap"
                    );
                  })
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "text-blue-800 hover:bg-blue-800"
                }`}
              >
                <i class="fa-regular fa-folder-open"></i>
                {!(
                  !selectedAssets.length ||
                  selectedAssets.some((id) => {
                    const item = asset.find((item) => item._id === id);
                    return (
                      item?.condition === "Broken" ||
                      item?.condition === "Scrap"
                    );
                  })
                ) && <FontAwesomeIcon icon="share" className="mr-2" />}
                Distribute Asset
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Audit trail table --> */}
        <div class="rounded-lg shadow-md relative">
          <div class="w-full overflow-x-auto h-full rounded-lg">
            <table class="w-full bg-white">
              <thead class="bg-gray-200 ">
                <tr class="bg-gray-200 border-gray-400 text-md text-left px-4">
                  <th className="py-2 pl-2">
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      onChange={handleSelectAll}
                      checked={
                        selectedAssets.length === filteredAssets.length &&
                        asset.length > 0
                      }
                    />
                  </th>
                  <th class="py-3 px-2">Product</th>
                  <th class="py-3 px-4">Serial Number</th>
                  <th class="py-3 px-4">Product Type</th>
                  <th class="py-3 px-4">Description</th>
                  <th class="py-3 px-4">Condition</th>
                  <th class="py-3 px-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAssets.map((item) => (
                  <tr
                    key={item._id}
                    class="text-left border-gray-300 border-b-[1px]"
                  >
                    <td className="py-2 pl-2">
                      <input
                        type="checkbox"
                        className="w-5 h-5"
                        checked={selectedAssets.includes(item._id)}
                        onChange={() => handleCheckboxChange(item._id)}
                      />
                    </td>
                    <td className="py-2">
                      <div className="flex items-center gap-3">
                        <img
                          alt="item image"
                          class="w-16 h-12"
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
                        <span>{item.productname}</span>
                      </div>
                    </td>
                    <td class="py-2 px-4 whitespace-nowrap">
                      {item.serialnumber}
                    </td>
                    <td class="py-2 px-4 whitespace-nowrap">
                      {item.producttype}
                    </td>
                    <td class="py-2 px-4 whitespace-nowrap">
                      <button
                        onClick={() => openDescriptionModal(item)}
                        className="text-[18px] select-none ml-3 bg-blue-900 text-white py-1 px-3 rounded-2xl cursor-pointer font-semibold hover:bg-blue-700 transition-all"
                      >
                        view
                      </button>
                    </td>
                    <td class="py-2 px-1 whitespace-nowrap">
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

                    <td class="text-center max-w-[220px]">
                      <div class="flex flex-row flex-wrap py-2 gap-2">
                        <button
                          id="openModalBtn2"
                          disabled={selectedAssets.length}
                          onClick={() => openEditModal(item)}
                          className={`flex flex-row gap-2 cursor-pointer transition-all items-center border border-white  text-white px-3 py-1.5 rounded-full ${
                            !selectedAssets.length
                              ? "bg-amber-400 hover:bg-amber-600"
                              : "bg-gray-400 cursor-not-allowed"
                          }  `}
                        >
                          <FontAwesomeIcon icon="pen" />
                          Edit
                        </button>
                        <button
                          disabled={selectedAssets.length}
                          onClick={() => openDeleteModal(item)}
                          className={`flex flex-row gap-2 cursor-pointer transition-all items-center border border-white shadow-md  text-white px-3 py-1.5 rounded-full  ${
                            !selectedAssets.length
                              ? "bg-red-600 hover:bg-red-500"
                              : "bg-gray-400 cursor-not-allowed"
                          } `}
                        >
                          <FontAwesomeIcon icon="trash" />
                          Delete
                        </button>
                        <button
                          disabled={selectedAssets.length || item.status === "request_return"}
                          onClick={() => openConfirmModal(() => handleRequestReturn(item._id), "Do you want to submit return request?", "Return")}
                          className={`flex flex-row gap-2 cursor-pointer transition-all items-center border border-white shadow-md  text-white px-3 py-1.5 rounded-full  ${
                            !selectedAssets.length && item.status !== "request_return"
                              ? "bg-gray-950 hover:bg-gray-700"
                              : "bg-gray-400 cursor-not-allowed"
                          } `}
                        >
                          <FontAwesomeIcon icon="rotate-left" />
                          Return
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ReactPaginate
        previousLabel={"< Previous"}
        nextLabel={"Next >"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName="flex items-center justify-center space-x-2 mt-1"
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
    </div>
  );
}
