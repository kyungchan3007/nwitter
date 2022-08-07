import React from "react";
import { Link } from "react-router-dom";
const Navigation = ({ userObject }) => {
  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
        <li>
          <Link to="/profile">{userObject.displayName} 의 My Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
