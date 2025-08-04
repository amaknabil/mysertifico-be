const express = require('express');
const { getCurrentUserHandler, getAllUserHandler } = require('../controllers/user.controller');
const protect = require('../middleware/auth.middleware');
const router = express.Router();


router.route('/me').get(protect,getCurrentUserHandler);
router.route('/all').get(protect,getAllUserHandler);


module.exports = router 