import React, { useState } from "react";
import axios from "axios";
import ReCAPTCHA from 'react-google-recaptcha';


const updatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);

    


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setErrors("New password and confirm password do not match");
      return;
    }

      // Kiểm tra CAPTCHA
      if (!captchaValue) {
        setErrors('Vui lòng xác minh rằng bạn không phải là robot.');
        return;
      }

    try {
      const res = await axios.post("", {
        currentPassword,
        newPassword,
      });

      if (res.status === 200) {
        setSuccess("Password updated successfully");
        //reset the form
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setErrors("Failed to update password");
      console.error("Error updating password", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-lg font-bold mb-4">Update Your Password</h2>
        {errors && <div className="text-red-500 mb-4">{errors}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <div className="mb-4">
          <label htmlFor="currentPassword" className="block mb-2">
            Enter your current password
          </label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border border-gray-300 rounded w-full p-2"
            required
          ></input>
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block mb-2">
            Enter your new password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-gray-300 rounded w-full p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-2">
            Confirm your new password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`border ${
              newPassword && confirmPassword && newPassword !== confirmPassword
                ? "border-red-500"
                : "border-gray-300"
            } rounded w-full p-2`}
            required
          />
          {newPassword &&
            confirmPassword &&
            newPassword !== confirmPassword && (
              <p className="text-red-500 text-sm">
                New password doesnt match confirm password!
              </p>
            )}
        </div>

              {/* ADD CAPTCHA */}
        <div className="mb-4">
          <ReCAPTCHA
            sitekey="6LcSX1sqAAAAAFuGs2UCCnAN2w_wnWBLx-wBKhxk" // Thay YOUR_SITE_KEY bằng khóa site của bạn
            onChange={(value) => setCaptchaValue(value)} // Lưu giá trị CAPTCHA
          />
        </div>



        <button type="submit" className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600">
            Update Password
        </button>
      </form>
    </div>
  );
};

export default updatePassword;