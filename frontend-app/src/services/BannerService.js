import httpClient from "../utils/axiosCustom";

export const getBanners = (page) => {
  return httpClient.get("/banners?page=" + page);
};

export const createBanner = (data) => {
  return httpClient.post("/banners", data);
};

export const getBannersOrderByPosition = () => {
  return httpClient.get("/banners/order-by-position");
};

export const showBanner = (id) => {
  return httpClient.get(`/banners/${id}`);
};

export const deleteBanner = (id) => {
  return httpClient.delete(`/banners/${id}`);
};
