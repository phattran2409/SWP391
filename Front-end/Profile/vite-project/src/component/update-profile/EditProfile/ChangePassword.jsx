import { useRef, useState } from "react";
 import { ToastContainer, toast } from "react-toastify";
 import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";
export function ChangePassword() {
      const [currentPassword, setCurrentPassword] = useState("");
      const [newPassword, setNewPassword] = useState("");
      const [repeatPassword, setRepeatPassword] = useState("");
      const [showCurrentPassword, setShowCurrentPassword] = useState(false);
      const [showNewPassword, setShowNewPassword] = useState(false);
      const [showRepeatPassword, setShowRepeatPassword] = useState(false);
      const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== repeatPassword) {
              toast.error(
                  "New password and repeat password do not match !",
                  {
                    position: "top-right",
                  }
                );
       
          return;
        }
        if (validatePassword()) {
            toast.success("Password updated successfully");
        }
        // Handle password update logic here
      
           
      };
         const validatePassword = () => {
           // Kiểm tra độ dài của mật khẩu
           if (newPassword.length < 6) {
             toast.error("Password must be at least 8 characters long!");
             return false;
           }
           // Kiểm tra có ít nhất một chữ cái thường, một chữ cái hoa, một số và một ký tự đặc biệt
           const passwordRegex =
             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
           if (!passwordRegex.test(newPassword)) {
             toast.error(
               "Password must contain at least one uppercase letter, one lowercase letter,And one number!"
             );
             return false;
           }
           // Kiểm tra mật khẩu mới và mật khẩu nhập lại có khớp nhau không
           if (newPassword !== repeatPassword) {
             toast.error("Passwords do not match!");
             return false;
           }
           return true;
         };
    return (
      <>
        <div className="flex  justify-center items-center min-h-fit bg-gray-100">
          <form
            className="bg-white p-6 rounded-md shadow-md w-full max-w-lg"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-bold mb-4 text-center">
              Update Password
            </h2>

            {/* Current Password */}
            <div className="mb-4 ">
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Current Password
              </label>
              {/* input password*/}
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  id="currentPassword"
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
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className=" w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300"
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
              className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-colors"
            >
              Submit
            </button>
          </form>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
          />
        </div>
      </>
    );
}