import { useState } from "react";
import axios from "axios";
import UserAudit from "../../../components/Admin/User-Management/User-Audit";
import AddUserModal from "../../../components/Admin/User-Management/addUserModal";
import { SuccessModal } from "../../../components/Admin/modal/success";

export default function AddUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    role: "User",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.firstname || !formData.lastname || !formData.phone || !formData.role) {
      setMessage("Please input all the fields");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        setMessage("Authentication error. Please log in again.");
        setShowSuccessModal(true);
        return;
      }
  
      await axios.post(
        "http://localhost:5000/api/auth",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setMessage("User added successfully!");
  
      // Reset the form
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        role: "User",
      });
  
      closeModal(); // Close modal first
      setShowSuccessModal(true); // Show success message
      setTimeout(() => setShowSuccessModal(false), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add user.");
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    }
  };

  return (
    <div className="pt-22 py-6 px-10 laptop:px-12 phone:px-4">
      <div className="flex flex-col gap-1 items-end justify-center w-full mx-auto">
        <div className="flex flex-col gap-3 mx-auto py-4 w-full">
          {/* Filter Section */}
          <div className="flex laptop:flex-row phone:flex-col gap-1 w-full">
            <div className="flex justify-start">
              <form className="flex flex-row items-center">
                <select className="px-4 py-2 h-10 w-48 text-sm border border-gray-700 rounded-l-lg outline-none"></select>
                <input type="text" placeholder="Search" className="w-full h-10 p-2 border border-gray-700 shadow-sm sm:text-sm outline-none rounded-r-lg" />
              </form>
            </div>
            <div className="flex ml-auto">
              <button onClick={openModal} className="cursor-pointer border bg-blue-800 hover:bg-blue-900 transition-all text-white px-4 py-2 rounded-lg">
                Add New User
              </button>
            </div>
          </div>

          <UserAudit />
        </div>
      </div>

      {/* Success Modal shown AFTER AddUserModal closes */}
      <SuccessModal message={message} isVisible={showSuccessModal} />

      {/* Add User Modal */}
      <AddUserModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={formData}
      />
    </div>
  );
}



