import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000", // Backend API URL
});

// automatically send token if available
api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;