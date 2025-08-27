const express = require('express');
const router = express.Router();
const templateController = require('../controllers/template.controller');


router.get('/', templateController.getAllTemplates);


router.get('/count', templateController.countAllTemplates);


router.post('/', templateController.createTemplate);


router.get('/:id', templateController.getTemplateById);


router.patch('/:id', templateController.updateTemplate);


router.delete('/:id', templateController.deleteTemplate);

module.exports = router;
