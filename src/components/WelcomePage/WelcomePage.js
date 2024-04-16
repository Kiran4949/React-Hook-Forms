import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";

const WelcomePage = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Retrieve username from local storage
    const storedData = JSON.parse(localStorage.getItem("formData"));
    if (storedData) {
      setUsername(storedData.username);
    }
  }, []);

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <Link to="/contact-us" className="decorate">Contact Us</Link> <br />
      <br />
      <Link to="/change-password" className="decorate">Change Password</Link> <br />
      <br />
      <LogoutButton />
    </div>
  );
};

export default WelcomePage;
