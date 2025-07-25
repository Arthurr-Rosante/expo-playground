import axios from "axios";

const API_URL = process.env.API_URL || "api-url-not-set";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
