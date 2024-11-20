// Set config defaults when creating the instance
import axios from "axios";

import { notification } from "antd";

const URL = {

  DEPLOY_URL: "https://swp391-jruy.onrender.com/",

  LOCALHOST: "http://localhost:8081/",
};

const BASE_URL = URL.DEPLOY_URL;



const api = axios.create({

  baseURL: BASE_URL,


});

const showTokenExpiredNotification = () => {
  notification.error({
    message: "Session Expired",
    description: "Your session has expired. Please log in again.",
  });
};

//lam 1 hanh dong gi do truoc khi call api
const handleBefore = (config) => {

  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  config.headers["Authorization"] = `Bearer ${token}`;
  config.headers["refreshToken"] = refreshToken;
  return config;
};

const handleError = (error) => {
  console.log("api config");

  console.log(error);

  if (error.response && error.response.status === 403) {
    showTokenExpiredNotification();
    // Optionally, redirect the user to the login page

  }

};

api.interceptors.request.use(handleBefore, handleError);


  // api.interceptors.response.use(
  //   (response) => response,
  //   async (error) => {
  //     const originalRequest = error.config;
  //     console.log("api interceptors : "+originalRequest);
  //     if (error.response?.status === 403 && !originalRequest._retry) {
  //       originalRequest._retry = true;
  //       try {
  //         const response = await axios.post(
  //           "http://localhost:8081/v1/auth/refresh",
  //           {},
  //           { withCredentials: true }
  //         );
  //         const token = response.data.accessToken;
  //         localStorage.setItem("token", token);
  //         api.defaults.headers.common[
  //           "Authorization"
  //         ] = `Bearer ${token}`;
  //         return api(originalRequest); // Retry the original request
  //       } catch (refreshError) {
  //         // Handle refresh token expiration or other errors
  //         console.log("Refresh token expired. Redirect to login.");
  //         localStorage.removeItem("token");
  //         window.location.href = "/login"; // Redirect to login
  //         return Promise.reject(refreshError);
  //       }
  //     }
  //     return Promise.reject(error);
  //   }
  // );

// Alter defaults after instance has been created


export default api;


