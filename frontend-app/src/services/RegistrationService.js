import httpClient from "../utils/axiosCustom";

export const getRegistrations = () => {
  return httpClient.get("/registrations");
};

export const createRegistration = (data) => {
  return httpClient.post("/registrations", data);
};
