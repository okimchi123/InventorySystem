import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const AssetTrendsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState("yearly");
  const [selectedProduct, setSelectedProduct] = useState("All");
  const [fetchedData, setFetchedData] = useState({ weekly: [], monthly: [], yearly: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/asset/asset-trends");
        setFetchedData({
          weekly: response.data.weeklyData,
          monthly: response.data.monthlyData,
          yearly: response.data.yearlyData,
        });
        updateChart(response.data.yearlyData, "yearly", "All");
      } catch (error) {
        console.error("Error fetching asset trends:", error);
      }
    };

    fetchData();
  }, []);

  const updateChart = (data, timeframe, productType) => {
    let labels = [];
    if (timeframe === "weekly") {
      labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    } else if (timeframe === "monthly") {
      labels = Array.from({ length: 31 }, (_, i) => `${String(i + 1).padStart(2, "0")}`); // Days as "01", "02", etc.
    } else if (timeframe === "yearly") {
      labels = [
        "2025-01", "2025-02", "2025-03", "2025-04", "2025-05", "2025-06",
        "2025-07", "2025-08", "2025-09", "2025-10", "2025-11", "2025-12"
      ];
    }

    // Filter data by selected product type
    const filteredData = productType === "All"
      ? data
      : data.filter((item) => item._id.producttype === productType);

    // Map dataset values to corresponding labels
    const dataValues = labels.map((label) => {
      const found = filteredData.find((item) => item._id.period === label);
      return found ? found.total : 0;
    });

    setChartData({
      labels: labels,
      datasets: [
        {
          label: `Total Assets (${timeframe}) - ${productType}`,
          data: dataValues,
          borderColor: "blue",
          backgroundColor: "rgba(0, 0, 255, 0.2)",
          tension: 0.2,
        },
      ],
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold mb-4">Total Assets</h3>
        <div className="buttons flex p-[4px] gap-[4px]">
          {["yearly", "monthly", "weekly"].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => {
                setSelectedTimeframe(timeframe);
                updateChart(fetchedData[timeframe], timeframe, selectedProduct);
              }}
              className={`px-3 py-[4px] rounded-lg transition-all cursor-pointer border ${
                selectedTimeframe === timeframe ? "bg-gray-400 text-white" : "text-gray-500 hover:bg-gray-400 hover:text-white"
              }`}
            >
              {timeframe === "yearly" ? "12 Months" : timeframe === "monthly" ? "30 Days" : "7 Days"}
            </button>
          ))}
        </div>
        <select
          className="border p-2 rounded-lg"
          value={selectedProduct}
          onChange={(e) => {
            setSelectedProduct(e.target.value);
            updateChart(fetchedData[selectedTimeframe], selectedTimeframe, e.target.value);
          }}
        >
          <option value="All">All</option>
          <option value="Laptop">Laptop</option>
          <option value="Mouse">Mouse</option>
          <option value="Charger">Charger</option>
          <option value="Phone">Phone</option>
          <option value="Cable">Cable</option>
          <option value="Box">Box</option>
          <option value="Monitor">Monitor</option>
          <option value="Printer">Printer</option>
          <option value="Chair">Chair</option>
          <option value="Table">Table</option>
        </select>
      </div>

      {chartData ? <Line data={chartData} options={{ plugins: { legend: { display: false } } }} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default AssetTrendsChart;
