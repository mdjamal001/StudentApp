export const getCurrentDateInfo = () => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const today = new Date();

  const day = weekdays[today.getDay()];
  const year = today.getFullYear();
  const month = months[today.getMonth()];
  const date = today.getDate();
  const hour = today.getHours();
  const minute = today.getMinutes();

  return { day, date, month, year, hour, minute };
};
