import httpClient from "../utils/axiosCustom";

export const getExamSchedules = (page) => {
  return httpClient.get("/exam-schedules?page=" + page);
};

export const createExamSchedule = (data) => {
  return httpClient.post("/exam-schedules", data);
};

export const updateExamSchedule = (id, data) => {
  return httpClient.put(`/exam-schedules/${id}`, data);
};

export const deleteExamSchedule = (id) => {
  return httpClient.delete(`/exam-schedules/${id}`);
};

export const getExamScheduleById = (id) => {
  return httpClient.get(`/exam-schedules/${id}`);
};
