// routes/userRoutes.js (example route)
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/showsellers', userController.showSellers);
router.get('/showshippers', userController.showShippers);

module.exports = router;
