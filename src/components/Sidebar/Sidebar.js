import React from "react";
import { NavLink } from "react-router-dom";
// import { SiCodeproject } from "react-icons/si";
import { MdPayment, MdManageAccounts } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import "./Sidebar.css";

export const MobileMenu = () => {
  return (
    <div className="mobile w-full  flex justify-center">
      <NavLink
        to="/dashboard"
        className={(navData) =>
          navData.isActive
            ? "cl-div flex items-center rounded-lg pl-3 pr-1 py-2"
            : "flex items-center pl-3 pr-1 py-2"
        }
      >
        <MdPayment className="mr-2" size={28} />
      </NavLink>
      <NavLink
        to="/transactions/history"
        className={(navData) =>
          navData.isActive
            ? "cl-div flex items-center rounded-lg pl-3 pr-1 py-2"
            : "flex items-center pl-3 pr-1 py-2"
        }
      >
        <AiOutlineTransaction className="mr-2" size={28} />
      </NavLink>

      <NavLink
        to="/account"
        className={(navData) =>
          navData.isActive
            ? "cl-div flex items-center rounded-lg pl-3 pr-1 py-2"
            : "flex items-center pl-3 pr-1 py-2"
        }
      >
        <MdManageAccounts className="mr-2" size={28} />
      </NavLink>
    </div>
  );
};

export const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <NavLink
          style={{ textDecoration: "none" }}
          to="/dashboard"
          className={(navData) =>
            navData.isActive
              ? "cl-div flex items-center rounded-lg py-2 px-4"
              : "flex items-center py-2 px-4"
          }
        >
          <MdPayment className="mr-2" size={25} />
          <span>Payment</span>
        </NavLink>
        <NavLink
          style={{ textDecoration: "none" }}
          to="/transactions/history"
          className={(navData) =>
            navData.isActive
              ? "cl-div flex items-center rounded-lg py-2 px-4"
              : "flex items-center py-2 px-4"
          }
        >
          <AiOutlineTransaction className="mr-2" size={25} />
          <span>Transactions</span>
        </NavLink>
        <NavLink
          style={{ textDecoration: "none" }}
          to="/account"
          className={(navData) =>
            navData.isActive
              ? "cl-div flex items-center rounded-lg py-2 px-4"
              : "flex items-center py-2 px-4"
          }
        >
          <MdManageAccounts className="mr-2" size={25} />
          <span>Account</span>
        </NavLink>
      </div>
    </div>
  );
};
