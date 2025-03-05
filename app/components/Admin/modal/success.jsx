import { motion, AnimatePresence } from "framer-motion";
import { successVariant, modalVariants } from "../../../utils/animation/animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export const SuccessModal = ({ message, isVisible }) => {
  if (!isVisible) return null;

  const isSuccess = message.includes("successfully");

  return (
    <AnimatePresence>
      <motion.div
        variants={successVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`fixed flex justify-center items-center gap-[8px] left-[40%] top-[10%] z-100 py-5 px-3 rounded-lg shadow-lg text-white ${isSuccess ? "bg-[#11B823]" : "bg-red-500"
          }`}
      >
        <FontAwesomeIcon icon={isSuccess ? faCircleCheck : faCircleXmark} size="xl" />
        <span className="text-[20px] max-w-[350px]">{message}</span>
      </motion.div>
    </AnimatePresence>
  );
};

export const ConfirmModal = ({ isOpen, onClose, onConfirm, message, user }) => {
  if (!isOpen) return null;
  return (

    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/75">
      <motion.div
        className="bg-white flex flex-col px-6 py-4 rounded-lg shadow-md w-[25%]"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
      >
        <h1 className="text-[32px]">Confirm Action</h1>
        <div className="bg-gray-300 py-[6px] my-[8px] self-center flex items-center gap-[6px] px-[12px] rounded-sm">
          <FontAwesomeIcon icon="trash" color="#e62626" size="lg" />
          <span className="text-black font-semibold text-[18px]"> {user.email} </span>
        </div>
        <p className="mb-4 text-[16px] self-center text-center">{message}</p>
        <div className="flex justify-end gap-2 self-end">
          <button onClick={onClose} className="px-4 py-2 cursor-pointer transition-all bg-gray-300 rounded-lg hover:bg-gray-400">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 cursor-pointer transition-all bg-red-600 text-white rounded-lg hover:bg-red-700">Confirm</button>
        </div>
      </motion.div>
    </div>

  );
};