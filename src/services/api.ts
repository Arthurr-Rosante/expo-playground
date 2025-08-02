import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL + "/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// === LOGS DAS REQUISIÇÕES ================================================= //
api.interceptors.request.use(
  (config) => {
    console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`, {
      headers: config.headers,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error("[Request Error]", error);
    return Promise.reject(error);
  }
);

// === LOGS DAS RESPONSES =================================================== //
api.interceptors.response.use(
  (response) => {
    console.log(`[Response] ${response.status} ${response.config.url}`, {
      data: response.data,
    });
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const url = error.response?.config?.url;

    console.error(`[Response Error] ${status} ${url}`, {
      data: error.response?.data,
      headers: error.response?.headers,
    });

    // Retorna só o erro da API, sem mensagem do axios
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    // Fallback
    return Promise.reject({
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
  }
);

export default api;
