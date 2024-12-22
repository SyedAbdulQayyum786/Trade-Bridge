import React, { useEffect, useState ,useRef} from "react";
import ShipperDashboard from "./ShipperDashboard";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
export default function ManageShipments() {
  const [requests, setRequests] = useState([]);
  const logedUser = useSelector((state) => state.login.user);
  const [action, setAction] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({});
  const service=useRef()
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/shipper/managerequests", {
        params: { id: logedUser._id, find: "s", status: "a" },
      })
      .then((res) => {
        if (res.status === 200) {
          setRequests(res.data.requests);
          setAction(!action);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching requests:", err);
      });
  }, [action]);

  const viewDocument = (docLink) => {
    window.open(docLink, "_blank");
  };

  const handleStatusChange = (requestId, newStatus) => {
    setSelectedStatus((prevStatus) => ({
      ...prevStatus,
      [requestId]: newStatus,
    }));
  };

  const saveStatus = (requestId) => {
    const newStatus = selectedStatus[requestId];
    if (!newStatus) {
      alert("Please select a status before saving.");
      return;
    }

    axios
      .patch(`http://localhost:8080/shipper/updatestatus/${requestId}`, {
        status: newStatus,
      })
      .then((res) => {
        if (res.status === 200) {
          alert("Status updated successfully");
          setAction(!action); // Trigger useEffect to refresh the data
        } else {
          alert("Error updating status:", res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error updating status:", err);
      });
  };

  const sendToGovernment = (requestId, shipperId, docLink, details) => {
    axios
      .post("http://localhost:8080/shipper/senddocs", {
        shipperId: shipperId,
        docLink: docLink,
        details: details,
      })
      .then((res) => {
        if (res.status === 200) {
          axios
            .patch(`http://localhost:8080/shipper/markasSent/${requestId}`)
            .then((res) => {
              if (res.status === 200) {
                alert("Request sent to Government successfully");
                setAction(!action); // Trigger useEffect to refresh the data
              } else {
                alert("Error marking request as sent:", res.data.message);
              }
            })
            .catch((err) => {
              console.error("Error marking request as sent:", err);
            });
        } else {
          alert("Error sending request to Government:", res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error sending request to Government:", err);
      });
  };
  const AddService = async (id, amt) => {
    const serviceValue = parseInt(service.current.value);
    
    // Validate service value
    if (isNaN(serviceValue) || serviceValue <= 0) {
      alert("Please enter a valid service charge greater than 0.");
      return;
    }
  
    let amount = amt + serviceValue; // Using parsed serviceValue
    
    try {
      const res = await axios.patch(`http://localhost:8080/shipper/addservice/${id}`, {
        amount: amount
      });
  
      if (res.status === 200) {
        alert("Amount updated successfully");
        service.current.value = ''; // Clear input field after successful update
        setAction(!action); // Assuming action is a state variable to trigger re-render or update
      } else {
        alert("Failed to update amount");
      }
    } catch (error) {
      console.error("Error updating amount:", error);
      alert("Internal server error");
    }
  };
  
  return (
    <div className="userhome">
      <ShipperDashboard />
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
              className="text-danger font-weight-bold blink-me"
              style={{ fontSize: "24px", width: "550px", height: "50px" }}
            >
              Manage Shipments
            </p>
          </div>
          <div className="row">
            <div className="col">
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="bg-success text-white">
                    <tr>
                      <th className="text-center">Sender</th>
                      <th className="text-center">Actions</th>
                      <th className="text-center">Update Status</th>
                      <th className="text-center">Save</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request, index) => (
                      <tr key={index}>
                        <td>{request.traderId.companyName}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-primary me-2"
                            onClick={() => viewDocument(request.docLink)}
                          >
                            View
                          </button>
                          {request.status === "a" && (
                            <button
                              className="btn btn-success"
                              onClick={() =>
                                sendToGovernment(
                                  request._id,
                                  request.shipperId,
                                  request.docLink,
                                  request.details
                                )
                              }
                            >
                              Send to Government
                            </button>
                          )}
                          {request.status === "s" && (
                            <button className="btn btn-success" disabled>
                              Already Sent
                            </button>
                          )}
                          {request.status === "c" && (
                            <button className="btn btn-success" disabled>
                              Waiting for delivery
                            </button>
                          )}
                          {request.status === "u" && (
                            <div>
                              <button className="btn btn-danger" disabled>
                                Unpaid: ${request.amount}
                              </button>
                              <div className="mt-2">
                                <label htmlFor="serviceCharges">
                                  Enter Service Charges:
                                </label>
                                <input
                                  type="number"
                                  id="serviceCharges"
                                  name="serviceCharges"
                                  ref={service}
                                />
                                <button
                                  className="btn btn-primary mt-2"
                                  onClick={()=>{AddService(request._id,request.amount)}}
                                >
                                  Add Service Charges
                                </button>
                              </div>
                            </div>
                          )}
                          {request.status === "f" && (
                            <button className="btn btn-secondary" disabled>
                              Shipment completed
                            </button>
                          )}
                        </td>
                        <td className="text-center">
                          {request.status !== "f" ? (
                            <select
                              value={selectedStatus[request._id] || ""}
                              onChange={(e) =>
                                handleStatusChange(request._id, e.target.value)
                              }
                            >
                              <option value="">Select Status</option>
                              <option value="f">Completed</option>
                              <option value="c">Paid</option>

                            </select>
                          ) : (
                            "Completed"
                          )}
                        </td>
                        <td className="text-center">
                          {request.status !== "f" ? (
                            <button
                              className="btn btn-warning"
                              onClick={() => saveStatus(request._id)}
                            >
                              Save
                            </button>
                          ) : (
                            "N/A"
                          )}
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
