import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleMinus,
  faCirclePlus,
  faBoxesPacking,
} from "@fortawesome/free-solid-svg-icons";
import { modalVariants } from "../../../utils/animation/animation";
import EmployeeSelectionModal from "./EmployeeSelectionModal";

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

export default function DistributeModal({ isOpen, onClose, selectedAssets }) {
  const [isEmployeeModalOpen, setEmployeeModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleRemoveUser = () => {
    setSelectedUser(null);
  };

  const handleDistribute = async () => {
    if (!selectedUser || selectedAssets.length === 0) return;
    
    setLoading(true);
    
    try {
      const response = await axios.post("http://localhost:5000/api/distribute", {
        assetIds: selectedAssets.map(asset => asset._id),
        userId: selectedUser._id,
      });

      alert(response.data.message);
      onClose();
    } catch (error) {
      console.error("Error distributing assets:", error);
      alert("Failed to distribute assets.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-start z-50 bg-gray-900/75">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        className="bg-white flex flex-col items-start mt-[1%] border border-gray-600 rounded-lg px-15 py-6 shadow-lg relative w-[60%]"
      >
        <div className="flex items-center gap-[4px] mb-3">
          <FontAwesomeIcon icon={faBoxesPacking} size="2xl" />
          <h1 className="text-[32px]">Distribute Assets</h1>
        </div>

        <span className="text-[22px] font-medium mb-3">Employee</span>
        {selectedUser ? (
          <div className="flex items-center p-3 bg-gray-200 rounded-lg mb-5">
            <FontAwesomeIcon
              icon={faCircleMinus}
              size="lg"
              color="red"
              className="cursor-pointer mr-2 hover:text-red-700"
              onClick={handleRemoveUser}
            />
            <span>
              {selectedUser.firstname} {selectedUser.lastname}
            </span>
          </div>
        ) : (
          <div
            className="flex items-center px-4 py-[8px] mb-5 gap-[8px] bg-blue-600 rounded-xl min-w-[20%] hover:bg-blue-800 transition-all cursor-pointer"
            onClick={() => setEmployeeModalOpen(true)}
          >
            <FontAwesomeIcon icon={faCirclePlus} color="white" size="lg" />
            <span className="text-[18px] text-white font-semibold">
              Choose an Employee
            </span>
          </div>
        )}
        <span className="text-[22px] font-medium mb-3">Assets</span>
        <div className="max-h-[450px] overflow-y-auto w-full p-2">
          <div className="grid grid-cols-2 gap-3">
            {selectedAssets.length > 0 ? (
              selectedAssets.map((asset) => (
                <div
                  key={asset._id}
                  className="flex items-center px-2 py-5 shadow-[0_0px_10px_rgb(0,0,0,0.2)] gap-1"
                >
                  <div className="w-[30%]">
                    <img
                      alt="item image"
                      className="w-28 h-28"
                      src={
                        asset.producttype === "Laptop"
                          ? laptop
                          : asset.producttype === "Mouse"
                          ? mouse
                          : asset.producttype === "Phone"
                          ? phone
                          : asset.producttype === "Charger"
                          ? charger
                          : asset.producttype === "Chair"
                          ? chair
                          : asset.producttype === "Box"
                          ? box
                          : asset.producttype === "Table"
                          ? table
                          : asset.producttype === "Monitor"
                          ? monitor
                          : asset.producttype === "Printer"
                          ? printer
                          : asset.producttype === "Cable"
                          ? cable
                          : ""
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                      <span className="text-[18px] font-medium">
                        Product Name:
                      </span>
                      <p className="text-[18px]">{asset.productname}</p>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-[18px] font-medium">
                        Serial Number:
                      </span>
                      <p className="text-[18px]">{asset.serialnumber}</p>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-[18px] font-medium">
                        Description:
                      </span>
                      <p className="text-[18px]">{asset.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No assets selected.</p>
            )}
          </div>
        </div>
        <div className="flex self-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className=" px-4 py-2 transition-all cursor-pointer bg-red-500 text-white hover:bg-red-700  font-medium rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleDistribute}
            disabled={!selectedUser || loading}
            className={` px-4 py-2 transition-all cursor-pointer text-white font-medium rounded-lg
                ${
                    selectedUser
                      ? "bg-blue-500 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }
                `}
          >
            {loading ? "Distributing..." : "Distribute"}
          </button>
        </div>
      </motion.div>

      <EmployeeSelectionModal
        isOpen={isEmployeeModalOpen}
        onClose={() => setEmployeeModalOpen(false)}
        onSelect={setSelectedUser}
      />
    </div>
  );
}
