import httpClient from "../utils/axiosCustom";

export const getUsers = (page) => {
  return httpClient.get("/users?page=" + page);
};

export const getUser = (id) => {
  return httpClient.get(`/users/${id}`);
};

export const deleteUser = (id) => {
  return httpClient.delete(`/users/${id}`);
};
