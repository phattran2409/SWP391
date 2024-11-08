import  { useEffect, useState } from "react";


import api from "../../config/axios";

import {
  FaUserFriends,
  FaShoppingCart,
  FaAd,
  FaPercentage,
} from "react-icons/fa";
import { Line, Bar, Pie } from "react-chartjs-2";

const DashboardContainer = () => {
 

  const [users, setUsers] = useState([]);
  const [usersCount, setUsersCount] = useState([]);
  const [posts, setPosts] = useState([]);
  const [orders, setOrders] = useState({});
  const [ordersCount, setOrdersCount] = useState([]);


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(orders);

  const fetchData = async () => {
    try {
   
      setLoading(true);
      // Simulating API call
      const resUser = await api.get("v1/user/");
      const resPost = await api.get("v1/post/getAllPost");
      const resOrders = await api.get("v1/order/");

      const resOrdersCount = await api.get("v1/order/orderCount");
      const resUsersCount = await api.get("v1/user/userMonthCount");


      setOrdersCount(resOrdersCount.data);
      setUsersCount(resUsersCount.data);
      setUsers(resUser.data);
      setPosts(resPost.data);
      setOrders(resOrders.data);
    
   
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch dashboard data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // const interval = setInterval(fetchData, 60000); // Fetch data every minute
    // return () => clearInterval(interval);
  }, []);

  const countUserMonth = usersCount.slice(6, 12).map((item) => item.count);
  const salesData = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Users",
        data: countUserMonth,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const countFromJulToDec = ordersCount.slice(6, 12).map((item) => item.count);
  const orderData = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Orders",
        data: countFromJulToDec,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  const demographicData = {
    labels: ["News", "Blog", "Ads"],
    datasets: [
      {
        data: [
          Math.round(((posts.news / posts.totalDocuments) * 100).toFixed(1)),
          Math.round(((posts.blog / posts.totalDocuments) * 100).toFixed(1)),
          Math.round(((posts.ads / posts.totalDocuments) * 100).toFixed(1))
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
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
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Feng Shui Koi Consultant Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard
          title="Total Users"
          value={`${users.totalDocuments}`}
          icon={<FaUserFriends />}
        />
        <MetricCard
          title="Orders"
          value={`${orders.totalDocuments}`}
          icon={<FaShoppingCart />}
        />
        <MetricCard
          title="Total Posts"
          value={`${posts.totalDocuments}`}
          icon={<FaAd />}
        />
        <MetricCard
          title="Members / Total Users"
          value={`${((users.members / users.totalDocuments) * 100).toFixed(
            2
          )}%`}
          icon={<FaPercentage />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Registered</h2>
          <Line data={salesData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order History</h2>
          <Bar data={orderData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Top Selling Member Packages
          </h2>
          <ul>
            <li className="flex justify-between items-center py-2 border-b last:border-b-0">
              <span>Basic</span>
              <span className="font-semibold">{orders.basic} sold</span>
            </li>
            <li className="flex justify-between items-center py-2 border-b last:border-b-0">
              <span>Plus</span>
              <span className="font-semibold">{orders.plus} sold</span>
            </li>
            <li className="flex justify-between items-center py-2 border-b last:border-b-0">
              <span>Advance</span>
              <span className="font-semibold">{orders.advanced} sold</span>
            </li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Post By Category</h2>
          <li className="flex justify-between items-center py-2 border-b last:border-b-0">
            <span>News</span>
            <span className="font-semibold">{`${posts.news}`} posted</span>
          </li>
          <li className="flex justify-between items-center py-2 border-b last:border-b-0">
            <span>Blog</span>
            <span className="font-semibold">{`${posts.blog}`} posted</span>
          </li>
          <li className="flex justify-between items-center py-2 border-b last:border-b-0">
            <span>Advertising</span>
            <span className="font-semibold">{`${posts.ads}`} posted</span>
          </li>
          <Pie data={demographicData} options={{ responsive: true }} />
          
        </div>
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

export default DashboardContainer;
