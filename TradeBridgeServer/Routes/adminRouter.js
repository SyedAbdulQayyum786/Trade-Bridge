const express = require('express');
const router = express.Router();
const adminController=require("../Controllers/adminController")
router.get('/requests',adminController.fetchGovernmentRequests)
router.post("/extract-invoice",adminController.extractData)
module.exports = router;