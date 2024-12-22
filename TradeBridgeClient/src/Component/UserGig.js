import React, { useState, useEffect } from "react";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

const UserGig = () => {
  const logedinUser = useSelector((state) => state.login.user);
  const [gigs, setGigs] = useState([]);
  const [sellerid, setsellerid] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [sellername, setsellername] = useState("");
  const [selleremail, setselleremail] = useState("");
  const [sellerphonenumber, setsellerphonenumber] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sellerId = searchParams.get("seller");
    setsellerid(sellerId);
    fetchGigs(sellerId);
    const sellername = searchParams.get("sellername");
    setsellername(sellername);
    const selleremail = searchParams.get("selleremail");
    setselleremail(selleremail);
    const sellerphonenumber = searchParams.get("sellerphonenumber");
    setsellerphonenumber(sellerphonenumber);
  }, [location]);

  const fetchGigs = async (sellerId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/gig/showgigs?sellerId=${sellerId}`
      );
      setGigs(response.data.gigs);
    } catch (error) {
      console.error("Error fetching gigs:", error);
    }
  };

  const startChat = (e) => {
    e.preventDefault();
    navigate(`/messages/${sellerid}`);
  };

  const bookGig = (
    sellername,
    productName,
    productCategory,
    productDescription
  ) => {
    navigate(
      `/initiate?sellername=${encodeURIComponent(
        sellername
      )}&selleremail=${encodeURIComponent(
        selleremail
      )}&sellerphonenumber=${encodeURIComponent(
        sellerphonenumber
      )}&productName=${encodeURIComponent(
        productName
      )}&productCategory=${encodeURIComponent(
        productCategory
      )}&productDescription=${encodeURIComponent(productDescription)}`
    );
  };

  return (
    <div className="userhome">
      {logedinUser.username === "admin" ? (
        <AdminDashboard />
      ) : (
        <UserDashboard />
      )}
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {gigs.map((gig) => (
            <div className="col" key={gig._id}>
              <div className="card h-100">
                <img
                  src={gig.image}
                  className="card-img-top"
                  alt="Gig"
                  style={{ objectFit: "contain", height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{gig.product}</h5>
                  <p className="card-text">Category: {gig.category}</p>
                  <p className="card-text">{gig.description}</p>
                  <p className="card-text text-end">
                    <span className="text-success fw-bold fs-5">
                      Starting Price: Rs{gig.price}
                    </span>
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      style={{ border: "none", background: "none" }}
                      onClick={startChat}
                    >
                      <Link
                        to="/messages"
                        className="btn btn-primary"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Start Chat
                      </Link>
                    </button>
                    <button
                      style={{ border: "none", background: "none" }}
                      onClick={() =>
                        bookGig(
                          sellername,
                          gig.product,
                          gig.category,
                          gig.description
                        )
                      }
                    >
                      <span className="btn btn-danger">Book Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserGig;
