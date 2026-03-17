import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // important for cookies
});

// Interceptor adds token dynamically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // read token at runtime
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;