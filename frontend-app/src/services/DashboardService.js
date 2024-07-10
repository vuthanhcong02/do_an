import httpClient from "../utils/axiosCustom";

export const getCountCourses = () => {
  return httpClient.get("/dashboard/get-count-courses");
};

export const getCountNews = () => {
  return httpClient.get("/dashboard/get-count-news");
};

export const getCountEvents = () => {
  return httpClient.get("/dashboard/get-count-events");
};

export const getCountContacts = () => {
  return httpClient.get("/dashboard/get-count-contacts");
};

export const getCountExams = () => {
  return httpClient.get("/dashboard/get-count-exams");
};

export const getCountRegistrationsWithStatusSuccess = () => {
  return httpClient.get(
    "/dashboard/get-count-registrations-with-status-success"
  );
};

export const getCountRegistrationsWithStatusPending = () => {
  return httpClient.get(
    "/dashboard/get-count-registrations-with-status-pending"
  );
};

export const getTotalPriceRegistrationsWithStatusSuccess = () => {
  return httpClient.get(
    "/dashboard/get-total-price-registrations-with-status-success"
  );
};

export const getCountExamRegistrationsWithStatusSuccess = () => {
  return httpClient.get(
    "/dashboard/get-count-exam-registrations-with-status-success"
  );
};

export const getCountExamRegistrationsWithStatusPending = () => {
  return httpClient.get(
    "/dashboard/get-count-exam-registrations-with-status-pending"
  );
};

export const getTotalFeeExamRegistrationsWithStatusSuccess = () => {
  return httpClient.get(
    "/dashboard/get-total-price-exam-registrations-with-status-success"
  );
};
