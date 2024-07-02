import httpClient from "../utils/axiosCustom";

export const getClasses = (page) => {
  return httpClient.get("/classes?page=" + page);
};

export const getClassById = (id) => {
  return httpClient.get(`/classes/${id}`);
};

export const deleteClass = (id) => {
  return httpClient.delete(`/classes/${id}`);
};

export const makeClass = (data) => {
  return httpClient.post("/classes", data);
};

export const updateClass = (id, data) => {
  return httpClient.put(`/classes/${id}`, data);
};

export const getClassesByCourse = (id) => {
  return httpClient.get(`/classes/course/${id}`);
};
