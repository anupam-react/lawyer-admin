import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";


const Layout = () => {
  return (
    <div className="flex">
      <div className="w-2/12">
        <Sidebar />
      </div>
      <div className="w-10/12">
        <Header />
        <div className="mt-10 mr-5 ml-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
