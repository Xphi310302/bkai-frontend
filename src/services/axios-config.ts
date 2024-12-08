import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    'Access-Control-Allow-Origin': '*', // Allow all origins
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  }
});

// Add an interceptor to handle CORS preflight requests
axiosInstance.interceptors.request.use(
  config => {
    // Ensure OPTIONS method is handled for preflight requests
    if (config.method === 'options') {
      config.headers['Access-Control-Request-Method'] = config.method.toUpperCase();
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
