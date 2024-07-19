import React from "react";
import { useSendLogoutMutation } from "./../features/auth/authApiSlice";
import "./SideBar.css";

const Header = () => {
  const [sendLogout] = useSendLogoutMutation();

  const handleLogout = async () => {
    try {
      await sendLogout().unwrap();
      console.log("Logged out successfully");
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>Notes App</h1>
      </div>
      <div className="header-right">
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
