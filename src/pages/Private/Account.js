import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { Table } from "react-bootstrap";
import { useSnackbar } from "notistack";
import { getLendDetails, removeLend } from "../../api/payment";
import Loader from "../../components/Loader";
import payapi from "../../components/Payment.json";
import { ethers } from "ethers";
const Account = () => {
  const { user } = useMoralis();
  const [data, setData] = useState([]);
  const [useradd, setUserAdd] = useState();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [wloading, setWLoading] = useState(false);

  setTimeout(() => {
    setUserAdd(user?.get("ethAddress"));
  }, 1000);

  const getLend = async () => {
    setLoading(true);
    const res = await getLendDetails(useradd);
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    getLend();
    return () => {
      setData([]);
    };
  }, [useradd]);

  const WithdrawTokens = async (id, amount) => {
    setWLoading(true);
    const contAddress = "0x30A16396e7e9D7B0778A2B6d4e0e0C938B950375";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contAddress, payapi.abi, signer);
    // let contractBalance = await contract.getContractBal();
    try {
      let pay = await contract.pay(
        user.get("ethAddress"),
        ethers.utils.parseEther(amount.toString())
      );
      await pay.wait();
      await removeLend(id);
      enqueueSnackbar("Withdrawal Successfull!! Maje karo", {
        variant: "success",
        autoHideDuration: 2000,
      });
      setWLoading(false);
      getLend();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="md:px-3 px-0 py-4">
      <p className="text-center text-3xl font-semibold">Account Details</p>
      <div className=" flex flex-col items-center w-full mt-4">
        <div className="h-44 w-44 rounded-full shadow-sm">
          <img
            src={`https://avatars.dicebear.com/api/personas/${user?.get(
              "ethAddress"
            )}.svg`}
            className="h-full w-full rounded-full"
          />
        </div>
        <div className="mt-3 mx-2 w-full md:w-2/5">
          <p className="md:text-base text-sm w-full overflow-hidden text-white rounded-lg shadow font-semibold  px-2 py-1 cl-div2 ">
            {user?.get("ethAddress")}
          </p>
        </div>
      </div>
      <div className="mt-4 px-3">
        <p className="text-xl font-semibold">Lend Money </p>
        <p className="text-sm text-gray-500 -mt-2">
          Zeno Contract Address : 0xA1dfaf198897B1AED863EA858b5742F3d270eCC8
        </p>
        <div>
          {loading ? (
            <Loader />
          ) : data.length > 0 ? (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th className="text-center pt-2">No of Tokens</th>
                  <th className="text-center pt-2">Time Period</th>
                  <th className="text-center pt-2">withdraw</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item._id}>
                    <td className="text-center pt-2">{item.EthTokens}</td>
                    <td className="text-center pt-2">
                      {item.days} {item.timePeriod}
                    </td>
                    <td className="text-center pt-2">
                      <button
                        disabled={wloading}
                        onClick={() => WithdrawTokens(item._id, item.EthTokens)}
                        className="px-2 w-28 py-1 cl-div2 rounded shadow text-white"
                      >
                        withdraw
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center text-xl font-smebold mt-4 text-purple-700">
              No Lending Token Found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
