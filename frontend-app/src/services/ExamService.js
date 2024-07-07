import httpClient from "../utils/axiosCustom";

export const getExams = (page) => {
  return httpClient.get("/exams?page=" + page);
};

export const createExam = (data) => {
  return httpClient.post("/exams", data);
};

export const getExamById = (id) => {
  return httpClient.get(`/exams/${id}`);
};

export const updateExam = (id, data) => {
  return httpClient.put(`/exams/${id}`, data);
};

export const deleteExam = (id) => {
  return httpClient.delete(`/exams/${id}`);
};

export const getExamActive = () => {
  return httpClient.get("/exams/active");
};
