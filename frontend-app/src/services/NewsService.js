import httpClient from "../utils/axiosCustom";

export const getNews = (page) => {
  return httpClient.get("/news?page=" + page);
};

export const getNewByFeatured = () => {
  return httpClient.get("/news/featured");
};

export const getNewsOrderById = () => {
  return httpClient.get(`/news/order-by-id`);
};

export const createNews = (data) => {
  return httpClient.post("/news", data);
};

export const getNewsById = (id) => {
  return httpClient.get(`/news/${id}`);
};

export const deleteNews = (id) => {
  return httpClient.delete(`/news/${id}`);
};
