import React from "react";
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const DashLayout = () => {
  return (
    <div>
      <Header />
      <div className="dash">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default DashLayout;
