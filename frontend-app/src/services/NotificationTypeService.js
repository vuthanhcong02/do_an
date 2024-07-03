import httpClient from "../utils/axiosCustom";

export const getNotificationTypes = (page) => {
  return httpClient.get("/notification-types?page=" + page);
};

export const getNotificationTypeById = (id) => {
  return httpClient.get(`/notification-types/${id}`);
};

export const createNotificationType = (data) => {
  return httpClient.post("/notification-types", data);
};

export const updateNotificationType = (id, data) => {
  return httpClient.put(`/notification-types/${id}`, data);
};

export const deleteNotificationType = (id) => {
  return httpClient.delete(`/notification-types/${id}`);
};
