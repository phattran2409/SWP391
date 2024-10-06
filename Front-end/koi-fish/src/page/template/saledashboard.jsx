import React, { useState, useEffect } from "react";
import { FaChartLine, FaShoppingCart, FaDollarSign, FaPercentage, FaBoxOpen, FaUsers, FaCog } from "react-icons/fa";
import { Line, Bar, Pie, HeatMap } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const EcommerceDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalSales: 0,
    orders: 0,
    averageOrderValue: 0,
    conversionRate: 0,
  });
  const [topProducts, setTopProducts] = useState([]);
  const [demographics, setDemographics] = useState({});
  const [timeframe, setTimeframe] = useState("weekly");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulating API call
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              metrics: {
                totalSales: 150000,
                orders: 1000,
                averageOrderValue: 150,
                conversionRate: 3.5,
              },
              topProducts: [
                { name: "Product A", sales: 500 },
                { name: "Product B", sales: 350 },
                { name: "Product C", sales: 200 },
              ],
              demographics: {
                age: { "18-24": 20, "25-34": 35, "35-44": 25, "45+": 20 },
                gender: { Male: 55, Female: 45 },
              },
            });
          }, 1000)
        );

        setMetrics(response.metrics);
        setTopProducts(response.topProducts);
        setDemographics(response.demographics);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch dashboard data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [timeframe]);

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [12000, 19000, 3000, 5000, 2000, 3000],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const orderData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Orders",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const demographicData = {
    labels: Object.keys(demographics.age || {}),
    datasets: [
      {
        data: Object.values(demographics.age || {}),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
        ],
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">E-commerce Sales Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Total Sales" value={`$${metrics.totalSales.toLocaleString()}`} icon={<FaDollarSign />} />
        <MetricCard title="Orders" value={metrics.orders.toLocaleString()} icon={<FaShoppingCart />} />
        <MetricCard title="Avg. Order Value" value={`$${metrics.averageOrderValue.toLocaleString()}`} icon={<FaChartLine />} />
        <MetricCard title="Conversion Rate" value={`${metrics.conversionRate}%`} icon={<FaPercentage />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Sales Trend</h2>
          <Line data={salesData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order History</h2>
          <Bar data={orderData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
          <ul>
            {topProducts.map((product, index) => (
              <li key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <span>{product.name}</span>
                <span className="font-semibold">{product.sales} sold</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Customer Demographics</h2>
          <Pie data={demographicData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setTimeframe("daily")}
          className={`px-4 py-2 rounded-l-md ${timeframe === "daily" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Daily
        </button>
        <button
          onClick={() => setTimeframe("weekly")}
          className={`px-4 py-2 ${timeframe === "weekly" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Weekly
        </button>
        <button
          onClick={() => setTimeframe("monthly")}
          className={`px-4 py-2 rounded-r-md ${timeframe === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Monthly
        </button>
      </div>

      <div className="text-center text-gray-500 text-sm">
        <p>Last updated: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
    <div className="text-3xl text-blue-500 mr-4">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default EcommerceDashboard;