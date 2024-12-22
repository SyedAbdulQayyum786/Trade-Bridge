import React, { useEffect, useState } from "react";
import ShipperDashboard from "./ShipperDashboard";
import UserDashboard from "./UserDashboard";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function ShipperMessages() {
  const logedUser = useSelector((state) => state.login.user);
  const [senders, setSenders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSenders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/messages/showlist/${logedUser._id}`
        );
        if (response.status === 200) {
          setSenders(response.data);
        } else {
          console.error("Error fetching messages:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching messages:", error.message);
      }
    };

    fetchSenders();
  }, [logedUser._id]);
  // Ensure useEffect runs when logedUser._id changes

  const startConversation = (senderId) => {
    navigate(`/messages/${senderId}`);
  };
  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };
  return (
    <div className="userhome">
      <div>
        {logedUser.signUpAs === "s" ? <ShipperDashboard /> : <UserDashboard />}
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
      <div className="container-fluid center-content">
      
        <div className="center-icons">
          <h2>Your Messages</h2>
          <div className="list-group">
            {senders.map((sender, index) => (
              <div
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={sender.image}
                    alt="User"
                    className="rounded-circle me-5
                  "
                    style={{ width: "60px", height: "60px" }}
                  />
                  <div className="me-5">{sender.companyName}</div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => startConversation(sender.senderId)}
                >
                  Start Conversation
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
