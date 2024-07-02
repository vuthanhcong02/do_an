import httpClient from "../utils/axiosCustom";

export const getEvents = (page) => {
  return httpClient.get("/events?page=" + page);
};

export const getEventsByFeatured = () => {
  return httpClient.get("/events/featured");
};

export const getEventsOrderById = () => {
  return httpClient.get(`/events/order-by-id`);
};

export const getEventsById = (id) => {
  return httpClient.get(`/events/${id}`);
};

export const deleteEvent = (id) => {
  return httpClient.delete(`/events/${id}`);
};
