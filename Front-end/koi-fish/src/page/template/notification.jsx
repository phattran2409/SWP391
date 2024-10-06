import React, { useState, useEffect } from "react";
import { FaBell, FaTimes } from "react-icons/fa";

const NotificationCard = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const notificationTime = new Date(now.getTime() - 5 * 60000); // 5 minutes ago
      const diffInMinutes = Math.floor((now - notificationTime) / 60000);
      setTimeAgo(`${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-102 focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-opacity-75" role="alert" aria-live="polite">
      <div className="p-4 flex items-start">
        <div className="flex-shrink-0">
          <FaBell className="h-6 w-6 text-blue-500" aria-hidden="true" />
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <h3 className="text-sm font-medium text-gray-900">New Notification</h3>
          <p className="mt-1 text-sm text-gray-500">You have a new message from the system.</p>
          <p className="mt-1 text-xs text-gray-400">{timeAgo}</p>
          <div className="mt-3 flex space-x-2">
            <button
              type="button"
              className="bg-blue-500 text-white rounded-md px-3 py-1.5 text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              onClick={() => alert("View action clicked")}
            >
              View
            </button>
            <button
              type="button"
              className="bg-gray-200 text-gray-700 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
              onClick={handleDismiss}
              aria-label="Dismiss notification"
            >
              Dismiss
            </button>
          </div>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleDismiss}
          >
            <span className="sr-only">Close</span>
            <FaTimes className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      {/* Error handling message */}
      <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md hidden" role="alert">
        <div className="flex">
          <div className="py-1">
            <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold">Error</p>
            <p className="text-sm">Something went wrong. Please try again later.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;