const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templates.controller');

// GET /templates - Get all templates
router.get('/', templateController.getAllTemplates);

// GET /templates/count - Get the total count of templates
router.get('/count', templateController.countAllTemplates);

module.exports = router;
