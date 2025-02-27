import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { dropdownVariants } from "../utils/animation/animation";
import { motion, AnimatePresence } from "framer-motion";

export default function TopBar(props) {
  const location = useLocation();
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

  return (
    <div class="fixed w-4/5 bg-white z-10 px-6 py-3 flex justify-between items-center shadow-md">

      <div class="flex flex-row items-center gap-4">
        <button class="text-black focus:outline-none">
          <FontAwesomeIcon icon="bars" />
        </button>
        <h2 class="text-xl font-semibold mr-4">{pageTitle}</h2>
      </div>

      <div class="relative dropdown" ref={dropdownRef}>
        <button onClick={toggleDropdown} class="flex flex-row items-center gap-3 border border-black shadow-gray-700 shadow-sm bg-amber-400 text-black px-4 w-fit rounded-xl cursor-pointer">
          <FontAwesomeIcon icon="user" size="xl" />
          <div class="flex flex-col items-start">
            <h1 class="font-medium">{props.name}</h1>
            <h1 class="text-sm">{props.role}</h1>
          </div>
          <FontAwesomeIcon icon="angle-down" size="sm" className="pl-3" />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
              className="dropdown-menu absolute right-0 mt-2 w-48 bg-white shadow-lg py-2 z-20 rounded-lg"
            >
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition-all">
                Profile
              </a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition-all">
                Settings
              </a>
              <a
                onClick={props.onLogout}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer transition-all"
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