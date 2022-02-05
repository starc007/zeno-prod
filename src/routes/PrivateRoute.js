import React from "react";
import { useMoralis } from "react-moralis";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useMoralis();
  const currentUser = localStorage.getItem("moralis-user");
  const isAuth = currentUser ? true : false;
  // console.log("isAuthenticated", isAuthenticated);
  return isAuthenticated || isAuth ? children : <Navigate to="/" />;
};

export default PrivateRoute;
