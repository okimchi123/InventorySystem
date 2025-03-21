import  TotalAssets  from "./Statistics/stats"
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
      <h1 className="text-2xl font-bold">Overview</h1>
      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="bg-white relative flex flex-col gap-2 p-5 rounded-lg text-start border border-gray-200 shadow-lg">
          <h4 className="text-4xl font-lg font-russo text-gray-700 ">{assets.totalAssets}</h4>
          <p className="text-lg font-medium">Total Assets</p>
          <FontAwesomeIcon icon="chart-simple" size="xl" color="blue" className="absolute right-5 bottom-5" />
        </div>
        <div className="bg-white relative flex flex-col gap-2 p-5 rounded-lg text-start border border-gray-200 shadow-lg">
          <h4 className="text-4xl font-lg font-russo text-gray-700 ">{assets.totalAvailable}</h4>
          <p className="text-lg font-medium">Available Stock</p>
          <FontAwesomeIcon icon="check-to-slot" size="xl" color="green" className="absolute right-5 bottom-5" />
        </div>
        <div className="bg-white relative flex flex-col gap-2 p-5 rounded-lg text-start border border-gray-200 shadow-lg">
          <h4 className="text-4xl font-lg font-russo text-gray-700 ">{assets.totalDistributed}</h4>
          <p className="text-lg font-medium">Deployed Stock</p>
          <FontAwesomeIcon icon="handshake" size="xl" color="#E49F00" className="absolute right-5 bottom-5" />
        </div>
        <div className="bg-white relative flex flex-col gap-2 p-5 rounded-lg text-start border border-gray-200 shadow-lg">
          <h4 className="text-4xl font-lg font-russo text-gray-700 ">{assets.totalBroken}</h4>
          <p className="text-lg font-medium">Broken Assets</p>
          <FontAwesomeIcon icon="screwdriver-wrench" size="xl" color="gray" className="absolute right-5 bottom-5" />
        </div>
        <div className="bg-white relative flex flex-col gap-2 p-5 rounded-lg text-start border border-gray-200 shadow-lg">
          <h4 className="text-4xl font-lg font-russo text-gray-700 ">{assets.totalScrap}</h4>
          <p className="text-lg font-medium">Scrap Assets</p>
          <FontAwesomeIcon icon="trash-can" size="xl" color="red" className="absolute right-5 bottom-5" />
        </div>
      </div>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full md:w-1/2 p-2">
          <TotalAssets />
          
        </div>
      </div>
    </div>
  )
}