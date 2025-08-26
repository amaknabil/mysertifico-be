const express = require('express');
const router = express.Router();
const replyController = require('../controllers/reply.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

/**
 * @openapi
 * tags:
 *   name: Support
 *   description: API for managing support inquiries
 */

/**
 * @openapi
 * /api/support/{id}/reply:
 *   patch:
 *     summary: Reply to a support inquiry and update its status
 *     tags: [Support]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The unique ID of the inquiry to reply to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reply:
 *                 type: string
 *                 description: The reply message to be sent.
 *                 example: "We have received your request and are looking into it."
 *               status:
 *                 type: string
 *                 description: The new status of the inquiry (e.g., 'In Progress', 'Resolved').
 *                 example: "In Progress"
 *     responses:
 *       '200':
 *         description: Reply sent and inquiry updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/ContactUsResponse'
 *       '400':
 *         description: Invalid input.
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Inquiry not found.
 *       '500':
 *         description: Internal server error.
 */
router.patch('/:id/reply', authMiddleware, replyController.sendReply);

module.exports = router;
