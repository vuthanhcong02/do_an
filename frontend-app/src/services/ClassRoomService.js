import httpClient from "../utils/axiosCustom";

export const getClassRooms = () => {
  return httpClient.get("/classrooms");
};

export const getClassRoomById = (id) => {
  return httpClient.get(`/classrooms/${id}`);
};

export const deleteClassRoom = (id) => {
  return httpClient.delete(`/classrooms/${id}`);
};

export const makeClassRoom = (data) => {
  return httpClient.post("/classrooms", data);
};

export const updateClassRoom = (id, data) => {
  return httpClient.put(`/classrooms/${id}`, data);
};
