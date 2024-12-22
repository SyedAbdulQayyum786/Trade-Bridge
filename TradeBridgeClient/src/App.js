import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import Aboutus from "./Component/Aboutus";
import Signup from "./Component/Signup";
import "./App.css";
import AddGig from "./Component/AddGig";
import FindShipper from "./Component/FindShipper";
import FindSeller from "./Component/FindSeller";
import UserHome from "./Component/UserHome";
import InitiateTrade from "./Component/InitiateTrade";
import ShipmentDetails from "./Component/ShipmentDetails";
import NotFound from "./Component/NotFound";
import AdminHome from "./Component/AdminHome";
import AdminOrCategory from "./Component/AdminOrCategory";
import ViewSeller from "./Component/ViewSeller";
import ViewShipper from "./Component/ViewShipper";
import ShipperHome from "./Component/ShipperHome";
import UserGig from "./Component/UserGig";
import { useSelector } from "react-redux";
import RequestStatus from "./Component/RequestsStatus";
import ManageShipments from "./Component/ManageShipments";
import Chatbox from "./Component/Chatbox";
import AdminRequest from "./Component/AdminRequest";
import Messages from "./Component/Messages";

function App() {
  const login = useSelector((state) => state.login.login); 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Aboutus />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {login && <Route path="/addgig" element={<AddGig />} />}
        {login && <Route path="/findshipper" element={<FindShipper />} />}
        {login && <Route path="/findseller" element={<FindSeller />} />}
        {login && <Route path="/userhome" element={<UserHome />} />}
        {login && <Route path='/initiate' element ={<InitiateTrade/>}/>}
        {login && <Route path='/shipment' element ={<ShipmentDetails/>}/>}
        {login && <Route path='/adminhome' element={<AdminHome/>}/>}
        {login && <Route path='/adminorcategory' element={<AdminOrCategory/>}/>}
        {login && <Route path='/viewseller' element={<ViewSeller/>}/>}       
        {login && <Route path='/viewshipper' element={<ViewShipper/>}/>}
        {login && <Route path='/usergig' element={<UserGig/>}/>}
        {login && <Route path='/shipperhome' element={<ShipperHome/>}/>  }    
        {login && <Route path='/status' element={<RequestStatus/>}/>}      
        {login && <Route path='/manage' element={<ManageShipments/>}/>}      
        {login && <Route path='/messages/:id' element={<Chatbox/>}/>}  
        {login && <Route path='/adminRequest' element={<AdminRequest/>}/>} 
        {login && <Route path='/messages' element={<Messages/>}/>} 
        <Route path='*' element ={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
