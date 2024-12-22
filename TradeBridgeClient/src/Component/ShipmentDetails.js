import React, { useEffect, useRef, useState } from "react";
import { BsCardList } from "react-icons/bs";
import UserDashboard from "./UserDashboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
export default function () {
  const logedUser = useSelector((state) => state.login.user);
  const [shippers, setShippers] = useState([]);
  const selectedShipper = useRef();
  const invoice = useRef();
  const details = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/showshippers", {
        params: { username: logedUser.username },
      })
      .then((res) => {
        if (res.status === 202) {
          setShippers(res.data.shippers);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching shippers:", err);
      });
  }, [logedUser.username]);

  const bookShipper = () => {
    if (!selectedShipper.current.value || !invoice.current.files[0]) {
      alert("All fields except description are required.");
      return;
    }

    const formData = new FormData();
    formData.append("shipperId", selectedShipper.current.value);
    formData.append("invoice", invoice.current.files[0]);
    formData.append("details", details.current.value);
    formData.append("traderId", logedUser._id);

    axios
      .post("http://localhost:8080/shipper/bookshipper", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("Shipment booked successfully!");
          navigate("/userhome");
        } else {
          alert("Failed to book shipment");
        }
      })
      .catch((err) => {
        console.error("Error booking shipment:", err);
        alert("Error booking shipment");
      });
  };
  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };
  return (
    <div className="userhome">
      <UserDashboard />
      <div className="container-fluid scroll">
        <div className="seller-to-shipper-booking">
          <div className="container-fluid">
          <button
                  type="button"
                  className="btn btn-link mb-3"
                  onClick={handleBackClick}
                  style={{color:"green"}}
                >
                  <FaArrowLeft /> Back
                </button>
            <header className="text-center mb-4">
              <h2 className="display-4">Book Shipment with Shipper</h2>
              <p className="lead">
                Provide shipment details to book with a shipper
              </p>
            </header>
            <div className="row justify-content-center align-items-center">
              <div className="col-md-6">
                <div className="card" style={{ border: "4px solid #000000" }}>
                  <div className="card-body">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="selectShipper" className="form-label">
                          Select Shipper
                        </label>
                        <select
                          style={{ border: "3px solid #000000" }}
                          className="form-select"
                          id="selectShipper"
                          name="selectShipper"
                          ref={selectedShipper}
                          required
                        >
                          <option value="">Select Shipper</option>
                          {shippers.map((shipper) => (
                            <option key={shipper._id} value={shipper._id}>
                              {shipper.companyName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="invoiceFile" className="form-label">
                          <BsCardList className="me-2" /> Invoice File
                        </label>
                        <input
                          style={{ border: "3px solid #000000" }}
                          type="file"
                          className="form-control"
                          id="invoiceFile"
                          name="invoiceFile"
                          accept=".pdf, .doc, .docx"
                          ref={invoice}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="shipmentDetails"
                          className="form-label"
                        >
                          <BsCardList className="me-2" /> Shipment Details
                        </label>
                        <textarea
                          style={{ border: "3px solid #000000" }}
                          className="form-control"
                          id="shipmentDetails"
                          name="shipmentDetails"
                          ref={details}
                          required
                        />
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={bookShipper}
                        >
                          Book Shipment
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
