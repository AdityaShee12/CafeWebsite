import axios from "axios";
// import.meta.env.VITE_BACKEND_API
const api = axios.create({
  baseURL: "https://cafewebsite-e23o.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
