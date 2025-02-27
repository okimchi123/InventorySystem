import { motion, AnimatePresence } from "framer-motion";
import { successVariant } from "../../../utils/animation/animation";
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
        className={`fixed flex justify-center items-center gap-[8px] left-[40%] top-[10%] z-100 w-[300px] h-[70px] rounded-lg shadow-lg text-white ${isSuccess ? "bg-[#11B823]" : "bg-red-500"
          }`}
      >
        <FontAwesomeIcon icon={isSuccess ? faCircleCheck : faCircleXmark} size="xl" />
        <span className="text-[20px]">{message}</span>
      </motion.div>
    </AnimatePresence>
  );
};

export const InputError = ({ message, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed flex justify-center items-center gap-[8px] left-[40%] top-[10%] z-40 w-[300px] h-[70px] rounded-lg shadow-lg text-white bg-red-500"
        >
          <FontAwesomeIcon icon={faTriangleExclamation} size="xl" />
          <span className="text-[20px]">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};