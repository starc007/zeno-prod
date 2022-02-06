import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { lendToken } from "../../api/payment";
import payapi from "../../components/Payment.json";
import { ethers } from "ethers";
import { useSnackbar } from "notistack";
import Loader from "../../components/Loader";
import zenoapi from "../../components/Zeno.json";
const Lend = () => {
  const { user } = useMoralis();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    EthTokens: "",
    days: "",
    timePeriod: "",
  });

  const SendZenoToken = async (userad, amount) => {
    const contAddress = "0xA1dfaf198897B1AED863EA858b5742F3d270eCC8";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contAddress, zenoapi.abi, signer);
    try {
      console.log(amount, userad);
      const deposit = await contract.transferTo(
        userad,
        ethers.utils.parseEther(amount)
      );
      await deposit.wait();
      return true;
    } catch (err) {
      console.log("send token", err);
    }
  };

  const LendUserToken = async (ethToken) => {
    const contAddress = "0x30A16396e7e9D7B0778A2B6d4e0e0C938B950375";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contAddress, payapi.abi, signer);
    try {
      const deposit = await contract.depositInContract({
        value: ethers.utils.parseEther(ethToken),
      });
      await deposit.wait();
      return true;
    } catch (err) {
      console.log("err lend", err);
    }
  };

  const submitLend = async (e) => {
    e.preventDefault();
    const { EthTokens, days, timePeriod } = formData;
    setLoading(true);
    const res = await LendUserToken(EthTokens);
    if (res === true) {
      const response = await lendToken({
        EthTokens,
        days,
        timePeriod,
        userAddress: user.get("ethAddress"),
      });
      const rest = await SendZenoToken(user.get("ethAddress"), EthTokens);
      enqueueSnackbar("Lend Token Successfully", {
        variant: "success",
        autoHideDuration: 1500,
      });
      setLoading(false);
    }
    setFormData({
      EthTokens: "",
      days: "",
      timePeriod: "",
    });
  };

  return (
    <div className="px-3 py-3 w-full">
      <h1 className="md:text-3xl text-2xl font-semibold text-center">
        Lend your Eth Tokens and Earn Zeno Coins
      </h1>
      <h3 className="text-center text-xl font-semibold text-purple-700">
        On Lending your tokens you will get Zeno Tokens
      </h3>
      <div className="w-full flex justify-center mt-8">
        <div className=" md:w-1/2 w-full cl-div2 px-3 py-4 rounded shadow">
          <form onSubmit={submitLend}>
            <div className="mt-3">
              <label className="text-white font-semibold">
                No of ETH Token
              </label>
              <input
                type="number"
                required
                value={formData.EthTokens}
                onChange={(e) =>
                  setFormData({ ...formData, EthTokens: e.target.value })
                }
                placeholder="eg. 500"
                className="w-full mt-2 rounded px-3 py-1 focus:outline-none focus:ring-2 ring-blue"
              />
            </div>

            <div className="mt-3">
              <label className="text-white font-semibold">Time Period</label>
              <div className="flex">
                <input
                  type="number"
                  required
                  value={formData.days}
                  onChange={(e) =>
                    setFormData({ ...formData, days: e.target.value })
                  }
                  placeholder="eg. 2"
                  className="w-full  mt-2  px-3 py-1 focus:outline-none focus:ring-2 ring-blue"
                />
                <select
                  //   value={formData.timePeriod}
                  onChange={(e) =>
                    setFormData({ ...formData, timePeriod: e.target.value })
                  }
                  className="w-full  mt-2  px-3 py-1 focus:outline-none focus:ring-2 ring-blue"
                >
                  <option>Days</option>
                  <option>Weeks</option>
                  <option>Months</option>
                  <option>Years</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="cl-div rounded shadow  w-24 py-2 text-white font-semibold text-lg "
              >
                {loading ? <Loader size="sm" /> : "Lend"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Lend;
