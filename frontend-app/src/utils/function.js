export const getSummary = (content) => {
  const maxLength = 300;
  if (content.length <= maxLength) {
    return content;
  } else {
    return content.substring(0, maxLength) + "...";
  }
};
export const getContent = (content) => {
  const maxLength = 50;
  if (content.length <= maxLength) {
    return content;
  } else {
    return content.substring(0, maxLength) + "...";
  }
};
export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
