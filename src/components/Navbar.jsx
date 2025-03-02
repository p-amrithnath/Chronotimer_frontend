import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.clear();
  };

  const currentUserRole = localStorage.getItem("role");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          <i className="fa fa-clock mr-2"></i>Chronotimer
        </NavLink>
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home{" "}
              </NavLink>
            </li>
            {currentUserRole === "ADMIN" &&(
            <><li className="nav-item">
                <NavLink className="nav-link" to="/team">
                  Teams
                </NavLink>
              </li><li className="nav-item">
                  <NavLink className="nav-link" to="/Project">
                    Projects
                  </NavLink>
                </li></>
             )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/calender">
                Timesheets
              </NavLink>
            </li>
          </ul>
          <div className="buttons text-center">
            <NavLink to="/profile" className="btn btn-outline-dark m-2">
              <i className="fa fa-user mr-1"></i> Profile
            </NavLink>
            <NavLink
              to="/"
              className="btn btn-outline-dark m-2"
              onClick={handleLogout}
            >
              <i className="fa fa-sign-in-alt mr-1"></i> Logout
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
