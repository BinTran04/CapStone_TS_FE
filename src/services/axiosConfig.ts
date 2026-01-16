import axios from "axios";

const BASE_URL = "https://elearningnew.cybersoft.edu.vn/api";

const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNTQiLCJIZXRIYW5TdHJpbmciOiIyOC8wOC8yMDI2IiwiSGV0SGFuVGltZSI6IjE3ODc4NzUyMDAwMDAiLCJuYmYiOjE3Njk1MzMyMDAsImV4cCI6MTc4ODAyMjgwMH0.cX4W082coiCPW_GttAh6P5fDK6QCHTATy3vjQnjDt9Q";

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    // "Content-Type": "application/json",
    TokenCybersoft: TOKEN_CYBERSOFT,
  },
});

// Interceptor Request: Tự động gắn Token đăng nhập vào header
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor Response: Xử lý dữ liệu trả về hoặc lỗi
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log("Hết phiên đăng nhập hoặc không có quyền truy cập");
    }
    return Promise.reject(error);
  }
);
