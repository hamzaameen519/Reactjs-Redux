import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleButton } from "../../reducers/authReducer";
const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;
  console.log("location......", pathname);
  const { toggle } = useSelector((state) => state.user);
  console.log("hideShow...", toggle);
  const [active, setActive] = useState();
  const handleClose = () => {
    dispatch(toggleButton(false));
    // setActive(false);
  };
  return (
    // {active ?}
    <nav
      className={`sidebar sidebar-offcanvas ${
        active || toggle ? "active" : ""
      }`}
      id="sidebar"
    >
      <ul className="nav ">
        <li
          className={`nav-item ${
            pathname == "/admin/dashboard" ? `active ` : ""
          } `}
          onClick={() => handleClose()}
        >
          <Link className="nav-link " to="/admin/dashboard">
            <i className="icon-grid menu-icon"></i>
            <span className="menu-title">Dashboard</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            pathname == "/admin/categories" ? "active" : ""
          } `}
          onClick={() => handleClose()}
        >
          <Link className="nav-link" to="/admin/categories">
            <i className="icon-paper menu-icon"></i>
            <span className="menu-title">Categories</span>
          </Link>
        </li>
        <li
          className={`nav-item ${
            pathname == "/admin/products" ? "active" : ""
          } `}
          onClick={() => handleClose()}
        >
          <Link className="nav-link" to="/admin/products">
            <i className="icon-layout menu-icon"></i>
            <span className="menu-title">Products</span>
          </Link>
        </li>
        <li
          className={`nav-item ${pathname == "/admin/orders" ? "active" : ""} `}
          onClick={() => handleClose()}
        >
          <Link className="nav-link" to="/admin/orders">
            <i className="icon-columns menu-icon"></i>
            <span className="menu-title">Orders</span>
          </Link>
        </li>
        {/* <li
          className={`nav-item ${
            pathname == "/admin/transactions" ? "active" : ""
          } `}
        >
          <Link className="nav-link" to="/admin/transactions">
            <i className="icon-bar-graph menu-icon"></i>
            <span className="menu-title">Transactions</span>
            <i className="menu-arrow"></i> 
          </Link>
        </li>*/}
        <li
          className={`nav-item ${
            pathname == "/admin/profile" ? "active" : ""
          } `}
          onClick={() => handleClose()}
        >
          <Link className="nav-link" to="/admin/profile">
            <i className="icon-grid-2 menu-icon"></i>
            <span className="menu-title">Profile</span>
          </Link>
        </li>
        {/* <li className={`nav-item ${pathname == "#" ? "active" : ""} `}>
          <Link className="nav-link" to="#">
            <i className="icon-contract menu-icon"></i>
            <span className="menu-title">Restaurant</span>
          </Link>
        </li>*/}
        <li
          className={`nav-item ${
            pathname == "/admin/Challenges" ? "active" : ""
          } `}
          onClick={() => handleClose()}
        >
          <Link className="nav-link" to="/admin/Challenges">
            <i class="fa fa-tasks menu-icon" aria-hidden="true"></i>
            <span className="menu-title">Challenges</span>
          </Link>
        </li>
        <li
          className={`nav-item ${pathname == "/admin/users" ? "active" : ""} `}
          onClick={() => handleClose()}
        >
          <Link className="nav-link" to="/admin/users">
            <i className="icon-head menu-icon"></i>
            <span className="menu-title">Users</span>
          </Link>
        </li>

        <li
          className={`nav-item ${pathname == "/logout" ? "active" : ""} `}
          onClick={() => handleClose()}
        >
          <Link className="nav-link" to="/logout">
            <i className="icon-paper menu-icon"></i>
            <span className="menu-title">Logout</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
