const express = require('express');
const {authMiddleware,protectAndCheckRoleMiddleware} = require('../middleware/auth.middleware');
const { updateBOHandler } = require('../controllers/bo.controller');

const router = express.Router();


router.route('/me').patch(authMiddleware,updateBOHandler)

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