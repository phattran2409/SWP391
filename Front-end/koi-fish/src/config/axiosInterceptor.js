import axios from "axios";
// import jwt_decode from "jwt-decode"; // Optional: to decode JWTs
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
// Function to call the refresh token API
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      "Http://localhost:8081/v1/auth/refresh",
      {},
      { withCredentials: true }
    );
    console.log("refresh  token" +response);
    
    const { accessToken } = response.data;
    return accessToken; // Return the new access token
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

const URL = {
  DEPLOY_URL: "https://swp391-jruy.onrender.com",
  LOCALHOST: "http://localhost:8081/",
};

const BASE_URL = URL.LOCALHOST;


const useAxiosInterceptor = () => {
  const navigate = useNavigate();

  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: BASE_URL, // Set your API base URL
  });

  // Interceptor to handle expired tokens
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true; // Prevent infinite loop
        try {
          const newAccessToken = await refreshAccessToken();
          localStorage.setItem("accessToken", newAccessToken); // Store the new token

          // Set the new token in the original request and retry it
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest); // Retry the original request with new token
        } catch (err) {
          console.log(
            "Error refreshing token or re-authentication failed:",
            err
          );
          // Optionally, redirect to login page if token refresh fails
          navigate("/login");
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosInterceptor;
