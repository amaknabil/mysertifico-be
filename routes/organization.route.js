const express = require('express');
const {authMiddleware,protectAndCheckRoleMiddleware} = require('../middleware/auth.middleware');
const { inviteUserHandler, verifyUserOrganization, getAllOrganization, updateOrganizationStatus, getAllOrganizationUsersHandler, updateOrganizationUserStatusHandler, getMyOrganizationInfo, updateMyOrganizationInfo, getMyOrganizationPosition, createMyOrganizationPosition } = require('../controllers/organization.controller');
const router = express.Router();


// router.route('/:organization_id/invite').post(authMiddleware,protectAndCheckRoleMiddleware('Super Admin'),inviteUserHandler);
// router.route('/verify').get(verifyUserOrganization);
router.route('/org-users').get(getAllOrganizationUsersHandler);
router.route('/:organization_id/user/:user_id/status').patch(updateOrganizationUserStatusHandler);

router
  .route('/:organization_id/invite')
  .post(authMiddleware, protectAndCheckRoleMiddleware(['Super Admin', 'Admin']), inviteUserHandler);


router.route('/').get(authMiddleware, getAllOrganization);

router.route('/:organization_id/status').patch(authMiddleware, updateOrganizationStatus);


//for mysertifico use
router.route('/:organization_id').get(getMyOrganizationInfo).patch(updateMyOrganizationInfo);
router.route('/:organization_id/position').get(getMyOrganizationPosition).post(createMyOrganizationPosition);


module.exports = router 