import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const InventoryPieChart = () => {
  const [assets, setAssets] = useState({
    totalAssets: 0,
    totalAvailable: 0,
    totalDistributed: 0,
    totalBroken: 0,
    totalScrap: 0,
  });

  const [chartData, setChartData] = useState({
    labels: ["Available", "Distributed", "Broken", "Scrap"],
    datasets: [
      {
        label: "Total Count",
        data: [0, 0, 0, 0],
        backgroundColor: ["#09CE1F", "#F8B721", "#A3A3A3", "#E01013"],
      },
    ],
  });

  const options = {
    plugins: {
      legend: {
        position: "top", // Correct position for chart.js v3+
        labels: {
          boxWidth: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
    },
  };

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
    if (!assets.totalAssets) return;

    setChartData({
      labels: ["Available", "Distributed", "Broken", "Scrap"],
      datasets: [
        {
          label: "Total Count",
          data: [assets.totalAvailable, assets.totalDistributed, assets.totalBroken, assets.totalScrap], 
          backgroundColor: ["#09CE1F", "#F8B721", "#A3A3A3", "#E01013"],
        },
      ],
    });
  }, [assets]);

  return (
    <div className="p-6 rounded-lg h-[100%] w-[100%] shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:shadow-sm transition-all">
      <h2 className="text-xl font-semibold mb-4">Assets Overview</h2>
      <div className="w-[100%] h-[100%]">
      <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default InventoryPieChart;
