import httpClient from "../utils/axiosCustom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export const login = (data) => {
  return httpClient.post("/auth/login", data);
};

export const loginWithSocial = (data) => {
  return httpClient.post("/auth/social-login", data);
};

export const adminLogin = (data) => {
  return httpClient.post("/auth/admin/login", data);
};

export const adminLogout = () => {
  httpClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  return httpClient.post("/auth/admin/logout");
};

export const registerUser = (data) => {
  return httpClient.post("/auth/register", data);
};

export const logout = () => {
  httpClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  return httpClient.post("/auth/logout");
};

export const userInfo = () => {
  httpClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  return httpClient.get("/auth/user-profile");
};

export const updateProfile = (data) => {
  httpClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  return httpClient.post("/auth/update-profile", data);
};

export const changePassword = (data) => {
  httpClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  return httpClient.post("/auth/change-pass", data);
};

export const saveToken = (token, expiresIn) => {
  const expiryTime = jwtDecode(token).exp * 1000; // Convert to milliseconds
  localStorage.setItem("token", token);
  localStorage.setItem("expiry_time", expiryTime);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getExpiryTime = () => {
  return parseInt(localStorage.getItem("expiry_time"), 10);
};

export const refreshToken = async () => {
  try {
    const response = await httpClient.post("/auth/refresh", {
      token: getToken(),
    });

    if (response && response.data) {
      saveToken(response.data.access_token, response.data.expires_in);
      return response.data.access_token;
    } else {
      console.error("Failed to refresh token: no data in response");
      return null;
    }
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};

const checkAndRefreshToken = async () => {
  const expiryTime = getExpiryTime();
  const currentTime = Date.now();
  const timeToExpiry = expiryTime - currentTime;
  console.log(timeToExpiry);
  if (timeToExpiry < 300000) {
    toast.warning("Your session is about to expire. Please save your work.");
    localStorage.removeItem("token");
    localStorage.removeItem("expiry_time");
    window.location.reload();
  }
};

setInterval(checkAndRefreshToken, 60000);
