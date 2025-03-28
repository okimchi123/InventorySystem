import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { dropdownVariants } from "../../utils/animation/animation"
import { motion, AnimatePresence } from "framer-motion";

import logo from "../../assets/images/logo/hf.png"

export default function TopBar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathSegments = location.pathname.split("/");
  const pageTitle = pathSegments[pathSegments.length - 1].replace("-", " ");

  const [isOpen, setIsOpen] = useState(false); // State to track dropdown visibility
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="sticky top-0 w-full bg-white z-10 px-6 py-3 flex justify-between items-center shadow-md">
      <div className="flex flex-row items-center gap-4">
        {props.role !== "User" ? 
          <FontAwesomeIcon icon="bars" /> 
          : <> <img src={logo} className="w-10 h-10" alt="" /> </>
        }
        <h2 className="text-xl font-semibold mr-4 select-none">{pageTitle}</h2>
      </div>

      <div className="relative dropdown" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="flex flex-row py-1 items-center gap-3 shadow-gray-700 bg-blue-950 hover:bg-blue-900 transition-all text-black px-4 w-fit rounded-xl cursor-pointer">
          <FontAwesomeIcon icon="user" size="xl" color="white" />
          <div className="flex flex-col items-start">
            <h1 className="font-medium select-none text-gray-100">{props.name}</h1>
            <h1 className="text-sm select-none text-gray-100">{props.role}</h1>
          </div>
          <FontAwesomeIcon icon="angle-down" size="md" color="white" className={`transition-transform ${isOpen ? "transform-[rotate(180deg)]" : "transform-none" }`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
              className="dropdown-menu absolute right-0 mt-2 w-48 bg-blue-950 shadow-lg py-2 z-20 rounded-lg"
            >
              <a href="#" className="block px-4 py-2 text-white hover:bg-blue-900 transition-all">
                Profile
              </a>
              <a
                onClick={() => handleLogout()}
                className="block px-4 py-2 text-white hover:bg-blue-900 cursor-pointer transition-all"
              >
                Logout
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}