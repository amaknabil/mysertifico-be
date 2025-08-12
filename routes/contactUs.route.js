const express = require('express');
const { createContactUs, getContactUs } = require('../controllers/contactUs.controller');
const router = express.Router();


/**
 * @openapi
 * tags:
 *   name: ContactUs
 *   description: API for managing contact form submissions.
 */

/**
 * @openapi
 * /api/contact-us:
 *   get:
 *     tags: [ContactUs]
 *     summary: Retrieve all contact form submissions
 *     description: Fetches a list of all messages submitted through the contact form. (Requires admin access).
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response with a list of submissions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ContactUsResponse'
 *       '401':
 *         description: Unauthorized.
 *
 *   post:
 *     tags: [ContactUs]
 *     summary: Submit a new contact form message
 *     description: Creates a new contact submission from a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateContactUsDto'
 *     responses:
 *       '201':
 *         description: The contact submission was created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactUsResponse'
 *       '400':
 *         description: Bad Request - Missing required fields.
 */



router.route('/').post(createContactUs).get(getContactUs);

module.exports = router;