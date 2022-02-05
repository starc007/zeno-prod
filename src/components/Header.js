import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";

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
    <div className="h-16 cl-div w-full  z-20 fixed">
      <div className="flex justify-between h-full items-center md:px-24 px-2">
        <div>
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            className="text-3xl font-bold text-white"
          >
            Zeno
          </Link>
        </div>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center">
              <p className="text-white px-2 py-1 border rounded-lg w-44 truncate ">
                <span className="font-semibold">{user.get("ethAddress")}</span>
              </p>
              <button
                onClick={() => Signout()}
                className="px-3 py-2 ml-2 border text-xs rounded-lg text-white font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => authenticate()}
              className="px-3 py-2 border text-sm rounded-lg text-white font-semibold"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
