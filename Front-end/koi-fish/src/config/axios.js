// Set config defaults when creating the instance
import axios from "axios";
const api = axios.create({
  baseURL: "http://14.225.220.131:8080/api",
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
