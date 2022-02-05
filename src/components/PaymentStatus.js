import React, { useEffect, useState } from "react";
import { grabStatus } from "../api/payment";
import { useParams, useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import payapi from "./Payment.json";
import { ethers } from "ethers";
import axios from "axios";

const PaymentStatus = () => {
  let navigate = useNavigate();
  // const { user } = useMoralis();
  const [values, setValues] = useState({
    amount: "",
    error: "",
  });
  const [coin, setCoin] = useState();

  // const contAddress = "0xCc80B1ca37962799bCce090A6Ff5569cAFF6880D";
  // const provider = new ethers.providers.Web3Provider(window.ethereum);

  // const signer = provider.getSigner();
  // const contract = new ethers.Contract(contAddress, payapi.abi, signer);
  // let contractBalance = await contract.getContractBal();
  // // console.log(
  //   `Payment contract balance: ${hre.ethers.utils.formatEther(
  //     contractBalance
  //   )}` + " ETH"
  // );

  const fetchLivePrice = async () => {
    try {
      const liveUrl =
        "https://api.wazirx.com/sapi/v1/ticker/24hr?symbol=maticinr";
      const response = await axios.get(liveUrl);
      const { data } = response;
      return data.lastPrice;
    } catch (err) {
      console.log(err);
    }
  };

  const params = useParams();
  useEffect(() => {
    getPaymentStatus(params.paymentId);
  }, [params.paymentId]);

  const { amount, error } = values;

  const getPaymentStatus = async (paymentId) => {
    const maticPrice = await fetchLivePrice();
    const result = await grabStatus(paymentId);
    if (result) {
      let value = result.amount / 100 / maticPrice;
      value = value.toFixed(3);
      setCoin(value);
    }
    setValues({ ...values, error: "", amount: result.amount });
    setTimeout(() => {
      navigate("/transactions/history");
    }, 3000);
  };

  // console.log("price", price);
  console.log("coin", coin);
  return (
    <div className="flex justify-center items-center mt-24 text-white">
      {error && <h1 style={{ color: "red" }}>{error}</h1>}
      {amount > 0 && (
        <div className="cl-div2 px-4 py-6 rounded-lg ">
          <p className=" text-xl">
            Your order of rs {amount / 100} is successfull
          </p>
        </div>
      )}
      {!error && !amount && <p className="text-lg">Loading...</p>}
    </div>
  );
};

export default PaymentStatus;
