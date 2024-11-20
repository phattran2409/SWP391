import React, { useState } from "react";
import axios from "axios";

const sendChangeEmail = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");

  // Function to get the Bearer token from localStorage
  const getToken = () => {
    return localStorage.getItem("accessToken"); // Giả sử token được lưu với tên 'accessToken'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    setSuccess("");

    const token = getToken(); // Lấy token từ localStorage

    if (!token) {
      setErrors("You are not authenticated");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8081/v1/auth/send-change-email",
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm Bearer token vào headers
          },
        }
      );

      if (res.status === 200) {
        setSuccess("Email change request has been sent");
        // Reset the form
        setEmail("");
      }
    } catch (error) {
      setErrors("Failed to send email");
      console.error("Error sending email change request", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-lg font-bold mb-4">Update Your Email</h2>
        {errors && <div className="text-red-500 mb-4">{errors}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Enter your new email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded w-full p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600"
        >
          Send Change Email
        </button>
      </form>
    </div>
  );
};

export default sendChangeEmail;
