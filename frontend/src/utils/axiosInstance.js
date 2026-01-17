import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (!token) {
    delete config.headers.Authorization;
    return config;
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Network error or no response");
      return Promise.reject(error);
    }

    const { status, config } = error.response;

    if (config?.method === "options") {
      return Promise.reject(error);
    }

    // Unauthorized
    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    // Forbidden
    if (status === 403) {
      console.error("Access denied");
    }

    // Server Error
    if (status === 500) {
      console.error("Server error. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
