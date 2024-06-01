import httpClient from "../utils/axiosCustom";

export const getTeachers = () => {
  return httpClient.get("/teachers");
};

export const getTeacherById = (id) => {
  return httpClient.get(`/teachers/${id}`);
};

export const deleteTeacher = (id) => {
  return httpClient.delete(`/teachers/${id}`);
};
