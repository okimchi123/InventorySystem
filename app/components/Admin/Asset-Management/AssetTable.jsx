import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SuccessModal} from "../modal/success";
import AddAssetModal from "./AddAssetModal";
import { io } from "socket.io-client";

export default function AssetTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [asset, setAsset] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const [formData, setFormData] = useState({
    productname: "",
    producttype: "",
    description: "",
    serialnumber: "",
    availablestock: "",
    deployedstock: "",
    condition: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async () => {
    if (
      !formData.description ||
      !formData.productname ||
      !formData.producttype ||
      !formData.serialnumber ||
      !formData.availablestock ||
      !formData.deployedstock ||
      !formData.condition
    ) {
      setMessage("Please input all the fields");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Authentication error. Please log in again.");
        setShowSuccessModal(true);
        return;
      }

      await axios.post("http://localhost:5000/api/asset", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Asset added successfully!");

      // Reset the form
      setFormData({
        productname: "",
        producttype: "",
        description: "",
        serialnumber: "",
        availablestock: "",
        deployedstock: "",
        condition: "",
      });

      closeModal(); // Close modal first
      setShowSuccessModal(true); // Show success message
      setTimeout(() => setShowSuccessModal(false), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add user.");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    }
  };
  
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/asset", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAsset(res.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setMessage("Failed to fetch users.");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    }
  };

 useEffect(() => {
    fetchUsers();
  }, []);
  
  return (
    <div class="flex flex-col gap-1 items-end justify-center w-full mx-auto">
        <AddAssetModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                formData={formData}
              />
              <SuccessModal message={message} isVisible={showSuccessModal} />
      <div class="flex flex-col gap-3 mx-auto py-4 w-full">
        {/* <!-- Filter --> */}
        <div class="flex items-center laptop:flex-row phone:flex-col gap-2 w-full">
          <h1 className="text-[22px] font-semibold mb-[6px]"> Assets </h1>
          <div class="flex justify-start">
            <form method="" class="flex flex-row items-center">
              <input
                type="text"
                placeholder="Search"
                className="w-full h-10 p-4 border border-gray-700 shadow-sm sm:text-md outline-none rounded-2xl"
              />
            </form>
          </div>
          <div class="flex ml-auto gap-2">
            <div class="flex flex-row gap-2">
              <button class="border-3 transition-all cursor-pointer font-semibold text-blue-800 hover:bg-blue-800 hover:text-white px-4 py-2 rounded-lg">
                <i class="fa-regular fa-folder-open"></i>
                Distribute Asset
              </button>
              <button
                onClick={openModal}
                id="openModalBtn1"
                class="border transition-all cursor-pointer bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
              >
                <i class="fa-solid fa-circle-plus"></i>
                Add New Asset
              </button>
            </div>
          </div>
        </div>

        {/* <!-- Audit trail table --> */}
        <div class="rounded-lg shadow-md">
          <div class="w-full overflow-x-auto h-full rounded-lg">
            <table class="w-full bg-white">
              <thead class="bg-gray-200 ">
                <tr class="bg-gray-200 border-b border-gray-400 text-sm text-left px-4">
                  <th class="py-3 px-4 border-b">
                    <input type="checkbox" onclick="toggleSelectAll(this)" />
                  </th>
                  <th class="py-3 px-4 border-b">Product Name</th>
                  <th class="py-3 px-4 border-b">Serial Number</th>
                  <th class="py-3 px-4 border-b">Description</th>
                  <th class="py-3 px-4 border-b">Condition</th>
                  <th class="py-3 px-4 border-b">Status</th>
                  <th class="py-3 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {asset.map((item) => (
                  <tr class="border-b text-left">
                  <td class="py-2 px-4 whitespace-nowrap">
                    <input type="checkbox" />
                  </td>
                  <td class="py-2 px-4 flex items-center space-x-2">
                    <img
                      alt="Image of Acer Aspire E1-571"
                      class="w-12 h-12"
                      height="50"
                      src="https://contents.spin.ph/image/resize/image/2022/02/07/hp-pavilion14-j-1644233459.webp"
                      width="50"
                    />
                    <span>{item.productname}</span>
                  </td>
                  <td class="py-2 px-4 whitespace-nowrap">{item.serialnumber}</td>
                  <td class="py-2 px-4 whitespace-nowrap"><span>view</span></td>
                  <td class="py-2 px-4 whitespace-nowrap">
                    <span>{item.condition}</span>
                  </td>
                  <td class="py-2 px-4 whitespace-nowrap">{item.status}</td>

                  <td class="text-center space-x-2">
                    <div class="flex flex-row py-2 px-4 gap-2">
                      <button
                        id="openModalBtn2"
                        class="flex flex-row gap-2 cursor-pointer transition-all items-center border border-white bg-amber-400 hover:bg-amber-600 text-white px-3 py-1.5 rounded-full"
                      >
                        <i class="fa-solid fa-pen"></i>
                        Edit
                      </button>
                      <button class="flex flex-row gap-2 cursor-pointer transition-all items-center border border-white shadow-md bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-full">
                        <i class="fa-solid fa-trash"></i>
                        Delete
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
    </div>
  );
}
