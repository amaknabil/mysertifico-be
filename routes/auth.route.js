
const express = require('express');
const {authMiddleware}= require('../middleware/auth.middleware');
const { signUpHandler, loginHandler, logoutHandeler, forgotPasswordHandler, resetPasswordHandler, verifyEmailHandler, changePasswordHandler } = require('../controllers/auth.controller');
const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication and authorization.
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @openapi
 * /api/auth/signup:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     description: Handles new user registration for all applications (MyWall, BO, MyCertifico). The request body must specify the source application and relevant details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *     responses:
 *       '201':
 *         description: User created successfully. Returns the new user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '400':
 *         description: Bad Request - Missing or invalid fields.
 *       '409':
 *         description: Conflict - A user with this email already exists.
 */
router.route('/signup').post(signUpHandler);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Authenticate a user
 *     description: Logs in a user with their email and password, returning a JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       '200':
 *         description: Successful login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/UserResponse'
 *       '401':
 *         description: Unauthorized - Invalid email or password.
 */
router.route('/login').post(loginHandler);

/**
 * @openapi
 * /api/auth/forgot-password:
 *   post:
 *     tags: [Authentication]
 *     summary: Request a password reset
 *     description: Sends a password reset link to the user's email if the account exists.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *     responses:
 *       '200':
 *         description: Password reset email sent successfully.
 */
router.route('/forgot-password').post(forgotPasswordHandler);

/**
 * @openapi
 * /api/auth/reset-password/{token}:
 *   post:
 *     tags: [Authentication]
 *     summary: Reset user's password
 *     description: Resets the user's password using the token from the reset email.
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The password reset token from the email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [password]
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "newSecurePassword123"
 *     responses:
 *       '200':
 *         description: Password has been reset successfully.
 */
router.route('/reset-password/:token').post(resetPasswordHandler);

/**
 * @openapi
 * /api/auth/verify:
 *   get:
 *     tags: [Authentication]
 *     summary: Verify user's email
 *     description: Verifies a user's email address using the token sent upon registration.
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: The email verification token.
 *     responses:
 *       '200':
 *         description: Email verified successfully.
 */
router.route('/verify').get(verifyEmailHandler);

/**
 * @openapi
 * /api/auth/logout:
 *   post:
 *     tags: [Authentication]
 *     summary: Log out the user
 *     description: Logs out the currently authenticated user (implementation depends on client-side token removal).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully logged out.
 */
router.route('/logout').post(authMiddleware, logoutHandeler);

/**
 * @openapi
 * /api/auth/change-password:
 *   post:
 *     tags: [Authentication]
 *     summary: Change authenticated user's password
 *     description: Allows a logged-in user to change their own password.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [currentPassword, newPassword]
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 example: "oldPassword123"
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: "newSecurePassword123"
 *     responses:
 *       '200':
 *         description: Password changed successfully.
 *       '401':
 *         description: Unauthorized - Current password does not match.
 */
router.route('/change-password').post(authMiddleware, changePasswordHandler);



module.exports = router