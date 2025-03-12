import { useState } from "react"
import axios from "axios"
import UserTable from "../../../components/Admin/User-Management/userTable"
import UserAudit from "../../../components/Admin/User-Management/User-Audit"
import AddUserModal from "../../../components/Admin/User-Management/addUserModal"
import { SuccessModal } from "../../../components/Admin/modal/success"

export default function UserManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [loading, setLoading] = useState(false);
  
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
    setLoading(true);
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
        <div className="flex flex-col gap-[32px] mx-auto py-4 w-full">
          
          <UserTable openModal = {openModal} />
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
        loading = {loading}
      />
    </div>
  );
}



