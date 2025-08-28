const express = require('express');
const {authMiddleware,protectAndCheckRoleMiddleware} = require('../middleware/auth.middleware');
const { createCertificateHandler, getAllCertificateBatches, getSummaryCertificate, getAllCertificateBatchesByOrganization, getCertificateBatchRecipient } = require('../controllers/certificate.controller');
const router = express.Router();




router.route('/').get(getAllCertificateBatches);
router.route('/summary').get(getSummaryCertificate);

//route for mysertifico use
router.route('/organization/:organization_id').get(getAllCertificateBatchesByOrganization);
router.route('/').post(createCertificateHandler);//kiv need improvement





module.exports = router 