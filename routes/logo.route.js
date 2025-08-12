const express = require('express');
const router = express.Router();
const logosController = require('../controllers/logo.controller');

/**
 * @openapi
 * tags:
 *   name: Logos
 *   description: API for managing logos
 */

/**
 * @openapi
 * /logos:
 *   get:
 *     summary: Get all logos with pagination
 *     tags: [Logos]
 *     parameters:
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
 *         description: Success, returns an array of all logos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Logo'
 *       '500':
 *         description: Internal server error.
 */

router.get('/', logosController.getAllLogos);

/**
 * @openapi
 * /logos:
 *   post:
 *     summary: Create a new logo
 *     tags: [Logos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Logo'
 *     responses:
 *       '201':
 *         description: Logo created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Logo'
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Internal server error.
 */

router.post('/', logosController.createLogo);

/**
 * @openapi
 * /logos/{id}:
 *   get:
 *     summary: Get a single logo by its ID
 *     tags: [Logos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique ID of the logo.
 *     responses:
 *       '200':
 *         description: Success, returns a single logo.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Logo'
 *       '404':
 *         description: Logo not found.
 *       '500':
 *         description: Internal server error.
 */

router.get('/:id', logosController.getLogoById);

/**
 * @openapi
 * /logos/{id}:
 *   patch:
 *     summary: Update an existing logo
 *     tags: [Logos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique ID of the logo to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Logo'
 *     responses:
 *       '200':
 *         description: Logo updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Logo'
 *       '404':
 *         description: Logo not found.
 *       '500':
 *         description: Internal server error.
 */

router.patch('/:id', logosController.updateLogo);

/**
 * @openapi
 * /logos/{id}:
 *   delete:
 *     summary: Delete a logo
 *     tags: [Logos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique ID of the logo to delete.
 *     responses:
 *       '204':
 *         description: Logo deleted successfully.
 *       '404':
 *         description: Logo not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete('/:id', logosController.deleteLogo);


module.exports = router;
