const express = require('express');
const router = express.Router();
const supportController = require('../controllers/support.controller');

/**
 * @openapi
 * tags:
 *   name: Support
 *   description: API for managing support inquiries
 */

/**
 * @openapi
 * /support:
 *   get:
 *     summary: Get all support inquiries with search and pagination
 *     tags: [Support]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Search for inquiries by email address.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The number of items to return per page.
 *     responses:
 *       '200':
 *         description: Success, returns an array of support inquiries.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ContactUsResponse'
 *                 totalCount:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *       '500':
 *         description: Internal server error.
 */
router.get('/', supportController.getAllSupportInquiries);

/**
 * @openapi
 * /support/{id}:
 *   get:
 *     summary: Get a single support inquiry by its ID
 *     tags: [Support]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The unique ID of the inquiry.
 *     responses:
 *       '200':
 *         description: Success, returns a single inquiry.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactUsResponse'
 *       '404':
 *         description: Inquiry not found.
 *       '500':
 *         description: Internal server error.
 */
router.get('/:id', supportController.getSupportInquiryById);

module.exports = router;
