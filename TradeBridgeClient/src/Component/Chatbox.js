import React, { useState, useEffect } from "react";
import UserDashboard from "./UserDashboard";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Chat.css";
import ShipperDashboard from "./ShipperDashboard";

export default function Chatbox() {
  const logedUser = useSelector((state) => state.login.user);
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const senderId = logedUser._id;
  const receiverId = id;

  useEffect(() => {
    fetchMessages();
  }, []);
  useEffect(() => {
    socket.on("chat message", handleIncomingMessage);
    return () => {
      socket.off("chat message", handleIncomingMessage);
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/messages/chatbox/${senderId}/${receiverId}`
      );
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.log("Failed to fetch messages:");
      }
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  };
  const socket = io("http://localhost:8080", {
    transports: ["websocket", "polling"],
  });

  socket.on("connect", () => {
    console.log("Socket.io connection established");
  });

  socket.on("connect", () => {
    console.log("Socket.io connection established");
  });

  socket.on("connect_error", (error) => {
    console.error("Socket.io connection error:", error);
  });

  const sendMessage = () => {
    if (inputMessage.trim() !== "") {
      socket.emit("chat message", {
        senderId,
        receiverId,
        content: inputMessage,
      });
      setInputMessage("");
    }
  };

  const handleIncomingMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 m-0 p-0">
          {logedUser.signUpAs === "s" ? (
            <ShipperDashboard />
          ) : (
            <UserDashboard />
          )}
        </div>
        <div className="col-md-8">
          <div className="chatbox-main">
            <div className="chatbox-messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${
                    message.senderId === senderId ? "sent" : "received"
                  }`}
                >
                  <p>
                    {message.senderId === senderId
                      ? "You"
                      : message.senderId.companyName}
                    :{message.content}
                  </p>
                </div>
              ))}
            </div>
            <div className="chatbox-input">
              <div className="send">
                <input
                  type="text"
                  placeholder="Send a message"
                  className="textbox"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                />
                <button onClick={sendMessage}>
                  <i className="bi bi-send send-icon"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
