import httpClient from "../utils/axiosCustom";

export const getTeachers = (page) => {
  return httpClient.get("/teachers?page=" + page);
};

export const getTeacherById = (id) => {
  return httpClient.get(`/teachers/${id}`);
};

export const deleteTeacher = (id) => {
  return httpClient.delete(`/teachers/${id}`);
};
