import {  useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";

import api from "../../config/axios.js";

export function Notifications() {
  const user = JSON.parse(localStorage.getItem("user"));
  const usernotification = user?.notification ?? []; // Default to empty array if undefined
  const [notifications, setNotifications] = useState(usernotification);

  // Call API to update notification status in the database
  const handleNotificationClick = async (notificationID) => {
    try {
      const response = await api.post("v1/user/notificationStatus", {
        id: user._id, // Send user ID
        notificationID, // Send notification ID
      });

      if (response.status === 200) {
        // Update notification status on frontend
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification._id === notificationID
              ? { ...notification, status: false }
              : notification
          )
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
        {notifications
          ?.filter((notification) => notification.status == true)
          .map((notification) => (
            <div
              key={notification._id}
              className={`${
                notification.status == false && "hidden"
              } p-4 rounded-lg shadow-md flex items-center  bg-slate-300`}
            >
              <div className="flex-shrink-0">
                {/* Optional: You can add an icon or avatar here */}

                <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
              </div>
              <div className="flex-grow">
                <div className="flex-col">
                  <p> {notification.content} </p>
                  {/* <p className="translate-y-5 text-xs text-slate-600">
                  {notification.createAtDate}{" "}
                </p> */}
                </div>
              </div>
              <button
                onClick={() => handleNotificationClick(notification._id)}
                className="  p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <IoMdClose className="w-6 h-6" />
              </button>
            </div>
          ))}
        {notifications?.length === 0 && (
          <div className="text-zinc-600"> Notification empty</div>
        )}
      </div>
    </div>
  );
}
