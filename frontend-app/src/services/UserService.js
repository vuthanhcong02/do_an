import httpClient from "../utils/axiosCustom";

export const getUsers = () => {
  return httpClient.get("/users");
};

export const getUser = (id) => {
  return httpClient.get(`/users/${id}`);
};

export const deleteUser = (id) => {
  return httpClient.delete(`/users/${id}`);
};
