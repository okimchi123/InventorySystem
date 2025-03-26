import  TotalAssets  from "./Statistics/stats"
import InventoryPieChart from "./Statistics/piechart";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
});

export default function AdminMain(){
  const [assets, setAssets] = useState({
    totalAssets: 0,
    totalAvailable: 0,
    totalDistributed: 0,
    totalBroken: 0,
    totalScrap: 0,
  });

  useEffect(() => {
    const fetchTotalAssets = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/asset/asset-stats");
        setAssets(response.data);
      } catch (error) {
        console.error("Error fetching asset summary:", error);
      }
    };

    fetchTotalAssets();
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });
    socket.on("updateAssetStatistics", (statistics) => {
      setAssets(statistics);
    }); 

    return () => {
      socket.off("updateAssetStatistics");
    };
  }
  , []);

  return (
      <div className="flex flex-col laptop:px-4 phone:px-4" style={{paddingTop: '6rem'}}>
        <div className="flex laptop:flex-row phone:flex-col gap-2 mb-6 w-full">
          <div className="w-full bg-white relative flex flex-col gap-2 p-5 rounded-lg text-start border border-gray-200 shadow-lg hover:shadow-sm transition-all">
            <div className="flex items-center">
              <FontAwesomeIcon icon="chart-simple" size="xl" color="blue" className="absolute select-none bg-blue-100 p-3 rounded-full" />
              <h4 className="text-4xl font-lg font-russo select-none text-gray-700  ml-auto">{assets.totalAssets}</h4>
            </div>
            <p className="desktop:text-xl laptop:text-base font-medium select-none whitespace-nowrap">Total Assets</p>
          </div>
          <div className="w-full bg-white relative flex flex-col gap-2 p-5 rounded-lg text-start border border-gray-200 shadow-lg hover:shadow-sm transition-all">
            <div className="flex items-center">
              <h4 className="text-4xl font-lg font-russo select-none text-gray-700  ml-auto">{assets.totalAvailable}</h4>
              <FontAwesomeIcon icon="check-to-slot" size="xl" color="green" className="absolute select-none bg-green-100 p-3 rounded-full" />
            </div>
            <p className="desktop:text-xl laptop:text-base font-medium select-none">Available Stock</p>
          </div>
          <div className="w-full bg-white relative flex flex-col gap-2 p-5 rounded-lg text-start border border-gray-200 shadow-lg hover:shadow-sm transition-all">
            <div className="flex items-center">
              <h4 className="text-4xl font-lg font-russo select-none text-gray-700  ml-auto">{assets.totalDistributed}</h4>
              <FontAwesomeIcon icon="handshake" size="xl" color="#E49F00" className="absolute select-none bg-yellow-100 p-3 rounded-full" />
            </div>
            <p className="text-base font-medium select-none">Distributed Stock</p>
          </div>
          <div className="w-full bg-white relative flex flex-col gap-2 p-5 rounded-lg text-start border border-gray-200 shadow-lg hover:shadow-sm transition-all">
            <div className="flex items-center">
              <h4 className="text-4xl font-lg font-russo select-none text-gray-700  ml-auto">{assets.totalBroken}</h4>
              <FontAwesomeIcon icon="screwdriver-wrench" size="xl" color="gray" className="absolute select-none bg-gray-200 p-3 rounded-full" />
            </div>
            <p className="text-base font-medium select-none">Broken Assets</p>
          </div>
          <div className="w-full bg-white relative flex flex-col gap-2 p-5 rounded-lg text-start border border-gray-200 shadow-lg hover:shadow-sm transition-all">
            <div className="flex items-center">
              <h4 className="text-4xl font-lg font-russo select-none text-gray-700  ml-auto">{assets.totalScrap}</h4>
              <FontAwesomeIcon icon="trash-can" size="xl" color="red" className="absolute select-none bg-red-100 p-3 rounded-full" />
            </div>
            <p className="text-base font-medium select-none">Scrap Assets</p>
          </div>
        </div>
        <div className="flex laptop:flex-row phone:flex-col">
          <div className="w-[68%] p-2">
            <TotalAssets />
          </div>
          <div className="w-[45%] p-2 flex items-center justify-center">
          <InventoryPieChart />
          </div>
        </div>
      </div>
  )
}