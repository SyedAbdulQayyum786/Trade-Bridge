const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/messageController');

// Use the merged function directly
router.get('/chatbox/:senderId/:receiverId', messageController.getMessages);
router.get("/showlist/:Id",messageController.showList)
module.exports = router;
