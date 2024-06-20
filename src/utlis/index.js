import axios from "axios";

export const fetchApiData = async (url) => {
  let token = JSON.parse(localStorage.getItem("accessToken"));
  const headers = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const response = await axios.get(url, headers);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createApiData = async (url, data) => {
  let token = JSON.parse(localStorage.getItem("accessToken"));
  const headers = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const response = await axios.post(url, data, headers);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const updateApiData = async (url, data) => {
  let token = JSON.parse(localStorage.getItem("accessToken"));

  const headers = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const response = await axios.put(url, data, headers);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteApiData = async (url) => {
  let token = JSON.parse(localStorage.getItem("accessToken"));
  const headers = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  try {
    const response = await axios.delete(url , headers);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export function currentDate(dateString) {
    const date = new Date(dateString);
  
    // Get day of the week
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[date.getDay()];
  
    // Get day
    const day = date.getDate();
  
    // Get month
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
    const month = months[date.getMonth()];
  
    // Get year
    const year = date.getFullYear();
  
    // Get hours and minutes
    let hours = date.getHours();
    const minutes = ("0" + date.getMinutes()).slice(-2); // Add leading zero if minutes < 10
  
    // Determine AM or PM
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
  
    return `${hours}.${minutes} ${amOrPm}. ${day} ${month}, ${year}, `;
  }