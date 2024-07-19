import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";
import Header from "./Header";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/dash/main">Home</Link>
          </li>
          <li>
            <Link to="/dash/newnote">Add note</Link>
          </li>
          <li>
            <Link to="/dash/archive">archive</Link>
          </li>
          <li>
            <Link to="/dash/trash">Trash</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
