import httpClient from "../utils/axiosCustom";

export const getRegistrations = () => {
  return httpClient.get("/registrations");
};

export const createRegistration = (data) => {
  return httpClient.post("/registrations", data);
};

export const getRegistrationByUser = () => {
  httpClient.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token");
  return httpClient.get("/registrations/get-registrations-by-user");
};
