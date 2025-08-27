const express = require('express');
const { createContactUs, getContactUs } = require('../controllers/contactUs.controller');
const router = express.Router();


router.route('/').post(createContactUs).get(getContactUs);

module.exports = router;