const express = require('express');
const {authMiddleware,protectAndCheckRoleMiddleware} = require('../middleware/auth.middleware');
const { inviteUserHandler, verifyUserOrganization } = require('../controllers/organization.controller');
const router = express.Router();


router.route('/:organization_id/invite').post(authMiddleware,protectAndCheckRoleMiddleware('Super Admin'),inviteUserHandler);
router.route('/verify').get(verifyUserOrganization);


module.exports = router 