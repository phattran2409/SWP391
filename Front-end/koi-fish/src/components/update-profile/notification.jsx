import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import api from "../../config/axios.js";

export function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null); // Initialize user as null

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchNotifications(); // Fetch latest notifications from API
    }
  }, []);

  // Function to fetch notifications with status: true
  const fetchNotifications = async () => {
    try {
      const response = await api.get(`v1/user/getNotification`);
      if (response.status === 200) {
        setNotifications(response.data ?? []); // Set latest notifications
      } else {
        toast.error("Failed to fetch notifications");
      }
    } catch (error) {
    
      console.error(error);
    }
  };

  // Call API to update notification status in the database
  const handleNotificationClick = async (notificationID) => {
    try {
      const response = await api.post("v1/user/notificationStatus", {
        id: user._id, // Send user ID
        notificationID, // Send notification ID
      });

      if (response.status === 200) {
        // Remove notification from frontend after marking as read
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification._id !== notificationID)
        );
        toast.success("Notification marked as read");
      } else {
        toast.error("Failed to update notification status");
      }
    } catch (error) {
      toast.error("Error occurred while updating notification");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold mb-4">Notifications</h3>
      <div className="flex flex-col space-y-2">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className="p-4 rounded-lg shadow-md flex items-center bg-slate-300"
            >
              <div className="flex-shrink-0">
                <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
              </div>
              <div className="flex-grow">
                <p>{notification.content}</p>
              </div>
              <button
                onClick={() => handleNotificationClick(notification._id)}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <IoMdClose className="w-6 h-6" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-zinc-600">No unread notifications</div>
        )}
      </div>
    </div>
  );
}
