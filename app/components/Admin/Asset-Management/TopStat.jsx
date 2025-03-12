import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AssetGrid = () => {
  const assets = [
    { name: "Laptop", total: 12, available: 43, distributed: 14 },
    { name: "Phone", total: 14, available: 34, distributed: 13 },
    { name: "Charger", total: 14, available: 14, distributed: 124 },
    { name: "Mouse", total: 124, available: 34, distributed: 134 },
    { name: "Charger", total: 50, available: 25, distributed: 25 },
    { name: "Chair", total: 30, available: 10, distributed: 20 },
    { name: "Table", total: 30, available: 10, distributed: 20 },
    { name: "Printer", total: 30, available: 10, distributed: 20 },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

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
    <div className="flex justify-between items-center w-full">
      <div
        onClick={prevPage}
        className={`bg-blue-500 hover:bg-blue-700 transition-all px-4 py-3 flex items-center justify-center rounded-full cursor-pointer ${
          currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FontAwesomeIcon icon="angle-left" color="white" />
      </div>

      <div className="grid w-[90%] px-1 grid-cols-4 gap-4">
        {paginatedAssets.map((item, index) => (
          <div
            key={index}
            className="bg-white py-2 px-4 rounded-lg text-start border border-gray-200 shadow-lg"
          >
            <h1 className="text-[22px] font-lg font-russo text-blue-500">
              {item.name}
            </h1>
            <div className="flex justify-between">
              <div className="w-[32%] flex flex-col items-center">
                <h4 className="text-[20px] font-lg font-russo">{item.total}</h4>
                <p className="text-base font-medium">Total</p>
              </div>
              <div className="w-[32%] flex flex-col items-center">
                <h4 className="text-[20px] font-lg font-russo">
                  {item.available}
                </h4>
                <p className="text-base font-medium">Available</p>
              </div>
              <div className="w-[32%] flex flex-col items-center">
                <h4 className="text-[20px] font-lg font-russo">
                  {item.distributed}
                </h4>
                <p className="text-base font-medium">Distributed</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        onClick={nextPage}
        className={`bg-blue-500 hover:bg-blue-700 transition-all px-4 py-3 flex items-center justify-center rounded-full cursor-pointer ${
          currentPage >= Math.ceil(assets.length / itemsPerPage) - 1
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        <FontAwesomeIcon icon="angle-right" color="white" />
      </div>
    </div>
  );
};

export default AssetGrid;
