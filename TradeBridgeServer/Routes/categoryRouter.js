// routes/userRoutes.js (example route)
const express = require('express');
const router = express.Router();
const categoryController = require('../Controllers/categoryController');
router.post('/addcategory', categoryController.addCategory);
router.get('/allcategories', categoryController.allcategories);

module.exports = router;
