import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../../components/Header";
import { MobileMenu, Sidebar } from "../../components/Sidebar/Sidebar";
const Dashboard = () => {
  return (
    <div className="bg-black h-screen">
      <div className="h-16">
        <Header />
      </div>

      <div className="w-full mb-8 md:mb-4 flex w-auto mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
        <div className="flex w-auto">
          <div className="sidebar-menu">
            <Sidebar />
          </div>
          <div className="mobile-menu cl-div z-20">
            <MobileMenu />
          </div>
        </div>
        <div className=" w-full p-3 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
