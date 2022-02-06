import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Table } from "react-bootstrap";
import { getTransactionDetails } from "../../api/payment";
import Loader from "../../components/Loader";
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
    <div className="mt-4 md:mx-4 mx-0">
      <h1 className="text-center font-semibold md:text-4xl text-2xl">
        Transaction History
      </h1>

      {loading ? (
        <div className="flex justify-center mt-20">
          <Loader />
        </div>
      ) : details.length > 0 ? (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className="text-center pt-2">Order ID</th>
              <th className="text-center pt-2">Reciever Address</th>
              <th className="text-center pt-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {details?.map((item) => (
              <tr key={item._id}>
                <td className="text-center pt-2">{item.order_id}</td>
                <td className="text-center pt-2">
                  {item.receiverWalletAddress}
                </td>
                <td className="text-center pt-2">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center mt-20">No Transaction Found</p>
      )}
    </div>
  );
};

export default Transaction;
