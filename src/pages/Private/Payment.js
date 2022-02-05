import React, { useState } from "react";
import { getOrder } from "../../api/payment";
import { useMoralis } from "react-moralis";
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

// const __DEV__ = document.domain === "localhost";

const Payment = () => {
  const [formData, setFormData] = useState({
    address: "",
    amount: "",
  });

  const hanldePay = (e) => {
    e.preventDefault();
    if (formData.amount == 0) {
      alert("Amount should not be zero");
      return;
    }
    displayRazorpay();
  };

  const { user } = useMoralis();

  const displayRazorpay = async () => {
    const apikey = "rzp_test_G85KIKvRNJHNhu";
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    console.log("user", user.get("ethAddress"));

    const dat = await getOrder(
      formData.amount,
      formData.address,
      user.get("ethAddress")
    );
    console.log("dta pro", dat);
    const options = {
      key: apikey,

      amount: dat.amount.toString(),
      currency: "INR",
      order_id: dat.id,
      name: "Payment",
      description: "Make Payment",
      callback_url: "http://localhost:5000/api/v1/payment/callback",
      redirect: true,
      handler: function (response) {
        console.log(response);
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="w-full">
      <div className="flex justify-center mt-24">
        <div className="cl-div2 rounded shadow md:w-1/2 w-full px-4 py-5">
          <form onSubmit={hanldePay}>
            <div>
              <label className="text-white font-medium">Sender's Address</label>
              <input
                type="text"
                value={formData.address}
                required
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                placeholder="eg. 0x3318d69069846380cee4a1c390b65dcf2c7a592e"
                className="w-full border-1 border-black mt-2 rounded px-3 py-1 focus:outline-none focus:ring-2 ring-blue"
              />
            </div>
            <div className="mt-3">
              <label className="text-white font-medium">Amount</label>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                placeholder="eg. 500"
                className="w-full border-1 border-black mt-2 rounded px-3 py-1 focus:outline-none focus:ring-2 ring-blue"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="cl-div2 rounded shadow  w-28 py-2 text-white font-medium "
              >
                Pay
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
