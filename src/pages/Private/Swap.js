import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { RiExchangeBoxLine } from "react-icons/ri";
import { useSnackbar } from "notistack";
import swapimg from "../../swap.png";
const Swap = () => {
  const { Moralis, enableWeb3, user } = useMoralis();
  const { enqueueSnackbar } = useSnackbar();
  const [balance, setBalance] = useState();
  const [tokens, setTokens] = useState([]);
  const [formData, setFormData] = useState({
    fromToken: "",
    toToken: "",
    amount: "",
  });

  const eth = "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619";
  const usdt = "0xc2132d05d31c914a87c6611c10748aeb04b58e8f";
  const matic = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

  const swap = async (from, to, amount, useradd) => {
    // const NATIVE_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
    // const ONEINCH_ADDRESS = "0x111111111117dc0aa78b770fa6a738034120c302";
    try {
      await Moralis.enableWeb3();
      await Moralis.initPlugins();
      let dex = Moralis.Plugins.oneInch;
      const options = {
        chain: "polygon",
        fromTokenAddress: from,
        toTokenAddress: to,
        amount: Number(Moralis.Units.ETH(amount)),
        fromAddress: useradd,
        slippage: 1,
      };

      console.log("options", options);

      var receipt = await dex.swap(options);
      return receipt;
    } catch (err) {
      console.log("err", err);
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const { fromToken, toToken, amount } = formData;
    console.log("fromToken", formData);
    if (fromToken === "" || toToken === "" || amount === "") {
      enqueueSnackbar("Please fill all the fields", {
        variant: "error",
        autoHideDuration: 1500,
      });
      return;
    }

    if (fromToken === "ETH" && toToken === "USDT") {
      const res = await swap(eth, usdt, amount, user.get("ethAddress"));
      console.log("res", res);
    } else if (fromToken === "ETH" && toToken === "MATIC") {
      const res = await swap(eth, matic, amount, user.get("ethAddress"));
      console.log("res", res);
    } else if (fromToken === "USDT" && toToken === "ETH") {
      const res = await swap(usdt, eth, amount, user.get("ethAddress"));
      console.log("res", res);
    } else if (fromToken === "USDT" && toToken === "MATIC") {
      const res = await swap(usdt, matic, amount, user.get("ethAddress"));
      console.log("res", res);
    } else if (fromToken === "MATIC" && toToken === "ETH") {
      const res = await swap(matic, eth, amount, user.get("ethAddress"));
      console.log("res", res);
    } else if (fromToken === "MATIC" && toToken === "USDT") {
      const res = await swap(matic, usdt, amount, user.get("ethAddress"));
      console.log("res", res);
    }
  };

  useEffect(async () => {
    const balance = await Moralis.Web3API.account.getNativeBalance();
    setBalance(balance.balance);
    // console.log("balance", balance);
  }, []);

  return (
    <div className="px-3 py-4 ">
      <h1 className="md:text-3xl text-2xl font-semibold text-center">
        Swapping on Polygon
      </h1>
      <h2 className="text-center text-lg font-medium">
        (Available on Mainnet)
      </h2>
      <div className="flex justify-center w-full mt-8">
        <div className="md:w-1/2 w-full cl-div2 rounded shadow p-3">
          <form onSubmit={formSubmit}>
            <div className="flex justify-between">
              <label className="text-lg font-semibold text-white">
                Select Tokens
              </label>
              <label className="text-lg font-semibold text-white">
                Balance : {balance}
              </label>
            </div>

            <div className="flex justify-between mt-3 items-center">
              <select
                onChange={(e) =>
                  setFormData({ ...formData, fromToken: e.target.value })
                }
                className="focus:outline-none w-44 focus:shadow-outline py-2 rounded text-lg px-2"
              >
                <option disabled selected>
                  Select
                </option>
                <option>ETH</option>
                <option>MATIC</option>
                <option>USDT</option>
              </select>
              <div className="text-4xl text-white">
                <RiExchangeBoxLine />
              </div>
              <select
                onChange={(e) =>
                  setFormData({ ...formData, toToken: e.target.value })
                }
                className="focus:outline-none w-44 focus:shadow-outline py-2 rounded text-lg px-2"
              >
                <option disabled selected>
                  Select
                </option>
                <option>ETH</option>
                <option>MATIC</option>
                <option>USDT</option>
              </select>
            </div>
            <div className="flex justify-center mt-4">
              <input
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                placeholder="No of Tokens"
                className="w-full rounded px-3 py-2 text-lg focus:outline-none "
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="cl-div rounded shadow  w-24 py-2 text-white font-semibold text-lg "
              >
                Swap
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Swap;
