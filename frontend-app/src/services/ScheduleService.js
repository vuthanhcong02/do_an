import httpClient from "../utils/axiosCustom";

export const getSchedules = (page) => {
  return httpClient.get("/schedules?page=" + page);
};

export const getScheduleById = (id) => {
  return httpClient.get(`/schedules/${id}`);
};

export const createSchedule = (data) => {
  return httpClient.post("/schedules", data);
};

export const updateSchedule = (id, data) => {
  return httpClient.put(`/schedules/${id}`, data);
};

export const deleteSchedule = (id) => {
  return httpClient.delete(`/schedules/${id}`);
};

export const getSchedulesByCourseId = (id) => {
  return httpClient.get(`/schedules/course/${id}`);
};

export const getSchedulesByScheduleId = (id) => {
  return httpClient.get(`schedules/${id}/students`);
};
