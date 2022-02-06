import React, { useEffect, useState } from "react";
import { grabStatus } from "../api/payment";
import { useParams, useNavigate } from "react-router-dom";
import payapi from "./Payment.json";
import { ethers } from "ethers";
import axios from "axios";

const PaymentStatus = () => {
  let navigate = useNavigate();
  const [values, setValues] = useState({
    amount: "",
    error: "",
  });
  const [coin, setCoin] = useState();

  const getBal = async (add, amt) => {
    const contAddress = "0x30A16396e7e9D7B0778A2B6d4e0e0C938B950375";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contAddress, payapi.abi, signer);
    // let contractBalance = await contract.getContractBal();
    console.log(add, amt);
    try {
      let pay = await contract.pay(add, ethers.utils.parseEther(amt));
      await pay.wait();
      console.log("payment done");
    } catch (err) {
      console.log(err);
    }
  };

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
    getPaymentStatus(params.paymentId, params.recAddress);
  }, [params.paymentId]);

  const { amount, error } = values;

  const getPaymentStatus = async (paymentId, recAddress) => {
    const maticPrice = await fetchLivePrice();
    const result = await grabStatus(paymentId);
    if (result) {
      let value = result.amount / 100 / maticPrice;
      value = value.toFixed(3);
      try {
        console.log("value", value);
        await getBal(recAddress, value);
        setValues({ ...values, error: "", amount: result.amount });
      } catch (err) {
        console.log("err", err);
      }
      setCoin(value);
    }

    setTimeout(() => {
      navigate("/transactions/history");
    }, 3000);
  };

  // console.log("price", price);
  console.log("coin", coin);
  return (
    <div className="flex justify-center items-center mt-24">
      {error && <h1 style={{ color: "red" }}>{error}</h1>}
      {amount > 0 && (
        <div className="cl-div2 px-4 py-6 rounded-lg ">
          <p className="text-white text-xl">
            Your order of rs {amount / 100} is successfull
          </p>
        </div>
      )}
      {!error && !amount && <p className="text-lg text-black">Loading...</p>}
    </div>
  );
};

export default PaymentStatus;
