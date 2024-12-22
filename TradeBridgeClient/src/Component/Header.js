import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-success text-white p-3 d-flex justify-content-between align-items-center">
      <div className="logo text-center"><Link to='/' className="btn btn-success text-white mr-3">Trade Bridge</Link></div>
      <div className="nav-options d-flex">
        <Link to='/' className="btn btn-success text-white  mr-3 ">Home</Link>
        <Link to='/login' className="btn btn-success text-white mr-3">Login</Link>
        <Link to='/signup' className="btn btn-success text-white">Signup</Link>
  
      </div>
    </header>
  );
};

export default Header;
