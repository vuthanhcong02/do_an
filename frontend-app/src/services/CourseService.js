import httpClient from "../utils/axiosCustom";

export const getCourses = () => {
  return httpClient.get("/courses");
};

export const getCourseOrderById = () => {
  return httpClient.get("/courses/order-by-id");
};

export const getCourseById = (id) => {
  return httpClient.get(`/courses/${id}`);
};
export const getCourseByFeatured = () => {
  return httpClient.get("/courses/featured");
};

export const deleteCourse = (id) => {
  return httpClient.delete(`/courses/${id}`);
};
