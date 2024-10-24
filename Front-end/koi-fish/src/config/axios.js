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
  config.headers["Authorization"] = `Bearer ${token}`;
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


// Alter defaults after instance has been created


export default api;


