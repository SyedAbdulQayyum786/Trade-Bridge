// routes/gigRoutes.js
const express = require('express');
const router = express.Router();
const gigController = require('../Controllers/gigController');
router.get('/showgigs', gigController.showGigs);
router.post('/addgig', gigController.addGig);

module.exports = router;
