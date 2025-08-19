const express = require('express');
const {authMiddleware,protectAndCheckRoleMiddleware} = require('../middleware/auth.middleware');
const { updateBOHandler, addBoUserHandler, getAllBOUsersHandler, searchBOUsersHandler, updateBOUserStatusHandler } = require('../controllers/bo.controller');

const router = express.Router();


router.route('/me').patch(authMiddleware,updateBOHandler);
router.route('/bo-users').post(addBoUserHandler).get(getAllBOUsersHandler);

//use q=value as query
router.route('/bo-users/search').get(searchBOUsersHandler);
router.route('/bo-user/:user_id/status').patch(updateBOUserStatusHandler)


/**
 * @openapi
 * tags:
 *   - name: BO (Back Office)
 *     description: API endpoints for the Back Office application.
 */

/**
 * @openapi
 * /api/bo/me:
 *   patch:
 *     tags:
 *       - BO (Back Office)
 *     summary: Update the current BO user's profile
 *     description: Allows a logged-in Back Office user to update their own profile information, such as their full name.
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
 *       '400':
 *         description: Bad Request - Missing required fields.
 *       '401':
 *         description: Unauthorized.
 */


module.exports = router 