const express = require('express');
const router = express.Router();
const templateController = require('../controllers/template.controller');

// GET /templates - Get all templates with pagination and search
router.get('/', templateController.getAllTemplates);

// /templates/count - Get the total count of templates
router.get('/count', templateController.countAllTemplates);

// /templates - Create a new template
router.post('/', templateController.createTemplate);

// /templates/:id - Get a single template by its ID
router.get('/:id', templateController.getTemplateById);

// /templates/:id - Update an existing template
router.patch('/:id', templateController.updateTemplate);

// /templates/:id - Delete a template
router.delete('/:id', templateController.deleteTemplate);

module.exports = router;