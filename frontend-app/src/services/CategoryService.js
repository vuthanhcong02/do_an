import httpClient from "../utils/axiosCustom";

export const getCategories = (page) => {
  return httpClient.get("/categories?page=" + page);
};

export const createCategory = (data) => {
  return httpClient.post("/categories", data);
};

export const showCategory = (id) => {
  return httpClient.get(`/categories/${id}`);
};

export const updateCategory = (id, data) => {
  return httpClient.put(`/categories/${id}`, data);
};

export const deleteCategory = (id) => {
  return httpClient.delete(`/categories/${id}`);
};
