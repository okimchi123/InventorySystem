import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { modalVariants } from "../../../utils/animation/animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EditAssetModal({ isOpen, onClose, item, onUpdateAsset }) {
  const [formData, setFormData] = useState({
    producttype: "",
    productname: "",
    condition: "",
    serialnumber: "",
    description: "",
    reason: "",
  });
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        producttype: item.producttype,
        productname: item.productname,
        condition: item.condition,
        serialnumber: item.serialnumber,
        description: item.description,
        reason: item.reason,
      });
      setIsFormChanged(false);
    }
  }, [item]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (!isFormChanged) {
      setIsFormChanged(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAsset({ ...item, ...formData });
  };

  return (
    isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900/75">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="bg-white border border-gray-600 rounded-lg shadow-lg relative w-[60%]" style={{padding: '2rem'}}
        >
          <div className="flex items-center gap-[4px]">
            <FontAwesomeIcon icon="box-archive" size="2xl" color="#decc28" />
            <h1 className="text-[32px]">Edit Item</h1>
          </div>
  
          {/* Form Fields */}
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex laptop:flex-row phone:flex-col gap-4">
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
                  <option value="Chair">Chair</option>
                  <option value="Table">Table</option>
                  <option value="Box">Box</option>
                  <option value="Cable">Cable</option>
                  <option value="Monitor">Monitor</option>
                  <option value="Printer">Printer</option>
                </select>
              </div>
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
            </div>
            <div className="flex laptop:flex-row phone:flex-col gap-4">
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
              <div className="flex flex-col gap-2 w-full">
                <label className="text-[20px] font-medium">Condition</label>
                <select
                  className="border border-gray-700 py-[16px] px-[8px] rounded-lg bg-white"
                  name="condition"
                  onChange={handleChange}
                  value={formData.condition}
                >
                  <option value="Good">Good</option>
                  <option value="Broken">Broken</option>
                  <option value="Scrap">Scrap</option>
                </select>
              </div>
            </div>
            {formData.condition === "Broken" ? 
            <div className="flex flex-col gap-1 w-full">
            <label className="text-[20px] font-medium">Reason for being broken</label>
            <input
              type="text"
              name="reason"
              placeholder="Enter the reason here"
              className="border border-gray-700 py-[16px] px-[8px] rounded-lg"
              onChange={handleChange}
              value={formData.reason}
            />
          </div> 
          : <></>
          }
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
          </div>
  
          {/* Modal Buttons */}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={onClose}
              className="w-24 px-4 py-2 transition-all cursor-pointer hover:bg-blue-600 hover:text-white hover:border-blue-600 text-black border border-gray-700 font-medium rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isFormChanged}
              className={`px-4 py-2 transition-all cursor-pointer text-white w-24 shadow-sm shadow-gray-300 ${isFormChanged ? "bg-[#35BC14] hover:bg-green-900 hover:text-white " : "bg-gray-400 cursor-not-allowed"
                  } font-medium  rounded-lg`}
            >
              Save
            </button>
          </div>
        </motion.div>
      </div>
    )
  );
}
