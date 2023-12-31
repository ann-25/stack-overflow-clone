import React from "react";
import "./LeftSidebar.css";
import { NavLink } from "react-router-dom";
import Globe from "../../assets/Globe.png";

const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <nav className="side-navbar">
        <NavLink to="/" className="side-nav-link" activeclassname="active">
          <p>Home</p>
        </NavLink>

        <div className="side-nav-div">
          <div>
            <p>PUBLIC</p>
          </div>

          <NavLink to="/Questions" className="side-nav-link">
            <img src={Globe} alt="Globe" />
            <p style={{ paddingLeft: "20px" }}>Questions</p>
          </NavLink>

          <NavLink
            to="/Tags"
            className="side-nav-link"
            activeclassname="active"
            style={{ paddingLeft: "40px" }}
          >
            <p>Tags</p>
          </NavLink>

          <NavLink
            to="/Users"
            className="side-nav-link"
            activeclassname="active"
            style={{ paddingLeft: "40px" }}
          >
            <p>Users</p>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
