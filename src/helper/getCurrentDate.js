export default () => {
  const today = new Date();
  const day = today.getDate();
  const dayString = day < 10 ? `0${String(day)}` : String(day);
  const month = today.getMonth() + 1;
  const monthString = month < 10 ? `0${String(month)}` : String(month);
  const year = String(today.getFullYear());
  return year + monthString + dayString;
};
