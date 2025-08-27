const express = require('express');
const {authMiddleware,protectAndCheckRoleMiddleware} = require('../middleware/auth.middleware');
const { createCertificateHandler, getAllCertificateBatches, getSummaryCertificate } = require('../controllers/certificate.controller');
const router = express.Router();



router.route('/').post(createCertificateHandler);
router.route('/').get(getAllCertificateBatches);
router.route('/summary').get(getSummaryCertificate);


module.exports = router 