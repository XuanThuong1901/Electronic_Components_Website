const formatDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Hàm để định dạng giờ phút
const formatTime = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleTimeString("vi-VN");
};
  
  export {formatDate, formatTime}