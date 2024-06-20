import httpClient from "../utils/axiosCustom";

export const login = (data) => {
  return httpClient.post("/auth/login", data);
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
