import axios from "axios";
// const url = "http://localhost:5000/api/v1";
const url = "https://zenoprod.herokuapp.com/api/v1";

export const getTransactionDetails = async (user) => {
  const res = await axios.get(`${url}/payment/details/${user}`);
  return res.data;
};

export const getOrder = async (amount, walletAddress, useradd) => {
  const response = await axios.post(`${url}/subs/payment`, {
    amount,
    walletAddress,
    useradd,
  });
  return response.data;
};

export const grabStatus = async (paymentId) => {
  const res = await axios.get(`${url}/payments/${paymentId}`);
  return res.data;
};

export const lendToken = async (data) => {
  const response = await axios.post(`${url}/lend/token`, data);
  return response.data;
};

export const getLendDetails = async (user) => {
  const response = await axios.get(`${url}/lend/details/${user}`);
  return response.data;
};

export const removeLend = async (id) => {
  const response = await axios.delete(`${url}/lend/${id}`);
  return response.data;
};
