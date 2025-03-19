import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const AssetGrid = () => {
  const [assets, setAssets] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchAssetSummary = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/asset/summary");
        setAssets(response.data);
      } catch (error) {
        console.error("Error fetching asset summary:", error);
      }
    };

    fetchAssetSummary();

    socket.on("updateAssetSummary", (updatedAssets) => {
      setAssets(updatedAssets);
    });
    return () => {
      socket.off("updateAssetSummary");
    };
  }, []);

  const nextPage = () => {
    if (currentPage < Math.ceil(assets.length / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedAssets = assets.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="flex justify-between mb-4 items-center w-full">
      <div
        onClick={prevPage}
        className={`bg-blue-500 select-none hover:bg-blue-700 transition-all px-4 py-3 flex items-center justify-center rounded-full cursor-pointer ${
          currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {currentPage > 0 && <FontAwesomeIcon icon="angle-left" color="white" />}
      </div>

      <div className="grid w-[90%] px-1 grid-cols-4 gap-4">
        {paginatedAssets.map((item, index) => (
          <div
            key={index}
            className="bg-white py-2 px-4 rounded-lg text-start border border-gray-200 shadow-lg"
          >
            <h1 className="text-[22px] select-none font-lg font-russo text-blue-500">
              {item._id}
            </h1>
            <div className="flex justify-between">
              <div className="w-[32%] flex flex-col items-center">
                <h4 className={`text-[20px] select-none font-lg font-russo
                  ${item.total > 0 ? "text-blue-500"
                    : "text-gray-600"
                  }
                  `}>{item.total}</h4>
                <p className="text-base select-none font-medium">Total</p>
              </div>
              <div className="w-[32%] flex flex-col items-center">
                <h4 className={`text-[20px] select-none font-lg font-russo 
                  ${item.available > 0 ?  "text-green-500"
                    : "text-gray-600"
                  }
                  `}>
                  {item.available}
                </h4>
                <p className="text-base select-none font-medium">Available</p>
              </div>
              <div className="w-[32%] flex flex-col items-center">
                <h4 className={`text-[20px] select-none font-lg font-russo
                  ${ item.distributed > 0 ? "text-orange-600"
                    : "text-gray-600"
                    
                   } 
                   
                   `}>
                  {item.distributed}
                </h4>
                <p className="text-base select-none font-medium">Distributed</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        onClick={nextPage}
        className={`bg-blue-500 select-none hover:bg-blue-700 transition-all px-4 py-3 flex items-center justify-center rounded-full cursor-pointer ${
          currentPage >= Math.ceil(assets.length / itemsPerPage) - 1
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        {currentPage < Math.ceil(assets.length / itemsPerPage) - 1 && (
          <FontAwesomeIcon icon="angle-right" color="white" />
        )}
      </div>
    </div>
  );
};

export default AssetGrid;
