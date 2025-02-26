import { motion } from "framer-motion";
import { successVariant } from "../../../utils/animation/animation";

const SuccessModal = ({ message, isVisible }) => {
    if (!isVisible) return null; // Don't render if not visible
  
    return (
      <motion.div
        variants={successVariant}
        className={`fixed top-5 right-5 px-6 py-3 rounded-lg shadow-lg text-white ${
          message.includes("successfully") ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {message}
      </motion.div>
    );
  };
  
  export default SuccessModal;