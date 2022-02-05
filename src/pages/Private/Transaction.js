import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { getTransactionDetails } from "../../api/payment";

const Transaction = () => {
  const [details, setDetails] = useState([]);
  const [useradd, setUserAdd] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useMoralis();

  const getTransaction = async () => {
    setLoading(true);
    const res = await getTransactionDetails(user?.get("ethAddress"));
    setDetails(res);
    setLoading(false);
  };

  useEffect(() => {
    getTransaction();
    return () => {
      setDetails([]);
    };
  }, [useradd]);

  setTimeout(() => {
    setUserAdd(user?.get("ethAddress"));
  }, 2000);

  return (
    <div className="text-white mt-4 md:mx-4 mx-0">
      <h1 className="text-center font-semibold md:text-4xl text-2xl">
        Transaction History
      </h1>

      {loading ? (
        <p className="text-center text-white text-xl font-medium pt-24">
          Loading...
        </p>
      ) : (
        <div className="flex flex-col border  rounded mt-4">
          <div className="flex justify-around border-b py-2 font-medium text-sm md:text-xl">
            <label>Order ID</label>
            <label>Reciever Address</label>
            <label>Amount</label>
          </div>
          {details?.map((item) => (
            <div key={item._id} className="w-full py-2">
              <div className="flex justify-around text-xs md:text-lg">
                <label>{item.order_id}</label>
                <label>{item.receiverWalletAddress}</label>
                <label>{item.amount}</label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transaction;
