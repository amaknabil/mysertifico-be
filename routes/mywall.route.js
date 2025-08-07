const express = require('express');
const {authMiddleware,protectAndCheckRoleMiddleware} = require('../middleware/auth.middleware');
const { getMyWallUsersHandler, updateMyWallUserStatus } = require('../controllers/mywall.controller');
const router = express.Router();


router.route('/users').get(getMyWallUsersHandler);
router.route('/users/:user_id/roles/:role_id/status').patch(updateMyWallUserStatus);


module.exports = router 