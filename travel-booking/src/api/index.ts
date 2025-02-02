import axios from "axios";

const API_URL = "http://localhost:3000";

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication
export const login = (data: LoginData) =>
  api.post("/auth/login", data);

export const register = (data: RegisterData) =>
  api.post("/auth/register", data);

// Travel Packages
export const getPackages = () => 
  api.get("/packages");

export const getPackageById = (id: number) =>
  api.get(`/packages/${id}`);

export const addComment = (data: { packageId: number; content: string }) =>
  api.post("/comments", data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export const getComments = (packageId: number) =>
  api.get(`/comments/${packageId}`);

export const deleteComment = (commentId: number) =>
  api.delete(`/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
