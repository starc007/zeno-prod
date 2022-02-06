import React from "react";
import { useMoralis } from "react-moralis";
import { Navigate } from "react-router-dom";
import Feature from "../../components/Feature";
import Header from "../../components/Header";
import polygon from "../../polygon.png";
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
        <div className="flex justify-center py-16">
          <p className="text-5xl md:text-7xl font-bold text-center">
            FIAT to Crypto all on Polygon
          </p>
        </div>
        <Feature />
      </div>
    </div>
  );
};

export default Home;
