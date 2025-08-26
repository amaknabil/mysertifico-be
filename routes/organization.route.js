const express = require('express');
const {authMiddleware,protectAndCheckRoleMiddleware} = require('../middleware/auth.middleware');
const { inviteUserHandler, verifyUserOrganization, getAllOrganization, updateOrganizationStatus, getAllOrganizationUsersHandler, updateOrganizationUserStatusHandler } = require('../controllers/organization.controller');
const router = express.Router();


// router.route('/:organization_id/invite').post(authMiddleware,protectAndCheckRoleMiddleware('Super Admin'),inviteUserHandler);
// router.route('/verify').get(verifyUserOrganization);
router.route('/org-users').get(getAllOrganizationUsersHandler);
router.route('/:organization_id/user/:user_id/status').patch(updateOrganizationUserStatusHandler);
// router.route('/:organization_id/status').patch(updateOrganizationStatus);
/**
 * @openapi
 * tags:
 *   name: Organizations
 *   description: API for managing organizations and their members.
 */

/**
 * @openapi
 * /api/organizations/{organization_id}/invite:
 *   post:
 *     tags: [Organizations]
 *     summary: Invite a new member to an organization
 *     description: Allows a Super Admin to invite a new user to their organization. If the user is new to the platform, a new account is created with a temporary password.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: organization_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the organization to invite the user to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InviteUserDto'
 *     responses:
 *       '201':
 *         description: User invited successfully.
 *       '400':
 *         description: Bad Request - Missing required fields.
 *       '403':
 *         description: Forbidden - You do not have permission to perform this action.
 *       '409':
 *         description: Conflict - The user is already a member of this organization.
 */
router
  .route('/:organization_id/invite')
  .post(authMiddleware, protectAndCheckRoleMiddleware(['Super Admin', 'Admin']), inviteUserHandler);


/**
 * @openapi
 * /api/organizations:
 *   get:
 *     tags: [Organizations]
 *     summary: Get a paginated list of organizations
 *     description: Retrieves a list of all organizations, with optional search and pagination.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: A search term to filter organizations by name.
 *     responses:
 *       '200':
 *         description: A list of organizations.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     organizations:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/OrganizationResponse'
 */
router.route('/').get(authMiddleware, getAllOrganization);

/**
 * @openapi
 * /api/organizations/{organization_id}/status:
 *   patch:
 *     tags: [Organizations]
 *     summary: Toggle the active status of an organization
 *     description: Activates or deactivates an organization.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: organization_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the organization to update.
 *     responses:
 *       '200':
 *         description: The organization's status was updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrganizationResponse'
 *       '404':
 *         description: Organization not found.
 */
router.route('/:organization_id/status').patch(authMiddleware, updateOrganizationStatus);


module.exports = router 