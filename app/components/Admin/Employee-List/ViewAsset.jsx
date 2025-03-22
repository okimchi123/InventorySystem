import { motion } from "framer-motion";
import { modalVariants } from "../../../utils/animation/animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

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

export default function ViewAsset({ user, isOpen, onClose }) {
  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900/75">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="bg-white py-20 px-18 rounded-lg shadow-lg relative"
        >
          <div className="flex flex-col gap-[22px] mb-[12px]">
            <h1 className="text-[30px] absolute left-[24px] top-[12px]">
              {user.firstname} {user.lastname} Asset
            </h1>
            <div className="max-h-[450px] overflow-y-auto w-full p-2">
            <div className="grid grid-cols-2 gap-3">
              {user.handlingAssets.map((asset) => (
                <div
                key={asset._id}
                className="flex items-center px-2 py-5 shadow-[0_0px_10px_rgb(0,0,0,0.2)] gap-4"
              >
                <div className="w-28 flex-shrink-0">
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
                <div className="flex flex-col flex-1 gap-2">
                  <div className="flex gap-1">
                    <span className="text-[18px] font-medium">Product:</span>
                    <p className="text-[18px] break-words text-gray-700">{asset.productname}</p>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-[18px] font-medium">Product type:</span>
                    <p className="text-[18px] break-words text-gray-700">{asset.producttype}</p>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-[18px] font-medium">Serial Number:</span>
                    <p className="text-[18px] break-words text-gray-700">{asset.serialnumber}</p>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-[18px] font-medium">Description:</span>
                    <p className="text-[18px] break-words text-gray-700">{asset.description}</p>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-[18px] font-medium">Distributed By:</span>
                    <p className="text-[18px] break-words text-gray-700">{asset.distributedBy}</p>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-[18px] font-medium">Distribution Date:</span>
                    <p className="text-[18px] break-words text-gray-700">
                      {moment(asset.distributionDate).format("MMMM D, YYYY h:mm A")}
                    </p>
                  </div>
                </div>
              </div>              
              ))}
            </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 absolute right-[24px] bottom-[12px] cursor-pointer transition-all hover:bg-gray-700 bg-gray-500 text-white rounded-lg"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    )
  );
}
