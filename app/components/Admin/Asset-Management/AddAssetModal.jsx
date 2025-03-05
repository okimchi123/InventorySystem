import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { modalVariants } from "../../../utils/animation/animation";

export default function AddAssetModal({
  isModalOpen,
  closeModal,
  handleChange,
  handleSubmit,
  formData,
}) {
    if (!isModalOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900/75">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        className="bg-white border border-gray-600 rounded-lg px-15 py-6 shadow-lg relative h-[70%] w-[60%]"
      >
        <div className="flex items-center gap-[4px]">
          <FontAwesomeIcon icon="box-archive" size="2xl" color="green" />
          <h1 className="text-[32px]">Add New Item</h1>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4 mt-4">
            
          <div className="flex laptop:flex-row phone:flex-col gap-4">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-[20px] font-medium">Product Name</label>
              <input
                type="text"
                name="productname"
                placeholder="Input the product name here"
                className="border border-gray-700 py-[16px] px-[8px] rounded-lg text-black"
                onChange={handleChange}
                value={formData.productname}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-[20px] font-medium">Serial Number</label>
              <input
                type="text"
                name="serialnumber"
                placeholder="SN"
                className="border border-gray-700 py-[16px] px-[8px] rounded-lg"
                onChange={handleChange}
                value={formData.serialnumber}
              />
            </div>
          </div>
          <div className="flex laptop:flex-row phone:flex-col gap-4">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-[20px] font-medium">Available Stocks</label>
              <input
                type="text"
                name="availablestock"
                placeholder="Available Stocks"
                className="border border-gray-700 py-[16px] px-[8px] rounded-lg text-black"
                onChange={handleChange}
                value={formData.availablestock}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-[20px] font-medium">Deployed Stocks</label>
              <input
                type="text"
                name="deployedstock"
                placeholder="Deployed Stocks"
                className="border border-gray-700 py-[16px] px-[8px] rounded-lg"
                onChange={handleChange}
                value={formData.deployedstock}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
              <label className="text-[20px] font-medium">Description</label>
              <input
                type="text"
                name="description"
                placeholder="Enter the description here"
                className="border border-gray-700 py-[16px] px-[8px] rounded-lg"
                onChange={handleChange}
                value={formData.description}
              />
            </div>
          <div className="flex laptop:flex-row phone:flex-col gap-4 w-[25%]">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-[20px] font-medium">Product Type</label>
              <select
                className="border border-gray-700 py-[16px] px-[8px] rounded-lg bg-white"
                name="producttype"
                onChange={handleChange}
                value={formData.producttype}
              >
                <option value="">Type</option>
                <option value="Laptop">Laptop</option>
                <option value="Phone">Phone</option>
                <option value="Charger">Charger</option>
                <option value="Mouse">Mouse</option>
              </select>
            </div>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="flex justify-end space-x-2 mt-4 absolute bottom-[24px] right-[5%]">
          <button
            onClick={closeModal}
            className="w-24 px-4 py-2 transition-all cursor-pointer hover:bg-blue-600 hover:text-white hover:border-blue-600 text-black border border-gray-700 font-medium rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 transition-all cursor-pointer w-24 shadow-sm shadow-gray-300 bg-[#35BC14] hover:text-white hover:bg-green-900 font-medium text-white  rounded-lg"
          >
            Create
          </button>
        </div>
      </motion.div>
    </div>
  );
}
