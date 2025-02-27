import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { modalVariants } from "../../../utils/animation/animation";

export default function AddUserModal({
  isModalOpen,
  closeModal,
  handleChange,
  handleSubmit,
  formData,
}) {

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900/75">
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        className="bg-white border border-gray-600 rounded-lg px-15 py-6 shadow-lg relative h-[70%] w-[60%]"
      >
        <div className="flex items-center gap-[4px]">
          <FontAwesomeIcon icon="circle-user" size="2xl" />
          <h1 className="text-[32px]">Add New User</h1>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex laptop:flex-row phone:flex-col gap-4">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-[20px] font-medium">First Name</label>
              <input
                type="text"
                name="firstname"
                placeholder="Input your first name here"
                className="border border-gray-700 py-[16px] px-[8px] rounded-lg text-black"
                onChange={handleChange}
                value={formData.firstname}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-[20px] font-medium">Last Name</label>
              <input
                type="text"
                name="lastname"
                placeholder="Input your last name here"
                className="border border-gray-700 py-[16px] px-[8px] rounded-lg"
                onChange={handleChange}
                value={formData.lastname}
              />
            </div>
          </div>
          <div className="flex laptop:flex-row phone:flex-col gap-4">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-[20px] font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="sample@gmail.com"
                className="border border-gray-700 py-[16px] px-[8px] rounded-lg"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-[20px] font-medium">Contact Number</label>
              <input
                type="text"
                name="phone"
                placeholder="09345678653"
                className="border border-gray-700 py-[16px] px-[8px] rounded-lg"
                onChange={handleChange}
                value={formData.phone}
              />
            </div>
          </div>
          <div className="flex laptop:flex-row phone:flex-col gap-4 w-[25%]">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-[20px] font-medium">Role</label>
              <select
                className="border border-gray-700 py-[16px] px-[8px] rounded-lg bg-white"
                name="role"
                onChange={handleChange}
                value={formData.role}
              >
                <option value="User">User</option>
                <option value="Moderator">Moderator</option>
              </select>
            </div>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="flex justify-end space-x-2 mt-4 absolute bottom-[24px] right-[5%]">
          <button
            onClick={closeModal}
            className="w-24 px-4 py-2 transition-all cursor-pointer hover:bg-blue-600 hover:text-white hover:border-blue-600 text-black border border-gray-700 font-medium rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 transition-all cursor-pointer w-24 shadow-sm shadow-gray-300 bg-[#35BC14] hover:text-white hover:bg-green-900 font-medium text-white  rounded-lg"
          >
            Create
          </button>
        </div>
      </motion.div>
    </div>
  );
}
