
const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templates.controller');

// GET /templates - Get all templates with pagination and search
router.get('/', templateController.getAllTemplates);


module.exports = router;
