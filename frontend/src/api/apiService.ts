import axios from "axios";

// const API_BASE_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://vercel"
//     : "http://localhost:5001";

const API_BASE_URL = "http://localhost:5001";
export const fetchUser = async () => {
  return (await axios.get(`${API_BASE_URL}/user`)).data;
};

export const fetchCards = async () => {
  return (await axios.get(`${API_BASE_URL}/cards`)).data;
};

export const fetchTransactions = async () => {
  return (await axios.get(`${API_BASE_URL}/transactions`)).data;
};

export const fetchCharts = async () => {
  return (await axios.get(`${API_BASE_URL}/charts`)).data;
};
