const express = require('express');
const {authMiddleware,protectAndCheckRoleMiddleware} = require('../middleware/auth.middleware');
const { updateBOHandler } = require('../controllers/bo.controller');

const router = express.Router();


router.route('/me').patch(authMiddleware,updateBOHandler)


module.exports = router 