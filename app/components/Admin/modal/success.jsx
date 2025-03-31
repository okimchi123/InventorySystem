import { motion, AnimatePresence } from "framer-motion";
import {
  successVariant,
  modalVariants,
} from "../../../utils/animation/animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

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
        className={`fixed flex justify-center items-center gap-[8px] left-[45%] top-[10%] z-100 py-5 px-3 rounded-lg shadow-lg text-white ${
          isSuccess ? "bg-[#11B823]" : "bg-red-500"
        }`}
      >
        <FontAwesomeIcon
          icon={isSuccess ? faCircleCheck : faCircleXmark}
          size="xl"
        />
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
        className="bg-white flex flex-col px-20 py-18 rounded-lg shadow-md relative"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
      >
        <div className="flex items-center gap-2 absolute top-3 left-4">
           <FontAwesomeIcon
          icon="exclamation-triangle"
          color="red"
          size="2xl"
        />
        <h1 className="text-[32px]">Confirm Action</h1>
        </div>
       
        <div className="bg-gray-300 py-[6px] my-[8px] self-center flex items-center gap-[6px] px-[12px] rounded-sm">
          <FontAwesomeIcon icon="trash" color="#e62626" size="lg" />
          <span className="text-black font-semibold text-[18px]"> {user} </span>
        </div>
        <p className="mb-4 text-[18px] self-center text-center">{message}</p>
        <div className="flex justify-end absolute bottom-3 right-3 gap-2 self-end">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer transition-all bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 cursor-pointer transition-all bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const AreYouSureModal = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  title,
}) => {
  if (!isOpen) return null;
  const isAccept = message.includes("Accept");
  const isExport = message.includes("export");
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/75">
      <motion.div
        className="bg-white flex flex-col px-20 py-18 rounded-lg shadow-md relative"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
      >
        <div className="flex items-center gap-2 absolute left-3 top-3">
          <FontAwesomeIcon
            icon="exclamation-triangle"
            color={`${isAccept || isExport ? "green" : "red"}`}
            size="2xl"
          />
          <h1 className="text-[32px]">Confirm {title} Action</h1>
        </div>

        <p className="mb-4 text-[20px] self-center text-center">{message}</p>
        <div className="flex justify-end gap-2 self-end absolute bottom-3 right-3">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer transition-all bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 cursor-pointer transition-all text-white rounded-lg ${
              isAccept || isExport
                ? "bg-green-600  hover:bg-green-700"
                : "bg-red-600  hover:bg-red-700"
            }`}
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export const OkayModal = ({ isVisible, onConfirm, message }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/75">
      <motion.div
        className="bg-white flex flex-col px-6 py-4 rounded-lg shadow-md w-[25%]"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
      >
        <h1 className="text-[28px] mb-4">Success Message</h1>
        <div className="flex justify-center gap-2">
          <FontAwesomeIcon icon="circle-check" size="2x" color="green" />
          <p className="mb-4 text-[22px] self-center text-center">{message}</p>
        </div>

        <div className="flex justify-end gap-2 self-end">
          <button
            onClick={onConfirm}
            className="px-4 py-2 cursor-pointer transition-all bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};
