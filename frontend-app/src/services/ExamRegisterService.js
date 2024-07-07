import httpClient from "../utils/axiosCustom";

export const getExamRegisters = (page) => {
  return httpClient.get("/exam-registers?page=" + page);
};

export const createExamRegister = (data) => {
  return httpClient.post("/exam-registers", data);
};

export const getExamRegisterByUserId = () => {
  return httpClient.get("/exam-registers/get-registrations-by-user");
};

export const getExamRegisterById = (id) => {
  return httpClient.get("/exam-registers/" + id);
};

export const deleteExamRegister = (id) => {
  return httpClient.delete("/exam-registers/" + id);
};
