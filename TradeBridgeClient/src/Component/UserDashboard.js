import React from "react";
import logo from "./logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../Store/Slices/LoginSlice";
import { useDispatch, useSelector } from "react-redux";
export default function UserDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logedinUser = useSelector((state) => state.login.user);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userLogout());
    navigate("/");
  };
  return (
    <>
      <nav className="col-md-3 col-lg-2 d-md-block bg-success sidebar">
        <div className="h-100 d-flex flex-column align-items-center">
          {/* User Info Section */}
          <div className="user-info-section text-center">
            <img
              src={logedinUser.image}
              className="rounded-circle img-fluid profile-image mb-2"
              alt={"Profile"}
            />
          </div>
          <span>Welcome {logedinUser.companyName}</span>
          {/* Navigation Links */}
          <ul className="nav flex-column navigation-links p-3 align-items-center">
            <li className="nav-item bg-success">
              <Link
                to="/userhome"
                className="btn btn-success text-white  mr-3 "
              >
                Home
              </Link>
            </li>
            <li className="nav-item bg-success">
              <Link to="/initiate" className="btn btn-success text-white mr-3">
                Initiate Trade
              </Link>
            </li>
            <li className="nav-item bg-success">
              <Link to="/shipment" className="btn btn-success text-white mr-3">
                Book Shipper
              </Link>
            </li>
            <li className="nav-item bg-success">
              <Link to="/status" className="btn btn-success text-white mr-3">
                See Requests
              </Link>
            </li>
            <li className="nav-item bg-success">
              <Link to="/Messages" className="btn btn-success text-white mr-3">
                Messages
              </Link>
            </li>
          </ul>
          {/* Logout Button */}
          <div
            onClick={handleLogout}
            className="logout-button bottom-logout-button"
          >
            Logout
          </div>
        </div>
      </nav>
    </>
  );
}
