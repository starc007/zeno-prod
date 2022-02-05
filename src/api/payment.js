import axios from "axios";
const url = "http://localhost:5000/api/v1";
// const url = "https://boil-server.vercel.app/api";

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

// export const subscription = async (data) => {
//   const response = await axios.post(`${url}/subs/subscription`, data);
//   return response.data;
// };

// export const getSubsDetails = async (userId) => {
//   try {
//     const response = await axios.get(`${url}/subs/subscription/${userId}`);
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };
