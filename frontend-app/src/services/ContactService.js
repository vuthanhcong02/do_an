import httpClient from "../utils/axiosCustom";

export const getContacts = (page) => {
  return httpClient.get("/contacts?page=" + page);
};

export const getContactById = (id) => {
  return httpClient.get(`/contacts/${id}`);
};

export const deleteContact = (id) => {
  return httpClient.delete(`/contacts/${id}`);
};

export const createContact = (data) => {
  return httpClient.post("/contacts", data);
};
