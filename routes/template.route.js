const express = require('express');
const router = express.Router();
const templateController = require('../controllers/template.controller');

/**
 * @openapi
 * tags:
 *   name: Templates
 *   description: API for managing templates
 */

/**
 * @openapi
 * /templates:
 *   get:
 *     summary: Get all templates with pagination and search
 *     tags: [Templates]
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
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: A search query to filter templates by title.
 *     responses:
 *       '200':
 *         description: Success, returns an array of templates.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Template'
 *       '500':
 *         description: Internal server error.
 */

router.get('/', templateController.getAllTemplates);

/**
 * @openapi
 * /templates/count:
 *   get:
 *     summary: Get the total count of templates
 *     tags: [Templates]
 *     responses:
 *       '200':
 *         description: Success, returns the total count.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *       '500':
 *         description: Internal server error.
 */

router.get('/count', templateController.countAllTemplates);

/**
 * @openapi
 * /templates:
 *   post:
 *     summary: Create a new template
 *     tags: [Templates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Template'
 *     responses:
 *       '201':
 *         description: Template created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       '400':
 *         description: Invalid input.
 *       '500':
 *         description: Internal server error.
 */

router.post('/', templateController.createTemplate);

/**
 * @openapi
 * /templates/{id}:
 *   get:
 *     summary: Get a single template by its ID
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique ID of the template.
 *     responses:
 *       '200':
 *         description: Success, returns a single template.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       '404':
 *         description: Template not found.
 *       '500':
 *         description: Internal server error.
 */

router.get('/:id', templateController.getTemplateById);

/**
 * @openapi
 * /templates/{id}:
 *   patch:
 *     summary: Update an existing template
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique ID of the template to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Template'
 *     responses:
 *       '200':
 *         description: Template updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Template'
 *       '404':
 *         description: Template not found.
 *       '500':
 *         description: Internal server error.
 */

router.patch('/:id', templateController.updateTemplate);

/**
 * @openapi
 * /templates/{id}:
 *   delete:
 *     summary: Delete a template
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique ID of the template to delete.
 *     responses:
 *       '204':
 *         description: Template deleted successfully.
 *       '404':
 *         description: Template not found.
 *       '500':
 *         description: Internal server error.
 */
router.delete('/:id', templateController.deleteTemplate);


module.exports = router;
