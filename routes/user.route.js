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

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: API for managing users.
 */

/**
 * @openapi
 * /api/users/me/organizations:
 *   get:
 *     tags: [Users]
 *     summary: Get the current user's organizational roles
 *     description: Fetches a list of all organizations the currently authenticated user belongs to, along with their specific role in each (for MyCertifico).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response with a list of the user's organizational accounts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accounts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserOrganizationRoleResponse'
 *       '401':
 *         description: Unauthorized.
 */

/**
 * @openapi
 * /api/users/me:
 *   patch:
 *     tags: [Users]
 *     summary: Update the current user's profile
 *     description: Allows an authenticated user to update their own profile information, like their full name.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserProfileDto'
 *     responses:
 *       '200':
 *         description: The user profile was updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '401':
 *         description: Unauthorized.
 */

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Get a list of all users (paginated and searchable)
 *     description: Retrieves a list of all users on the platform. Can be filtered by `full_name`, `email`, and `is_active`. Requires admin privileges.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: full_name
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
 *     responses:
 *       '200':
 *         description: A paginated list of users.
 */

/**
 * @openapi
 * /api/users/{user_id}/status:
 *   patch:
 *     tags: [Users]
 *     summary: Toggle a user's active status
 *     description: Activates or deactivates a specific user's account globally. Requires admin privileges.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The ID of the user to update.
 *     responses:
 *       '200':
 *         description: The user's status was updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '404':
 *         description: User not found.
 */



module.exports = router 