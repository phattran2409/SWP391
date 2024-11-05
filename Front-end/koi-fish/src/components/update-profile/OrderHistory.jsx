import { useState, useEffect } from "react";

import { toast } from "react-toastify";
import api from "../../config/axios.js";
import {  FaEye } from "react-icons/fa";
import "../../page/testpage/consulting-detail/animate.css";

export function OrderHistory() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchOrder(storedUser._id);
    }
  }, []);

  const fetchOrder = async (id) => {
    try {
      const response = await api.get(`v1/order/getByUser/${id}`);
      if (response.status === 200) {
        setOrder(response.data ?? []);
      } else {
        toast.error("Failed to fetch notifications");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (id) => {
    try {
      const res = await api.get(`v1/order/getById/${id}`);
      if (res.status === 200) {
        setOrderDetails(res.data);
        console.log("Order details fetched:", res.data);
      } else {
        toast.error("Failed to fetch order details");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDetails = async (orderId) => {
    if (isOpen === false && orderId) {
      // Fetch details only if modal is closed and orderId is provided
      await fetchOrderDetails(orderId);
    }
    // Toggle modal state after data is fetched
    setIsOpen(!isOpen);
  };

 

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto   bg-white border border-gray-200 rounded-lg shadow-lg">
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto   bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Package Memeber Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Payment Gateway
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition duration-300"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {order._id}
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">
                      {order.packageType}
                    </div>
                  </td>
                  {order.orderId.includes("MOMO") ? (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a target="_blank" href="https://www.momo.vn/">
                        <img
                          src={
                            "https://res.cloudinary.com/ddqgjy50x/image/upload/v1730102252/MoMo_Logo_nwbyu7.png"
                          }
                          alt="MoMo"
                          className="h-20 w-20 object-cover rounded-md"
                        />
                      </a>
                    </td>
                  ) : (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a target="_blank" href="https://zalopay.vn/">
                        <img
                          src={
                            "https://res.cloudinary.com/ddqgjy50x/image/upload/v1730202814/Logo-ZaloPay-Square_f0zjno.webp"
                          }
                          alt="Zalopay"
                          className="h-20 w-20 object-cover rounded-md"
                        />
                      </a>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-gray-600 hover:text-red-500 flex items-center transition duration-300"
                      onClick={() => toggleDetails(order._id)}
                    >
                      <FaEye color="red" className="mr-1" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isOpen && (
            <div className="animate-fadeInOrder fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md transform  p-6">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-800 absolute top-4 right-4"
                >
                  &times;
                </button>

                {/* Order Content */}
                <div className="text-center">
                  <h2 className="text-lg font-semibold uppercase">
                    Feng Shui Koi Consultant
                  </h2>
                </div>

                <div className="mt-6 text-center">
                  <h3 className="text-red-700 text-xl font-semibold mb-2 uppercase">
                    Payment Summary
                  </h3>
                  <h3 className="text-red-700 text-base font-semibold mb-2 ">
                    Order ID: {orderDetails ? orderDetails._id : "Loading..."}
                  </h3>
                  <div className=" pt-4  flex justify-between py-1 ">
                    <span>Customer</span>
                    <span className="text-gray-600">
                      {user ? user.name : "Loading..."}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 ">
                    <span>Payment Gateway</span>
                    {orderDetails.orderId.includes("MOMO") ? (
                      <span className="text-gray-600">MoMo</span>
                    ) : (
                      <span className="text-gray-600">Zalopay</span>
                    )}
                  </div>
                  <div className="flex justify-between py-1 ">
                    <span>Date</span>
                    <span className="text-gray-600">
                      {orderDetails
                        ? new Date(orderDetails.createdAt).toLocaleDateString()
                        : "Loading..."}
                    </span>
                  </div>
                  <div className=" pt-4 flex justify-between py-1 ">
                    <span className="text-gray-600">Package Type</span>
                    <span className="text-gray-600">Price</span>
                  </div>
                  <div className="">
                    <div className="border-t border-gray-200 flex justify-between py-1">
                      <span className="font-medium">
                        {orderDetails.packageType}
                      </span>
                      <span>
                        {orderDetails.amount.toLocaleString('vi-VN')} VND
                      </span>
                    </div>

                    <div className="border-t border-gray-200 flex justify-between py-1 font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-red-600">
                      {orderDetails.amount.toLocaleString('vi-VN')} VND
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center flex justify-center">
                  <img
                    src="https://cdn.dribbble.com/users/637635/screenshots/6065726/media/d7bc7eaef56c2cea27db19c5d9c7d05a.gif"
                    className="border border-gray-200 rounded-lg h-40 w-30"
                  ></img>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
