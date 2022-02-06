import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import logo from "../logo.png";
const Header = () => {
  const { authenticate, isAuthenticated, user, logout } = useMoralis();
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("moralis-user", user.id);
    }
  }, [isAuthenticated]);

  const Signout = () => {
    logout();
    localStorage.removeItem("moralis-user");
  };

  return (
    <div className=" w-full  z-20 fixed">
      <div className="flex justify-between h-full items-center px-4">
        <div>
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            className={
              isAuthenticated
                ? "text-3xl font-bold text-black"
                : "text-3xl font-bold text-white"
            }
          >
            <img src={logo} alt="logo" className="h-24" />
          </Link>
        </div>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center">
              <img
                src={`https://avatars.dicebear.com/api/personas/${user?.get(
                  "ethAddress"
                )}.svg`}
                className="h-10 w-10 rounded-full shadow mr-2"
              />
              <button
                onClick={() => Signout()}
                className="px-3 py-2 ml-2 border border-black text-sm rounded-lg text-white cl-div2 font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => authenticate()}
              className="px-3 py-2 bg-purple-700 text-sm rounded-lg  text-white font-semibold"
            >
              Connect Your Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
