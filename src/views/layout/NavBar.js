import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const navBar = (props) => {
  return (
    <Navbar className="nav-main" collapseOnSelect expand="lg" variant="dark">
      <Navbar.Brand href="/">
        <a className="navbar-brand" href="/">
          <img src="resortzy.png" alt="resortzy logo" />
        </a>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav> </Nav>
        <Nav className="mr-sm-2">
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
            <Link className="nav-menuitem" to="/" onClick={props.handleLogout}>
              Logout
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default navBar;
