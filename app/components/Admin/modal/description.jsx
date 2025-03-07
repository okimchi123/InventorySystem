import { motion } from "framer-motion";
import { modalVariants } from "../../../utils/animation/animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Description({item ,isOpen, onClose}){
    return(
        isOpen && (
            <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900/75">
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
                className="bg-white py-6 px-8 rounded-lg shadow-lg w-[30%]"
              >
                <div className="flex flex-col gap-[4px] mb-[12px]">
                  <h1 className="text-[32px]">Decription</h1>
                  <p className="text-[20px]">{item.description}</p>
                </div>
                <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 cursor-pointer transition-all hover:bg-gray-700 bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
              </motion.div>
            </div>
          )
    )
}