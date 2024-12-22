const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("./Config/db");
const cors = require("cors");
const fileupload = require("express-fileupload");
const userRoutes = require("./Routes/userRouter");
const categoryRoutes = require("./Routes/categoryRouter");
const productRoutes = require("./Routes/productRouter");
const gigRoutes = require("./Routes/GigRouter");
const shipperRoutes = require("./Routes/shipperRouter");
const messageRouter = require("./Routes/MessageRouter");
const invoiceRouter = require("./Routes/invoiceRouter");
const adminRouter=require("./Routes/adminRouter")
const Message = require("./Models/Message")
const app = express();
const server = http.createServer(app); // Create HTTP server
const io = socketIo(server, { transports: ['websocket', 'polling'] });
; // Attach Socket.io to HTTP server
const PORT = process.env.PORT || 8080;
// Middleware
app.use(cors());
app.use(fileupload({ useTempFiles: true }));
app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/gig", gigRoutes);
app.use("/shipper", shipperRoutes);
app.use("/messages", messageRouter)
app.use("/invoice", invoiceRouter)
app.use("/admin", adminRouter)


// Socket.io event handlers
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Handle incoming chat messages
  socket.on("chat message", async (msg) => {
    console.log("Message received:", msg);
    try {
      // Create a new message instance with sender and receiver IDs
      const message = new Message({
        senderId: msg.senderId,
        receiverId: msg.receiverId,
        content: msg.content,
      });

      // Save the message to the database
      const savedMessage = await message.save();
      console.log("Message saved:", savedMessage);

      // Optionally, emit the message to all connected clients
      io.emit("chat message", savedMessage);
    } catch (error) {
      console.error("Error saving message:", error);
      // If there's an error, emit an error event to the client
      socket.emit("chat message error", {
        error: "Error saving message to database",
      });
    }
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
