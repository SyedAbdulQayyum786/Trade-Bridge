import React, { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const ViewSeller = () =>  {
  const logedinUser = useSelector((state) => state.login.user);
  const [sellers, setSellers] = useState([]);
  useEffect(() => {
    console.log(logedinUser);
    axios
      .get("http://localhost:8080/user/showsellers", {
        params: { username: logedinUser.username },
      })
      .then((res) => {
        if (res.status === 202) {
          setSellers(res.data.sellers);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {});
  }, []);
  return (
    <div className="userhome">
      <AdminDashboard />
      <div className="scroll">
        <div className="row ms-3 me-0 p-3 justify-content-between">
          {sellers.map((seller) => {
            return (
              <div  className="col-md-3 mb-4">
                <div className="card" style={{ height: "400px" }}>
                  <img
                    src={seller.image}
                    className="card-img-top"
                    alt="Product"
                    style={{ objectFit: "contain", height: "200px" }}
                  />
                  <div
                    className="card-body"
                    style={{
                      maxHeight: "150",
                      overflowY: "auto",
                      height: "150px",
                    }}
                  >
                    <h5 className="card-title" style={{ fontWeight: 'bold' }}>{seller.companyName}</h5>
                    <p className="card-text">{seller.companyDescription}</p>
                  </div>
                  <div className="card-footer">
                    <div className="card-body">
                    <Link
                      to={`/usergig?seller=${seller._id}`} 
                    className="btn btn-success"
                    >
                    View
                    </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewSeller;
