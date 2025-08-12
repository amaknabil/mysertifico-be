const express = require('express');
const {authMiddleware,protectAndCheckRoleMiddleware} = require('../middleware/auth.middleware');
const { createCertificateHandler, getAllCertificateBatches, getSummaryCertificate } = require('../controllers/certificate.controller');
const router = express.Router();



router.route('/').post(createCertificateHandler);
router.route('/').get(getAllCertificateBatches);
router.route('/summary').get(getSummaryCertificate);

/**
 * @openapi
 * tags:
 *   name: Certificates
 *   description: API for creating and managing certificate batches and issuance.
 */

/**
 * @openapi
 * /api/certificates:
 *   post:
 *     tags: [Certificates]
 *     summary: Create a new certificate batch and issue to recipients
 *     description: Creates a new issuance batch based on a template and assigns it to a list of recipient users. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBatchDto'
 *     responses:
 *       '201':
 *         description: Batch created and certificates issued successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BatchResponse'
 *       '400':
 *         description: Bad Request - Missing required fields.
 *       '403':
 *         description: Forbidden - User does not have permission.
 *
 *   get:
 *     tags: [Certificates]
 *     summary: Get a paginated and searchable list of all certificate batches
 *     description: Retrieves a summary list of all certificate batches, including the recipient count for each. Can be searched by batch title or organization name.
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
 *         name: searchQuery
 *         schema:
 *           type: string
 *         description: A search term for batch title or organization name.
 *     responses:
 *       '200':
 *         description: A list of certificate batches.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     batches:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/BatchSummaryResponse'
 */

/**
 * @openapi
 * /api/certificates/summary:
 *   get:
 *     tags: [Certificates]
 *     summary: Get a total count of all issued certificates
 *     description: Returns the total number of individual certificates issued across all batches.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response with the total count.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: integer
 *                   example: 2583
 */


module.exports = router 