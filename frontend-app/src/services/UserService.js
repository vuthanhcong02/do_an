import httpClient from "../utils/axiosCustom";

export const getUsers = () => {
  return httpClient.get("/users");
};
