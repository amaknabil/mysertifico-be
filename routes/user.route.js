const express = require('express');
const { getCurrentUserHandler,  updateUserHandler, updateUserStatusHandler, getUserHandler } = require('../controllers/user.controller');
const {authMiddleware,protectAndCheckRoleMiddleware} = require('../middleware/auth.middleware');
const router = express.Router();


router.route('/me/organizations').get(authMiddleware,getCurrentUserHandler);
// router.route('/:organization_id/all').post(protectAndCheckRoleMiddleware('Super Admin'), getAllUserHandler);
router.route('/').patch(authMiddleware,updateUserHandler);

//can be used to get all user and search
router.route('/').get(getUserHandler);
router.route('/:user_id/status').patch(updateUserStatusHandler);


module.exports = router 