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

export default function Description({ item, isOpen, onClose }) {
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
            <h1 className="text-[30px] absolute left-[24px] top-[12px]">{item.productname}</h1>
            <div className="flex gap-5">
              <img
                alt="item image"
                
                class="w-40 h-40"
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
              <div className="item-info flex flex-col gap-2">
                <div className="flex gap-[8px]">
                  <span className="text-[20px] font-semibold">Product Type:</span><p className="text-[20px] text-gray-700">{item.producttype}</p>
                </div>
                <div className="flex gap-[8px]">
                  <span className="text-[20px] font-semibold">Serial Number:</span><p className="text-[20px] text-gray-700">{item.serialnumber}</p>
                </div>
                <div className="flex gap-[8px]">
                  <span className="text-[20px] font-semibold">Condition:</span><p className={`text-[18px] px-3 py-1
                     ${
                        item.condition === "Good"
                          ? "text-green-900 bg-green-100"
                          : item.condition === "Broken"
                          ? "text-red-900 bg-red-100"
                          : "text-gray-900 bg-gray-200"
                      }
                    `}>{item.condition}</p>
                </div>
                {item.condition === "Broken" ?
                  <div className="flex gap-[8px]">
                  <span className="text-[20px] font-semibold ">Reason:</span><p className="text-[20px] text-gray-700">{item.reason}</p>
                </div> : <></>
                }
                <div className="flex gap-[8px]">
                  <span className="text-[20px] font-semibold">Description:</span><p className="text-[20px] text-gray-700">{item.description}</p>
                </div>
                {item.status === "Distributed" ?
                <>
                <div className="flex gap-[8px]">
                  <span className="text-[20px] font-semibold">Distributed By:</span><p className="text-[20px] text-gray-700">{item.distributedBy}</p>
                </div>
                  <div className="flex gap-[8px]">
                  <span className="text-[20px] font-semibold">Distributed To:</span><p className="text-[20px] text-gray-700">{item.distributedToName}</p>
                </div>
                <div className="flex gap-[8px]">
                  <span className="text-[20px] font-semibold">Distribution Date:</span><p className="text-[20px] text-gray-700">{moment(item.distributionDate).format("MMMM D, YYYY h:mm A")}</p>
                </div>
                </>
                : <></>
                }

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
