import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <p>
        If you don't have an account yet, please <Link to="/register" className="decorate">register here</Link>.
      </p>
    </div>
  );
};

export default LandingPage;
