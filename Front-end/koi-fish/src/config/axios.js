// Set config defaults when creating the instance
import axios from "axios";
const URL = {
<<<<<<< Updated upstream
  DEPLOY_URL: "https://swp391-jruy.onrender.com",
=======
  DEPLOY_URL: "https://swp391-jruy.onrender.com/",
>>>>>>> Stashed changes
  LOCALHOST: "http://localhost:8081/",
};

const BASE_URL = URL.DEPLOY_URL;

const api = axios.create({

  baseURL: BASE_URL,
  

});

//lam 1 hanh dong gi do truoc khi call api
const handleBefore = (config) => {

  const token = localStorage.getItem("token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
};

const handleError = (error) => {
  console.log(error);

};

api.interceptors.request.use(handleBefore, handleError);

// Alter defaults after instance has been created

export default api;

