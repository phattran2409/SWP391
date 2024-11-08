import { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useLocation, useNavigate } from "react-router-dom";
import { notification } from "antd";

import api from "../../../config/axios.js";

export function ChangeEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const [email, setEmail] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (pathName === "/changeEmail" && !token) {
      notification.error({
        message: "Invalid Request",
        description:
          "No token provided. Please initiate the email change process again.",
      });
      navigate("/profile"); // Redirect to profile or appropriate page
    }
  }, [pathName, token, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCaptchaChange = (value) => {
    console.log("CAPTCHA value:", value);
    setCaptchaVerified(!!value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (captchaVerified && email) {
      setSubmitted(true);
      try {
        let response;

        if (pathName === "/changeEmail") {
          if (!token) {
            notification.error({
              message: "Invalid Request",
              description:
                "No token provided. Please initiate the email change process again.",
            });
            navigate("/profile");
            return;
          }
          // Call the API to confirm the email change
          response = await api.post("v1/user/confirmEmail", { token, email });
          notification.success({
            message: "Success",
            description:
              "Your email has been updated successfully. Redirecting to profile...",
          });
        } else {
          // Call the API to send an email
          response = await api.post("v1/user/send-change-email", { email });
          console.log(response);
          notification.success({
            message: "Success",
            description:
              "An email has been sent successfully. Please check your inbox.",
          });
        }

        setTimeout(() => navigate("/profile"), 3000);
      } catch (err) {
        console.error(err); // Log error
        notification.error({
          message: "Error",
          description:
            err.response?.data?.message ||
            "Something went wrong. Please try again.",
        });
        setSubmitted(false);
      }
    } else {
      notification.error({
        message: "Verification Failed",
        description: "Please complete the CAPTCHA and enter a valid email.",
      });
    }
  };

  return (
    <div className={`flex justify-center items-center h-full translate-y-1/5`}>
      <div className="max-w-screen-sm mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">Change Email</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder={
                pathName === "/changeEmail"
                  ? "Enter your new email"
                  : "Enter your email to send verification"
              }
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          {/* reCAPTCHA */}
          <div className="mb-4">
            <ReCAPTCHA
              sitekey="6LfbSFoqAAAAAFIsgVegPsw4cmE-bV7saoQcIj1E"
              onChange={handleCaptchaChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-bold rounded ${
              captchaVerified
                ? "bg-red-600 hover:bg-red-500"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!captchaVerified}
          >
            Submit
          </button>

          {submitted && (
            <div className="mt-4 text-green-500 font-semibold">             
              <p>
                {pathName === "/changeEmail"
                  ? "Your email has been updated!"
                  : "An email has been sent!"}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
