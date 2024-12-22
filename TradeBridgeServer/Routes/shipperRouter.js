// routes/shipper.js (example route)
const express = require('express');
const router = express.Router();
const shipper = require('../Controllers/shipperController');

router.post('/bookshipper', shipper.book);
router.get('/requests', shipper.fetchRequests);
router.get('/managerequests', shipper.manageRequests);
router.patch('/accept/:id', shipper.accept);
router.post('/senddocs', shipper.sendDocuments);
router.patch('/markasSent/:id', shipper.markRequestAsSent);
router.patch('/updatestatus/:requestId',shipper.updateStatus);
router.patch('/updateamount/:requestId',shipper.updateAmount);
router.patch('/addservice/:requestId',shipper.addService);

module.exports = router;
