export const getSummary = (content) => {
  const maxLength = 200;
  if (content.length <= maxLength) {
    return content;
  } else {
    return content.substring(0, maxLength) + "...";
  }
};
