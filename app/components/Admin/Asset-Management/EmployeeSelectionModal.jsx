import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { modalVariants } from "../../../utils/animation/animation";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EmployeeSelectionModal({ isOpen, onClose, onSelect, role }) {
  const [moderators, setModerators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchModerators = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get(`https://inventorysystem-lfak.onrender.com/api/auth?role=${role}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setModerators(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch moderators:", error);
      setError("Failed to load employees. Try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchModerators(); // Fetch moderators when modal opens
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900/75">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        className="bg-white flex flex-col items-start border border-gray-600 rounded-lg px-8 py-6 shadow-lg relative w-[40%]"
      >
        <h2 className="text-[24px] mb-4">Choose an Employee</h2>

        {loading ? (
          <p className="text-gray-600">Loading employees...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul className="w-full">
            {moderators.length > 0 ? (
              moderators.map((user) => (
                <li
                  key={user._id}
                  className="flex justify-between items-center p-3 border-b"
                >
                  <span>{user.firstname} {user.lastname}</span>
                  <button
                    onClick={() => {
                      onSelect(user);
                      onClose();
                    }}
                    className="bg-blue-600 text-white transition-all cursor-pointer px-3 py-1 rounded-lg hover:bg-blue-800"
                  >
                    <FontAwesomeIcon icon="circle-plus" className="mr-[6px]" />
                    Choose
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No moderators found.</p>
            )}
          </ul>
        )}

        <button
          onClick={onClose}
          className="mt-4 self-end transition-all cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
