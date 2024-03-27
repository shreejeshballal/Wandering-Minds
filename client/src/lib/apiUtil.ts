import axios from "axios";
import { GOOGLE } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
    charset: "utf-8",
    "Access-Control-Allow-Origin": "*",
    Authorization: localStorage.getItem(GOOGLE) === "true" ? "google" : "jwt",
    credentials: "include",
  },
  withCredentials: true,
});

export default api;

export const awsApi = axios.create();
