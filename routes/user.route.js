const express = require('express');
const { getCurrentUserHandler, getAllUserHandler, updateUserHandler } = require('../controllers/user.controller');
const {authMiddleware,protectAndCheckRoleMiddleware} = require('../middleware/auth.middleware');
const router = express.Router();


router.route('/me/organizations').get(authMiddleware,getCurrentUserHandler);
router.route('/:organization_id/all').post(protectAndCheckRoleMiddleware('Super Admin'), getAllUserHandler);
router.route('/').patch(authMiddleware,updateUserHandler)


module.exports = router 