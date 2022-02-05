import React from "react";
import { useMoralis } from "react-moralis";
import { Navigate } from "react-router-dom";
import Header from "../../components/Header";

const Home = () => {
  const { isAuthenticated } = useMoralis();
  return (
    <div className="">
      {isAuthenticated ? <Navigate to="/dashboard" /> : null}
      <Header />

      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="absolute top-28 w-full p-2">
        <div className="text-center">
          <p className="text-5xl md:text-7xl font-semibold text-white">
            A new payment system, only for backhodi!!
          </p>
        </div>
        <div className="flex justify-center my-4">
          <button
            onClick={() => {
              console.log("clicked");
            }}
            className="cl-div  py-4 px-6 text-white rounded-lg font-medium text-lg"
          >
            Login to Start Paying thru FIAT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
