// Set config defaults when creating the instance
import axios from "axios";
const api = axios.create({
  baseURL: "http://14.225.220.131:8080/api",
});

// Alter defaults after instance has been created
export default api;
