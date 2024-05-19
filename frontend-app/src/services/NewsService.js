import httpClient from "../utils/axiosCustom";

export const getNews = () => {
  return httpClient.get("/news");
};

export const getNewByFeatured = () => {
  return httpClient.get("/news/featured");
};

export const getNewsOrderById = () => {
  return httpClient.get(`/news/order-by-id`);
};
