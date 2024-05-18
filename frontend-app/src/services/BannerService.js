import httpClient from "../utils/axiosCustom";

export const getBanners = () => {
  return httpClient.get("/banners");
};

export const createBanner = (data) => {
  return httpClient.post("/banners", data);
};

export const getBannersOrderByPosition = () => {
  return httpClient.get("/banners/order-by-position");
};
