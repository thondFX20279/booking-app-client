import axios from "axios";
const axiosClient = axios.create({
  baseURL: "https://booking-app-server-ze5e.onrender.com/api/",
  // baseURL: "http://localhost:8080/api/",
  timeout: 5000,
});

export default axiosClient;
