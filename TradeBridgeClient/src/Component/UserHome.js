// UserHome.jsx

import React from "react";
import UserDashboard from "./UserDashboard";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
export default function UserHome() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };
  return (
    <div className="userhome">
      <div>
        <UserDashboard />
      </div>
      
      <div>
      <button
                  type="button"
                  className="btn btn-link mb-3"
                  onClick={handleBackClick}
                  style={{color:"green"}}
                >
                  <FaArrowLeft /> Back
                </button>

      </div>
      <div className="container-fluid  center-content">
        <div className="center-icons">
          <h2>Welcome to User Dashboard</h2>
          
          <div className="icon-container">
          <Link to='/findseller'style={{color:"black"}}>
            <div className="icon">
              <i className="bi bi-search"></i> 
              <p>Find Seller</p>
            </div>
          </Link>

          <Link to='/findshipper' style={{color:"black"}}>
            <div className="icon">
              <i className="bi bi-search"></i>
              <p>Find Shipper</p>
            </div>
          </Link>
            <Link to='/addgig' style={{color:"black"}}>
            <div className="icon">
              <i className="bi bi-plus-circle"></i>
              <p>Add Gig</p>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
