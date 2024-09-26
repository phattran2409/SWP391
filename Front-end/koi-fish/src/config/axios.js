// Set config defaults when creating the instance
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Alter defaults after instance has been created
export default api;
