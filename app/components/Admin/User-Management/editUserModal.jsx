import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { modalVariants } from "../../../utils/animation/animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EditUserModal({ isOpen, onClose, user, onUpdateUser }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    role: "",
    phone: "",
  });
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        phone: user.phone,
      });
      setIsFormChanged(false);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (!isFormChanged) {
      setIsFormChanged(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ ...user, ...formData });
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900/75">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className="bg-white py-6 px-8 rounded-lg shadow-lg w-[30%]"
        >
          <div className="flex items-center gap-[4px] mb-[12px]">
            <FontAwesomeIcon icon="circle-user" size="2xl" color="#decc28" />
            <h1 className="text-[32px]">Edit User</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-[18px] font-medium">First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full px-3 py-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[18px] font-medium">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-3 py-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[18px] font-medium">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-3 border rounded-lg"
              >
                {formData.role === "Moderator" ? (
                  <>
                    <option value="Moderator">Moderator</option>
                    <option value="User">User</option>
                  </>
                ) : (
                  <>
                    <option value="User">User</option>
                    <option value="Moderator">Moderator</option>
                  </>
                )}
              </select>

            </div>
            <div>
              <label className="block text-[18px] font-medium">Contact Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-3 border rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 cursor-pointer transition-all hover:bg-gray-700 bg-gray-500 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormChanged}
                className={`px-4 py-2 cursor-pointer transition-all rounded-lg text-white ${isFormChanged ? "bg-blue-600 hover:bg-blue-800" : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                Update
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    )
  );
}
