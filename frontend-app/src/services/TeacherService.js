import httpClient from "../utils/axiosCustom";

export const getTeachers = () => {
  return httpClient.get("/teachers");
};
