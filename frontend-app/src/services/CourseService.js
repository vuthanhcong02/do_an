import httpClient from "../utils/axiosCustom";

export const getCourse = () => {
  return httpClient.get("/courses");
};

export const getCourseOrderById = () => {
  return httpClient.get("/courses/order-by-id");
};

export const getCourseByFeatured = () => {
  return httpClient.get("/courses/featured");
};
