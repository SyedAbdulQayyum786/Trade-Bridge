// UserHome.jsx

import React from "react";
import AdminDashboard from "./AdminDashboard";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
export default function AdminHome() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };
  return (
    <div className="userhome">
      <div>
        <AdminDashboard />
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
          <h2>Welcome to Admin Dashboard</h2>
          
          <div className="icon-container">
          <Link to='/viewseller'style={{color:"black"}}>
            <div className="icon">
              <i className="bi bi-search"></i> 
              <p>View Seller</p>
            </div>
          </Link>

          <Link to='/viewshipper' style={{color:"black"}}>
            <div className="icon">
              <i className="bi bi-search"></i>
              <p>View Shipper</p>
            </div>
          </Link>
            <Link to='' style={{color:"black"}}>
            <div className="icon">
              <i className="bi bi-search"></i>
              <p>View Shipments</p>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
