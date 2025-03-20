import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { dropdownVariants } from "../../utils/animation/animation"
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
    <div className="fixed w-4/5 bg-white z-10 px-6 py-3 flex justify-between items-center shadow-md">

      <div className="flex flex-row items-center gap-4">
        <button className="text-black focus:outline-none">
          <FontAwesomeIcon icon="bars" />
        </button>
        <h2 className="text-xl font-semibold mr-4">{pageTitle}</h2>
      </div>

      <div className="relative dropdown" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="flex flex-row items-center gap-3 border border-black shadow-gray-700 shadow-sm bg-amber-400 text-black px-4 w-fit rounded-xl cursor-pointer">
          <FontAwesomeIcon icon="user" size="xl" />
          <div className="flex flex-col items-start">
            <h1 className="font-medium">{props.name}</h1>
            <h1 className="text-sm">{props.role}</h1>
          </div>
          <FontAwesomeIcon icon="angle-down" size="md" className={`transition-transform ${isOpen ? "transform-[rotate(180deg)]" : "transform-none" }`} />
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