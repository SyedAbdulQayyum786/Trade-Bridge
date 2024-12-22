import React, { useEffect, useState } from "react";
import UserDashboard from "./UserDashboard";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
export default function ShipperHome() {
  const [requests, setRequests] = useState([]);
  const logedUser = useSelector((state) => state.login.user);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:8080/shipper/requests", {
          params: { id: logedUser._id, find: "t", status: "all" },
        })
        .then((res) => {
          if (res.status === 200) {
            setRequests(res.data.requests);
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.error("Error fetching requests:", err);
        });
    } catch (error) {
      alert("Error in useEffect:");
    }
  }, [logedUser._id]);

  const getStatusLabel = (status) => {
    switch (status.toLowerCase()) {
      case "p":
        return "Pending";
      case "a":
        return "Approved";
      case "d":
        return "Rejected";
      case "s":
        return "Send To Government";
      case "c":
        return "Paid";
      case "u":
        return "Payment pending";
      case "f":
        return "Shipment Completed";
      default:
        return "";
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "p":
        return "text-warning";
      case "a":
        return "text-success";
      case "d":
        return "text-danger";
      case "s":
        return "text-primary";
      case "c":
        return "text-info";
      case "f":
        return "text-info";
      case "u":
        return "text-secondary";
      default:
        return "";
    }
  };
  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="userhome">
      <UserDashboard />
      <div>
        <button
          type="button"
          className="btn btn-link mb-3"
          onClick={handleBackClick}
          style={{ color: "green" }}
        >
          <FaArrowLeft /> Back
        </button>
      </div>
      <div className="container-fluid center-content">
        <div className="center-icons">
          <div className="messageDisplay mb-3 text-center">
            <p
              className="text-black font-weight-bold blink-me"
              style={{ fontSize: "24px", width: "550px", height: "50px" }}
            >
              Requests
            </p>
          </div>
          <div className="row">
            <div className="col">
              <div className="table-responsive">
                <table
                  className="table table-bordered table-hover"
                  style={{
                    minWidth: "600px",
                    width: "100%",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead className="bg-success text-white">
                    <tr>
                      <th
                        className="text-center"
                        style={{
                          border: "2px solid black",
                          padding: "8px",
                          backgroundColor: "#28a745",
                          color: "white",
                        }}
                      >
                        Receiver
                      </th>
                      <th
                        className="text-center"
                        style={{
                          border: "2px solid black",
                          padding: "8px",
                          backgroundColor: "#28a745",
                          color: "white",
                        }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request, index) => (
                      <tr key={index}>
                        <td
                          style={{ border: "2px solid black", padding: "8px" }}
                        >
                          {request.shipperId.companyName}
                        </td>
                        <td
                          className={`text-uppercase ${getStatusColor(
                            request.status
                          )}`}
                          style={{
                            border: "2px solid black",
                            padding: "8px",
                            fontWeight: "bold",
                          }}
                        >
                          {getStatusLabel(request.status)}
                          {request.status === "u" && ` $${request.amount}`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
