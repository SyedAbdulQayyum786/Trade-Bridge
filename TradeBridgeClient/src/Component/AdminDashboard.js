import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../Store/Slices/LoginSlice";
import {useDispatch,useSelector} from 'react-redux'

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const logedinUser=useSelector(state=>state.login.user)
  const handleLogout=(e)=>{
    e.preventDefault()
    dispatch(userLogout())
    navigate('/')

  }
  return (
    <>
      <nav className="col-md-3 col-lg-2 d-md-block bg-success sidebar">
        <div className="h-100 d-flex flex-column align-items-center">
          
          <div className="user-info-section text-center">
            <img
              src={logedinUser.image}
              className="rounded-circle img-fluid profile-image mb-2"
              alt={"Profile"}
            />
            
          </div>
            <span>Welcome Admin</span>
         
          <ul className="nav flex-column navigation-links p-3 align-items-center">
            <li className="nav-item bg-success">
              <Link to='/adminhome' className="btn btn-success text-white  mr-3 ">Home</Link>
            </li>
            <li className="nav-item bg-success">
              <Link to='/adminRequest' className="btn btn-success text-white mr-3">Pending Requests</Link>
            </li>
            <li className="nav-item bg-success">
              <Link to='/adminorcategory' className="btn btn-success text-white mr-3">Add Category OR Product</Link>
            </li>
          
          </ul>
         
          <div onClick={handleLogout}className="logout-button bottom-logout-button">Logout</div>
        </div>
      </nav>
    </>
  );
}
