import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { modalVariants } from "../../../utils/animation/animation";

export default function AddAssetModal({
  isModalOpen,
  closeModal,
  handleChange,
  handleSubmit,
  formData,
  loading,
  handleImport,
  handleFile
}) {
  const [view, setView] = useState("manual");
  const [importStatus, setImportStatus] = useState(false);
  const [importMessage, setImportMessage] = useState("");

  if (!isModalOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900/75">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        className="bg-white border border-gray-600 rounded-lg px-15 py-6 shadow-lg relative w-[60%]"
      >
        <div className="flex items-center gap-[4px]">
          <FontAwesomeIcon icon="box-archive" size="2xl" color="green" />
          <h1 className="text-[32px]">Add New Item</h1>
        </div>
        <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 transition-all rounded-lg w-32 ${
            view === "manual" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("manual")}
        >
          Manual
        </button>
        <button
          className={`px-4 py-2 transition-all rounded-lg w-32 ${
            view === "import" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("import")}
        >
          Import File
        </button>
      </div>
        <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        key={view}
      >
        {view === "manual" ? (
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
                  <option value="">Type</option>
                  <option value="Good">Good</option>
                  <option value="Broken">Broken</option>
                  <option value="Scrap">Scrap</option>
                </select>
              </div>
            </div>
            {formData.condition === "Broken" && (
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
            )}
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
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 mt-4 border-dashed border-2 border-gray-500 py-10">
            <p className="text-xl font-medium">Upload Excel File</p>
            <input type="file" accept=".xlsx, .xls" className="cursor-pointer border text-center py-2 pl-3 text-white bg-black/50 rounded-md" onChange={handleFile} />
          </div>
        )}
      </motion.div>

        {/* Modal Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={closeModal}
            className="w-24 px-4 py-2 transition-all cursor-pointer hover:bg-blue-600 hover:text-white hover:border-blue-600 text-black border border-gray-700 font-medium rounded-lg"
          >
            Cancel
          </button>
          <button
            disabled={loading}

            onClick= {view === "manual" ? handleSubmit : view === "import" ? handleImport : ""}
            className="px-4 py-2 transition-all cursor-pointer w-24 shadow-sm shadow-gray-300 bg-[#35BC14] hover:text-white hover:bg-green-900 font-medium text-white  rounded-lg"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
