import React, { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import { useSelector } from "react-redux";
import axios from "axios";
export default function ViewShipper() {
  const logedinUser = useSelector((state) => state.login.user);
  const [shippers, setShippers] = useState([]);
  useEffect(() => {
    console.log(logedinUser);
    axios
      .get("http://localhost:8080/user/showshippers", {
        params: { username: logedinUser.username },
      })
      .then((res) => {
        if (res.status === 202) {
          setShippers(res.data.shippers);
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
          {shippers.map((shipper) => {
            return (
              <div  className="col-md-3 mb-4">
                <div className="card" style={{ height: "400px" }}>
                  <img
                    src={shipper.image}
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
                    <h5 className="card-title" style={{ fontWeight: 'bold' }}>{shipper.companyName}</h5>
                    <p className="card-text">{shipper.companyDescription}</p>
                  </div>
                  <div className="card-footer">
                    <div className="card-body">
                      <a href="#" className="btn btn-primary">
                        view
                      </a>
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
}
