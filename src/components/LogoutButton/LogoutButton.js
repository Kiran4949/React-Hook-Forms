import React from "react";
import { useNavigate } from "react-router-dom";
import './style.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear saved data in local storage
    localStorage.clear();
    // Then redirect the user to the login page
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
