import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const navBar = (props) => {
  return (
    <div className="main-nav-menu">
      <Navbar className="nav-main p2" collapseOnSelect expand="lg">
        {/* variant="dark" */}
        <Navbar.Brand href="/">
          <div className="container-fluid">
            <img src="resortzy.png" alt="resortzy logo" />
            <div>
              <h3 id="nav-title">Resortzy </h3>
              <h4 id="slogan">Made for comforts</h4>
            </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav ">
          <Nav className="ml-auto">
            {props.authenticated && (
              <Link className="nav-menuitem" to="/home">
                Home
              </Link>
            )}
            {props.authenticated && (
              <Link className="nav-menuitem" to="/editprofile">
                Edit Profile
              </Link>
            )}

            {props.authenticated && props.user.userrole === "manager" && (
              <Link className="nav-menuitem" to="/manager">
                Cottages
              </Link>
            )}
            {props.authenticated && props.user.userrole === "manager" && (
              <Link className="nav-menuitem" to="/manager/checkout">
                check Out
              </Link>
            )}
            {props.authenticated && props.user.userrole === "customer" && (
              <Link className="nav-menuitem" to="/my-bookings">
                My Bookings
              </Link>
            )}
            {!props.authenticated && (
              <Link className="nav-menuitem" to="/login">
                Login
              </Link>
            )}
            {!props.authenticated && (
              <Link className="nav-menuitem" to="/signup">
                Signup
              </Link>
            )}
            {props.authenticated && (
              <Link
                className="nav-menuitem"
                to="/"
                onClick={props.handleLogout}
              >
                Logout
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default navBar;
