const express = require("express");
const router = express.Router();
const invoiceController = require('../Controllers/invoiceController');

router.post("/download", invoiceController.generateInvoice);

module.exports = router;
