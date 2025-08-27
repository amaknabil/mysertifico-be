const express = require('express');
const router = express.Router();
const supportController = require('../controllers/support.controller');


router.get('/', supportController.getAllSupportInquiries);


router.get('/:id', supportController.getSupportInquiryById);

module.exports = router;
