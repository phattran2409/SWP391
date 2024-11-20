import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ReCAPTCHA from "react-google-recaptcha";

const AccountSettings = () => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const commonDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];

  const validateForm = () => {
    let newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (currentPassword.length < 6) {
      newErrors.currentPassword = "Password too short";
    }
    if (newPassword.length < 6) {
      newErrors.newPassword = "New password too short";
    }
    if (!captchaValue) {
      newErrors.captcha = "Please complete the CAPTCHA";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      // Simulating API call
      setTimeout(() => {
        setLoading(false);
        alert("Account settings updated successfully!");
      }, 2000);
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Account Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out`}
                placeholder="Enter your email"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby="email-error"
              />
              <datalist id="email-suggestions">
                {commonDomains.map((domain) => (
                  <option key={domain} value={`${email.split("@")[0]}@${domain}`} />
                ))}
              </datalist>
            </div>
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={`w-full px-4 py-2 border ${errors.currentPassword ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out`}
              placeholder="Enter current password"
              aria-invalid={errors.currentPassword ? "true" : "false"}
              aria-describedby="currentPassword-error"
            />
            {errors.currentPassword && (
              <p id="currentPassword-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.currentPassword}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full px-4 py-2 border ${errors.newPassword ? "border-red-500" : "border-gray-300"} rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out`}
                placeholder="Enter new password"
                aria-invalid={errors.newPassword ? "true" : "false"}
                aria-describedby="newPassword-error"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.newPassword && (
              <p id="newPassword-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.newPassword}
              </p>
            )}
          </div>

          <div>
            <ReCAPTCHA
              sitekey="YOUR_RECAPTCHA_SITE_KEY"
              onChange={handleCaptchaChange}
            />
            {errors.captcha && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {errors.captcha}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                Updating...
              </>
            ) : (
              "Update Information"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
