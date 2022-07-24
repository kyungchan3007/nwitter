import React from "react";
import { Link } from "react-router-dom";
const Navigation = () => {
  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
        <li>
          <Link to="/profile">My Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
