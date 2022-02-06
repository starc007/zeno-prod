import React from "react";
import { GiTakeMyMoney, GiReceiveMoney } from "react-icons/gi";
import { RiExchangeBoxLine } from "react-icons/ri";
const Feature = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          <span className="relative inline-block">
            <svg
              viewBox="0 0 52 24"
              fill="currentColor"
              className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
            >
              <defs>
                <pattern
                  id="df31b9f6-a505-42f8-af91-d2b7c3218e5c"
                  x="0"
                  y="0"
                  width=".135"
                  height=".30"
                >
                  <circle cx="1" cy="1" r=".7" />
                </pattern>
              </defs>
              <rect
                fill="url(#df31b9f6-a505-42f8-af91-d2b7c3218e5c)"
                width="52"
                height="24"
              />
            </svg>
          </span>
          <span className="sm:text-5xl">Swap, Lend, Buy </span>all on ploygon
          with the lowest gas fees
        </h2>
      </div>
      <div className="grid gap-8 row-gap-8 lg:grid-cols-3">
        <div className="sm:text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <GiReceiveMoney size={40} />
          </div>
          <h6 className="mb-2 font-semibold text-lg leading-5">Pay/Buy</h6>
          <p className="max-w-md mb-3 text-gray-900 sm:mx-auto">
            Pay/Buy Crypto with the lowest gas fees using FIAT
          </p>
        </div>
        <div className="sm:text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <GiTakeMyMoney size={40} />
          </div>
          <h6 className="mb-2 font-semibold text-lg leading-5">Lend</h6>
          <p className="max-w-md mb-3  text-gray-900 sm:mx-auto">
            Earn interest over the token with ease
          </p>
        </div>
        <div className="sm:text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
            <RiExchangeBoxLine size={40} />
          </div>
          <h6 className="mb-2 font-semibold text-lg leading-5">Swap</h6>
          <p className="max-w-md mb-3 text-gray-900 sm:mx-auto">
            Swap your Polygon, Ethereum, USDT on the decentralised crypto
            trading platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
