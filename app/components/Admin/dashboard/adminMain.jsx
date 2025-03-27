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
    <div className="pt-22 py-6 flex flex-col gap-1 laptop:px-12 px-10 phone:px-4">
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white relative flex flex-col gap-2 p-5 rounded-lg text-start border border-gray-200 shadow-lg hover:shadow-sm transition-all">
          <h4 className="text-4xl font-lg font-russo select-none text-gray-700 ">{assets.totalAssets}</h4>
          <p className="text-lg font-medium select-none">Total Assets</p>
          <FontAwesomeIcon icon="chart-simple" size="xl" color="blue" className="absolute right-5 top-5 bg-blue-100 p-2 rounded-full select-none" />
        </div>
        <div className="bg-white relative flex flex-col gap-2 p-5 rounded-lg text-start border border-gray-200 shadow-lg hover:shadow-sm transition-all">
          <h4 className="text-4xl font-lg font-russo select-none text-gray-700 ">{assets.totalAvailable}</h4>
          <p className="text-lg font-medium select-none">Available Stock</p>
          <FontAwesomeIcon icon="check-to-slot" size="xl" color="green" className="absolute right-5 top-5 bg-green-100 p-2 rounded-full select-none" />
        </div>
        <div className="bg-white relative flex flex-col gap-2 p-5 rounded-lg text-start border border-gray-200 shadow-lg hover:shadow-sm transition-all">
          <h4 className="text-4xl font-lg font-russo select-none text-gray-700 ">{assets.totalDistributed}</h4>
          <p className="text-lg font-medium select-none">Distributed Stock</p>
          <FontAwesomeIcon icon="handshake" size="xl" color="#E49F00" className="absolute right-5 top-5 bg-yellow-100 p-2 rounded-full select-none" />
        </div>
        <div className="bg-white relative flex flex-col gap-2 p-5 rounded-lg text-start border border-gray-200 shadow-lg hover:shadow-sm transition-all">
          <h4 className="text-4xl font-lg font-russo select-none text-gray-700 ">{assets.totalBroken}</h4>
          <p className="text-lg font-medium select-none">Broken Assets</p>
          <FontAwesomeIcon icon="screwdriver-wrench" size="xl" color="gray" className="absolute right-5 top-5 bg-gray-100 p-2 rounded-full select-none" />
        </div>
        <div className="bg-white relative flex flex-col gap-2 p-5 rounded-lg text-start border border-gray-200 shadow-lg hover:shadow-sm transition-all">
          <h4 className="text-4xl font-lg font-russo select-none text-gray-700 ">{assets.totalScrap}</h4>
          <p className="text-lg font-medium select-none">Scrap Assets</p>
          <FontAwesomeIcon icon="trash-can" size="xl" color="red" className="absolute right-5 top-5 bg-red-100 p-2 rounded-full select-none" />
        </div>
      </div>
      <div className="flex gap-4 justify-between -mx-2">
        <div className="w-[55%] p-2">
          <TotalAssets />
        </div>
        <div className="w-[45%] p-2 flex items-center justify-center">
        <InventoryPieChart />
        </div>
      </div>
    </div>
  )
}