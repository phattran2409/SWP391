
import {  useState } from "react";
import {  toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import api from "../../../config/axios.js";

export function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu mới và mật khẩu nhập lại có khớp nhau không
    if (newPassword !== repeatPassword) {
      toast.error("New password and repeat password do not match!", {
        position: "top-right",
      });
      return;
    }

    // Kiểm tra độ mạnh của mật khẩu
    if (!validatePassword()) {
      return;
    }

    const passwordData = {
      currentPassword,
      newPassword,
    };

    try {
      const response = await api.post(
        "v1/user/updatePassword",
        passwordData,
    
      );
      console.log(response);
      toast.success("Password updated successfully!", {
        position: "top-right",
      });

      // Optional: Reset form fields sau khi thành công
      setCurrentPassword("");
      setNewPassword("");
      setRepeatPassword("");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401 ) {
         
          toast.error("Current password is incorrect.", {
            position: "top-right",
          });
        } else {
          // Các lỗi khác
          toast.error(error.response.data.message || "Failed to update password", {
            position: "top-right",
          });
        }
      } else {
        // Các lỗi khác (network error, ...)
        toast.error("An error occurred. Please try again later.", {
          position: "top-right",
        });
      }
    }
  };

  const validatePassword = () => {
    // Kiểm tra độ dài của mật khẩu (ít nhất 8 ký tự)
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long!", {
        position: "top-right",
      });
      return false;
    }

    // Kiểm tra có ít nhất một chữ cái thường, một chữ cái hoa, một số và một ký tự đặc biệt
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!",
        {
          position: "top-right",
        }
      );
      return false;
    }

    return true;
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen-fit ">
        <form
          className="bg-white p-4 rounded-md shadow-md w-full max-w-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-bold mb-5 text-center">
            Update Password
          </h2>

          {/* Current Password */}
          <div className="mb-4">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Current Password
            </label>
            {/* Input password */}
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {showCurrentPassword ? (
                  <IoMdEyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <IoMdEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="relative mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {showNewPassword ? (
                  <IoMdEyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <IoMdEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Repeat Password */}
          <div className="mb-4">
            <label
              htmlFor="repeatPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Repeat Password
            </label>
            <div className="relative">
              <input
                type={showRepeatPassword ? "text" : "password"}
                id="repeatPassword"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {showRepeatPassword ? (
                  <IoMdEyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <IoMdEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-500 transition-colors"
          >
            Submit
          </button>
        </form>
     
      </div>
    </>
  );
}
