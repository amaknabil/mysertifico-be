const express = require("express");
const router = express.Router();
const myprofileController = require("../controllers/myprofile.controller");
const { authMiddleware } = require("../middleware/auth.middleware"); // Corrected import
const upload = require("../middleware/upload.middleware"); // Multer upload middleware

/**
 * @openapi
 * tags:
 *   name: My Profile
 *   description: API for managing the current user's profile
 */

/**
 * @openapi
 * /api/myprofile:
 *   get:
 *     summary: Get the profile of the current user
 *     tags: [My Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Success, returns the user's profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: string
 *                   example: 60d0fe4f5b3b6c001f3e45c1
 *                 full_name:
 *                   type: string
 *                   example: Masta Rob
 *                 email:
 *                   type: string
 *                   example: rob@webapp.studio
 *                 role_name:
 *                   type: string
 *                   example: Super Admin
 *                 photo_url:
 *                   type: string
 *                   example: /uploads/image_9d3e45.png
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal server error.
 */
router.get("/", authMiddleware, myprofileController.getProfile);

/**
 * @openapi
 * /api/myprofile:
 *   patch:
 *     summary: Update the current user's profile details
 *     tags: [My Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 description: The new full name for the user.
 *                 example: Masta Rob Updated
 *               email:
 *                 type: string
 *                 description: The new email address for the user.
 *                 example: new.rob@webapp.studio
 *     responses:
 *       '200':
 *         description: Profile updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
 *       '400':
 *         description: Invalid input.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal server error.
 */
router.patch("/", authMiddleware, myprofileController.updateProfile);

/**
 * @openapi
 * /api/myprofile/photo:
 *   post:
 *     summary: Upload a new profile picture
 *     tags: [My Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Profile picture uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile picture uploaded successfully
 *                 photo_url:
 *                   type: string
 *                   example: /uploads/new_image_1a2b3c.png
 *       '400':
 *         description: Invalid file format or size.
 *       '401':
 *         description: Unauthorized.
 *       '500':
 *         description: Internal server error.
 */
router.post(
  "/photo",
  authMiddleware,
  upload.single("file"),
  myprofileController.uploadProfilePicture
);

module.exports = router;
