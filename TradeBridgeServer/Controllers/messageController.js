const Message = require("../Models/Message");
const mongoose = require("mongoose");

const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("senderId", "companyName");

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Error fetching messages" });
  }
};

const showList = async (req, res) => {
  const { Id } = req.params;

  try {
    const messages = await Message.find({ receiverId: Id })
      .sort({ createdAt: 1 })
      .populate({
        path: "senderId",
        select: "_id companyName image",
      })
      .populate({
        path: "receiverId",
        select: "_id companyName image",
      });

    const uniqueSenderIds = new Set();
    const onlysenders = [];

    messages.forEach((message) => {
      if (
        message.senderId &&
        !uniqueSenderIds.has(message.senderId._id.toString())
      ) {
        uniqueSenderIds.add(message.senderId._id.toString());
        onlysenders.push({
          senderId: message.senderId._id,
          companyName: message.senderId.companyName,
          image: message.senderId.image,
        });
      }
    });

    res.json(onlysenders);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Error fetching messages" });
  }
};

module.exports = {
  getMessages,
  showList,
};
