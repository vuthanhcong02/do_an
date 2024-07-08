import axios from "axios";
import { getToken } from "../services/AuthService";
const httpClient = axios.create({
  baseURL: process.env.API_URL || "http://api.ngoaingutinhoc.tech.com/api/",
  headers: {
    "Content-Type": "application/json, multipart/form-data",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
  },
});

httpClient.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
httpClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response
      ? error.response.data
      : Promise.reject(error);
  }
);

export default httpClient;
