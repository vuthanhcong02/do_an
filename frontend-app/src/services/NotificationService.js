import httpClient from "../utils/axiosCustom";

export const getNotifications = (page) => {
  return httpClient.get("/notifications?page=" + page);
};

export const getNotificationById = (id) => {
  return httpClient.get(`/notifications/${id}`);
};

export const createNotification = (data) => {
  return httpClient.post("/notifications", data);
};

export const updateNotification = (id, data) => {
  return httpClient.put(`/notifications/${id}`, data);
};

export const deleteNotification = (id) => {
  return httpClient.delete(`/notifications/${id}`);
};
