import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TopBar(props){
    return(
        <div class="fixed w-4/5 bg-white z-10 px-6 py-3 flex justify-between items-center shadow-md">

          <div class="flex flex-row items-center gap-4">
            <button class="text-black focus:outline-none">
              <FontAwesomeIcon icon="bars" /> 
            </button>
            <h2 class="text-xl font-semibold mr-4">Dashboard</h2>
          </div>

          <div class="relative dropdown">
            <button class="flex flex-row items-center gap-3 border border-black shadow-gray-700 shadow-sm bg-amber-400 text-black px-4 w-fit rounded-xl cursor-pointer">
              <FontAwesomeIcon icon="user" size="xl" />
              <div class="flex flex-col items-start">
                <h1 class="font-medium">{props.name}</h1>
                <h1 class="text-sm">{props.role}</h1>
              </div>
              <FontAwesomeIcon icon="angle-down" size="sm" className="pl-3" />
            </button>
            {/* <div class="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20 hidden">
              <a href="#"
                class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >Profile</a>
              <a href="#"
                class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >Settings</a>
              <a  href="#"
                class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >Logout</a>
            </div> */}
          </div>
        </div>
    )
}