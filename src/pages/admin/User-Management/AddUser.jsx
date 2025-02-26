import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserAudit from "../../../components/Admin/User-Management/User-Audit";
import { modalVariants } from "../../../utils/animation/animation";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import SuccessModal from "../../../components/Admin/modal/success";

export default function AddUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth",
        formData
      );
      setMessage("User added successfully!");
      setShowSuccessModal(true);
      closeModal();
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);
    } catch (error) {
        setMessage(error.response?.data?.message || "Failed to add user.");
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 2000);
    }
  };

  return (
    <div class="pt-22 py-6 px-10 laptop:px-12 phone:px-4">
      
      <SuccessModal message={message} isVisible={showSuccessModal} />
      <div className="fixed left-[30%] top-[10%] z-40 w-[300px] h-[70px] px-6 py-3 rounded-lg shadow-lg text-white bg-[#11B823]">
          <FontAwesomeIcon icon="circle-check" />
          <span className="text-[26px]">Success</span>
           </div>
      {/* <!-- contents --> */}
      <div class="flex flex-col gap-1 items-end justify-center w-full mx-auto">
        <div class="flex flex-col gap-3 mx-auto py-4 w-full">
          {/* <!-- Filter --> */}
          <div class="flex laptop:flex-row phone:flex-col gap-2 w-full">
            <div class="flex justify-start">
              <form method="" class="flex flex-row items-center">
                <select
                  name="filter"
                  id="filterSelect"
                  class="px-4 py-2 h-10 w-48 text-sm border border-gray-700 rounded-l-lg outline-none"
                ></select>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Search"
                  value
                  class="w-full h-10 p-2 border border-gray-700 shadow-sm sm:text-sm outline-none rounded-r-lg"
                />
              </form>
            </div>
            <div class="flex ml-auto">
              <div class="flex justify-end gap-2">
                <button
                  onClick={openModal}
                  id="openModalBtn"
                  class="cursor-pointer border bg-blue-800 hover:bg-blue-900 transition-all text-white px-4 py-2 rounded-lg font-monserrat"
                >
                  <i class="fa-solid fa-circle-plus"></i>
                  Add New User
                </button>
              </div>
            </div>
          </div>

          {/* <!-- Audit trail table --> */}
          <UserAudit />

          {/* <!-- Modal for view employee --> */}
          {isModalOpen && (
            <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-900/75">
              <motion.div
                ref={modalRef}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
                className="bg-white border border-gray-600 rounded-lg px-6 py-6 shadow-lg relative h-fit w-[40%]"
              >
                <h1 className="text-[32px]">Add New User</h1>
                {/* Form Fields */}
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex laptop:flex-row phone:flex-col gap-4">
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-[18px] font-medium">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstname"
                        placeholder="Niel"
                        className="border border-gray-700 p-2 rounded-lg text-black"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-[18px] font-medium">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        placeholder="Digo"
                        className="border border-gray-700 p-2 rounded-lg"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex laptop:flex-row phone:flex-col gap-4">
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-[18px] font-medium">Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="sample@gmail.com"
                        className="border border-gray-700 p-2 rounded-lg"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-[18px] font-medium">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        placeholder="09345678653"
                        className="border border-gray-700 p-2 rounded-lg"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex laptop:flex-row phone:flex-col gap-4 w-[25%]">
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-[18px] font-medium">Role</label>
                      <select
                        className="border border-gray-700 p-2 rounded-lg bg-white"
                        name="role"
                        onChange={handleChange}
                      >
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Modal Buttons */}
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={closeModal}
                    className="w-24 px-4 py-2 transition-all cursor-pointer hover:bg-blue-600 hover:text-white hover:border-blue-600 text-black border border-gray-700 font-medium rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 transition-all cursor-pointer w-24 shadow-sm shadow-gray-300 bg-amber-400 hover:text-white hover:bg-amber-500 font-medium text-black  rounded-lg"
                  >
                    Create
                  </button>
                </div>
              </motion.div>
              {/* Success/Error Modal */}
                
            </div>
          )}
        </div>

        {/* <!-- Pagination --> */}
        <div class="flex space-x-2">
          <button class="rounded-lg px-4 py-2 hover:bg-blue-50 hover:font-semibold">
            <i class="fa-solid fa-angle-left"></i>
          </button>
          <button class="rounded-lg px-4 py-2 hover:bg-blue-50 hover:font-semibold">
            1
          </button>
          <button class="border border-gray-300 rounded-lg px-4 py-2 hover:bg-blue-800 bg-blue-600 text-white font-medium">
            2
          </button>
          <button class="rounded-lg px-4 py-2 hover:bg-blue-50 hover:font-semibold">
            3
          </button>
          <button class="rounded-lg px-4 py-2 hover:bg-blue-50 hover:font-semibold">
            4
          </button>
          <button class="rounded-lg px-4 py-2 hover:bg-blue-50 hover:font-semibold">
            5
          </button>
          <button class="rounded-lg px-4 py-2 hover:bg-blue-50 hover:font-semibold">
            <i class="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
